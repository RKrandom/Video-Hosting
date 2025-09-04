import { v2 as cloudinary } from 'cloudinary';
import fs, { unlink, unlinkSync } from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadToCloudinary = async(localFilePath) => {
        try {
            if (!localFilePath) return null
            //upload the file cloudinary//
            const response = await cloudinary.uploader.upload(localFilePath);
            (localFilePath, {
                response_type: 'auto'
            });
            // file uploaded to cloudinary successfully//
            console.log('File uploaded to Cloudinary successfully:', response.url);
            return response;

        } catch (error) {
            fs.unlinkSync(localFilePath);//deleting the file from local storage if the file is not uploaded to cloudinary//
            return null;
        }
    };

    export { uploadToCloudinary };
