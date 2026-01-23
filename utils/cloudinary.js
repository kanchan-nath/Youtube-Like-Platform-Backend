import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { upload } from "../middlewares/multer.middleware.js"
import path from "path"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudinaryUpload = async (localFilePath)=>{
try{
    if(!localFilePath) return null

    const getResourceType = (localFilePath)=>{
        const ext = localFilePath.toLowerCase().split('.').pop()

        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        const videoExts = ['mp4', 'mov', 'mkv', 'webm'];

        if(imageExts.includes(ext)) return "image"
        if(videoExts.includes(ext)) return "video"

        return "raw"
    }

    const resourceType = getResourceType(localFilePath)
    const targetFolder = resourceType === "image" ? "images" :
                         resourceType === "video" ? "videos" :
                         "files"

    
    const response = await cloudinary.uploader.upload(localFilePath, {
        folder: targetFolder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: resourceType
    })
    fs.unlinkSync(localFilePath)
    return response
}catch(error){
    // fs.unlinkSync(localFilePath)
    return null 
}
}
export {cloudinaryUpload}

