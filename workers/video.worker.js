import ffmpeg from "fluent-ffmpeg";
import { videoQueue } from "../queues/video.queue.js";
import path from "path"
// import { promise, resolve } from "dns";
import { Video } from "../models/video.model.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs"

const resolutions = [
    {
        name: "240p",
        width: 426,
        height: 240,
        bitrate: "500k"
    },
    {
        name: "360p",
        width: 640,
        height: 360,
        bitrate: "800k"
    },
    {
        name: "480p",
        width: 854,
        height: 480,
        bitrate: "1500k"
    },
    {
        name: "720p",
        width: 1280,
        height: 720,
        bitrate: "2500k"
    },
    {
        name: "1080p",
        width: 1920,
        height: 1080,
        bitrate: "5000k"
    }
]

const transcodingVideo = (videoLocalFilePath, outputPath, resolution) => {
    const result = new Promise((resolve, reject) => {
        ffmpeg(videoLocalFilePath)
            .output(outputPath)
            .videoCodec('libx264')
            .size(`${resolution.width}x${resolution.height}`)
            .videoBitrate(resolution.bitrate)
            .audioCodec('aac')
            .audioBitrate('128k')
            .on('end', () => {
                console.log(`Transcoding completed for ${resolution.name}`);
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`Error transcoding ${resolution.name}:`, err);
                reject(err);
            })
            .on('progress', (progress) => {
                console.log(`Processing ${resolution.name}: ${progress.percent}% done`);
            })
            .run()

    })
    return result
}

const getVideoDuration = (videoLocalFilePath) => {
    const result = new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoLocalFilePath, (error, metadata) => {
            if (error) {
                reject(error);
            } else {
                resolve(metadata.format.duration);
            }
        })
    })
    return result
}

const generateThumbnails = (videoLocalFilePath, outputDir, duration)=>{
    const result = new Promise((resolve, reject)=>{

        const timestamps = [
            duration * 0.1,
            duration * 0.25,
            duration * 0.5,
            duration * 0.75,
            duration * 0.9
        ]

        let completed = 0;

        timestamps.forEach( (timestamp, index)=>{
            const outputPath = path.join(outputDir, `thumbnail_${index + 1}.png`);

            ffmpeg(videoLocalFilePath)
            .screenshot({
                timestamps: [timestamp],
                filename: `thumbnail_${index + 1}.png`,
                folder: outputDir,
                size: '1280x720'
            })
                .on("end", async ()=>{
                console.log(`Thumbnail ${index + 1} generated at ${timestamp.toFixed(2)}s`);
                const thumbnail = await cloudinaryUpload(outputPath)


                completed++;

                if (completed === timestamps.length) {
                    resolve(thumbnailPaths);
                }
            })
        })


    })
}


videoQueue.process(async (job) => {
    const { videoId, videoLocalFilePath, title } = job.data;

    try {
        console.log(`Starting transcoding for video: ${title}`);

        const duration = await getVideoDuration(videoLocalFilePath)

        const outputDir = path.join(path.dirname(videoLocalFilePath), "transcoded")

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        for (const resolution of resolutions) {
            const outputPath = path.join(outputDir, `${path.parse(videoLocalFilePath).name}_${resolution.name}.mp4`)

            await transcodingVideo(videoLocalFilePath, outputPath, resolution)

            console.log(outputPath)


            const videoUrl = await cloudinaryUpload(outputPath)
            console.log(videoUrl)

            Video.findByIdAndUpdate(videoId, {
                videoFile: videoUrl?.url,
            },
                { new: true }
            )

            job.progress((resolutions.indexOf(resolution) + 1) / resolutions.length * 100);
        }

        const originalVidoe = await cloudinaryUpload(videoLocalFilePath)

        await Video.findByIdAndUpdate(videoId, {
            videoFile: originalVidoe?.url,
            isPublished: true
        },
            { new: true }
        )

        if(fs.existsSync(outputDir)){
            fs.rmSync(outputDir, { recursive: true, force: true })
        }
        console.log(`Video processing completed for: ${title}`);

        return {
            success: true,
            videoId,
            message: "Video transcoded successfully"
        };

    } catch (error) {
        console.error(`Error processing video ${videoId}:`, error);

        await Video.findByIdAndUpdate(videoId, {
            isPublished: false
        });

        throw error;
    }
})

console.log('Video transcoding worker started');

export {videoQueue}