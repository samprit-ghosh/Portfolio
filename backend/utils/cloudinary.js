const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with .env credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer to Cloudinary
 * @param {Object} fileObject - multer file object with buffer, originalname, mimetype
 * @returns {string} - The secure URL of the uploaded image
 */
const uploadFile = async (fileObject) => {
    try {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary credentials missing in .env');
        }

        console.log(`Uploading file to Cloudinary: ${fileObject.originalname}...`);

        // Convert buffer to base64 data URI for Cloudinary upload
        const b64 = Buffer.from(fileObject.buffer).toString('base64');
        const dataURI = `data:${fileObject.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'portfolio', // All portfolio images go in this folder
            resource_type: 'auto',
        });

        console.log(`File uploaded successfully. URL: ${result.secure_url}`);
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error.message);
        throw error;
    }
};

/**
 * Extracts the public_id from a Cloudinary URL for deletion
 * @param {string} url - The Cloudinary secure URL
 * @returns {string|null} - The public_id or null
 */
const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    try {
        // URL format: https://res.cloudinary.com/CLOUD_NAME/image/upload/v12345/portfolio/filename.ext
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;
        // Remove version prefix (v12345/) and file extension
        const pathAfterUpload = parts[1].replace(/^v\d+\//, '');
        const publicId = pathAfterUpload.replace(/\.[^/.]+$/, '');
        return publicId;
    } catch {
        return null;
    }
};

/**
 * Deletes a file from Cloudinary by its URL
 * @param {string} fileUrl - The Cloudinary secure URL
 */
const deleteFile = async (fileUrl) => {
    try {
        const publicId = getPublicIdFromUrl(fileUrl);
        if (!publicId) return;

        await cloudinary.uploader.destroy(publicId);
        console.log(`Successfully deleted from Cloudinary: ${publicId}`);
    } catch (error) {
        console.error('Cloudinary Delete Error:', error.message);
    }
};

module.exports = { uploadFile, deleteFile };
