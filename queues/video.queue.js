// video.queue.js
import Queue from "bull"

const videoQueue = new Queue()

videoQueue.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
})

videoQueue.on("failed", (job, error) => {
    console.error(`Job ${job.id} failed with error:`, error);
})

console.log('Worker is running and waiting for jobs...');

export { videoQueue }