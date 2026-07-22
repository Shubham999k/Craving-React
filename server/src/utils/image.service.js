import cloudinary from '../config/cloudinary.config.js';
import fs from 'fs';

/**
 * Uploads a single file to Cloudinary
 * @param {String} localFilePath The local path to the file
 * @param {String} folder The folder in cloudinary to upload to
 * @returns {Object} Upload result containing url and public_id
 */
export const uploadOnCloudinary = async (localFilePath, folder = "craving-react") => {
    try {
        if (!localFilePath) return null;
        
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: folder
        });
        
        // file has been uploaded successfull
        fs.unlinkSync(localFilePath); // remove locally saved temp file
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove locally saved temp file as upload operation failed
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

/**
 * Uploads multiple files to Cloudinary
 * @param {Array} localFilePaths Array of local file paths
 * @param {String} folder The folder in cloudinary to upload to
 * @returns {Array} Array of upload results containing url and public_id
 */
export const uploadMultipleOnCloudinary = async (localFilePaths, folder = "craving-react") => {
    try {
        if (!localFilePaths || !Array.isArray(localFilePaths) || localFilePaths.length === 0) return [];

        const uploadPromises = localFilePaths.map(filePath => 
            uploadOnCloudinary(filePath, folder)
        );

        const responses = await Promise.all(uploadPromises);
        
        // Filter out any null responses (failed uploads)
        return responses.filter(res => res !== null);

    } catch (error) {
        console.error("Cloudinary Multiple Upload Error:", error);
        return [];
    }
};

/**
 * Deletes a file from Cloudinary using publicId
 * @param {String} publicId The public ID of the asset
 */
export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
        return null;
    }
};
