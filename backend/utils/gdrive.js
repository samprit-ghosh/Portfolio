const { google } = require('googleapis');
const { Readable } = require('stream');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

/**
 * Creates an OAuth2 client using credentials from .env
 * This uses YOUR personal Google account's storage quota (not a Service Account)
 */
const getOAuth2Client = () => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GDRIVE_CLIENT_ID,
        process.env.GDRIVE_CLIENT_SECRET,
        'http://localhost:5000/oauth2callback'
    );

    // Set the refresh token so it can auto-generate access tokens
    oauth2Client.setCredentials({
        refresh_token: process.env.GDRIVE_REFRESH_TOKEN,
    });

    return oauth2Client;
};

/**
 * Extracts the file ID from various Google Drive URL formats
 */
const getFileIdFromUrl = (url) => {
    if (!url) return null;
    
    // Handle lh3.googleusercontent.com/d/FILE_ID
    const lh3Match = url.match(/\/d\/([^/&=?]+)/);
    if (lh3Match) return lh3Match[1];

    // Handle drive.google.com/uc?id=FILE_ID
    const ucMatch = url.match(/id=([^&]+)/);
    if (ucMatch) return ucMatch[1];

    // Handle drive.google.com/file/d/FILE_ID/view
    const fileDMatch = url.match(/\/file\/d\/([^/]+)/);
    if (fileDMatch) return fileDMatch[1];

    // Handle drive.google.com/thumbnail?id=FILE_ID
    const thumbMatch = url.match(/thumbnail\?id=([^&]+)/);
    if (thumbMatch) return thumbMatch[1];

    return null;
};

/**
 * Uploads a file to Google Drive using OAuth2
 */
const uploadFile = async (fileObject) => {
    try {
        if (!process.env.GDRIVE_CLIENT_ID || !process.env.GDRIVE_CLIENT_SECRET || !process.env.GDRIVE_REFRESH_TOKEN) {
            throw new Error('Google Drive OAuth2 credentials missing in .env. Run "node get-gdrive-token.js" first.');
        }

        const auth = getOAuth2Client();
        const drive = google.drive({ version: 'v3', auth });

        const bufferStream = new Readable();
        bufferStream.push(fileObject.buffer);
        bufferStream.push(null);

        console.log(`Uploading to Google Drive: ${fileObject.originalname}...`);

        const response = await drive.files.create({
            requestBody: {
                name: `${Date.now()}-${fileObject.originalname}`,
                parents: process.env.GDRIVE_FOLDER_ID ? [process.env.GDRIVE_FOLDER_ID] : [],
            },
            media: {
                mimeType: fileObject.mimetype,
                body: bufferStream,
            },
            fields: 'id, webViewLink, webContentLink',
            supportsAllDrives: true,
            supportsTeamDrives: true,
        });

        const fileId = response.data.id;
        console.log(`Uploaded successfully. File ID: ${fileId}`);
        console.log(`View Link: ${response.data.webViewLink}`);

        // Make the file public
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
            supportsAllDrives: true,
            supportsTeamDrives: true,
        });

        // Add a small delay for permission propagation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return appropriate URL based on file type
        if (fileObject.mimetype.startsWith('image/')) {
            return `https://lh3.googleusercontent.com/d/${fileId}=s1000`;
        } else {
            return `https://drive.google.com/file/d/${fileId}/view`;
        }
    } catch (error) {
        console.error('GDrive Upload Error:', error.message);
        throw error;
    }
};

/**
 * Deletes a file from Google Drive by its URL
 */
const deleteFile = async (fileUrl) => {
    try {
        const fileId = getFileIdFromUrl(fileUrl);
        if (!fileId) {
            console.warn('Could not extract file ID from URL:', fileUrl);
            return;
        }

        const auth = getOAuth2Client();
        const drive = google.drive({ version: 'v3', auth });

        await drive.files.delete({ fileId });
        console.log(`Deleted from GDrive: ${fileId}`);
    } catch (error) {
        if (error.code === 404) {
            console.warn('File already deleted or not found:', fileUrl);
        } else {
            console.error('GDrive Delete Error:', error.message);
        }
    }
};

module.exports = { uploadFile, deleteFile };
