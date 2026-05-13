const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const multer = require('multer');
const { uploadFile, deleteFile } = require('../utils/gdrive');

const upload = multer({ storage: multer.memoryStorage() });

// Get all certificates
router.get('/', async (req, res) => {
    try {
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        res.json(certificates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a certificate
router.post('/', upload.single('file'), async (req, res) => {
    try {
        let certificateData = { ...req.body };
        
        if (req.file) {
            const fileUrl = await uploadFile(req.file);
            certificateData.pdfUrl = fileUrl;
        } else if (!certificateData.pdfUrl) {
            return res.status(400).json({ message: 'Certificate PDF file or Link is required' });
        }

        const certificate = new Certificate(certificateData);
        const newCertificate = await certificate.save();
        res.status(201).json(newCertificate);
    } catch (err) {
        console.error('Certificate Create Error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update a certificate
router.put('/:id', upload.single('file'), async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        const existingCert = await Certificate.findById(req.params.id);
        if (!existingCert) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        if (req.file) {
            // Delete old file from GDrive only if it was a GDrive link
            if (existingCert.pdfUrl && (existingCert.pdfUrl.includes('drive.google.com') || existingCert.pdfUrl.includes('googleusercontent.com'))) {
                await deleteFile(existingCert.pdfUrl);
            }
            // Upload new file
            const fileUrl = await uploadFile(req.file);
            updateData.pdfUrl = fileUrl;
        }

        const updatedCert = await Certificate.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedCert);
    } catch (err) {
        console.error('Certificate Update Error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a certificate
router.delete('/:id', async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (certificate && certificate.pdfUrl && (certificate.pdfUrl.includes('drive.google.com') || certificate.pdfUrl.includes('googleusercontent.com'))) {
            await deleteFile(certificate.pdfUrl);
        }
        await Certificate.findByIdAndDelete(req.params.id);
        res.json({ message: 'Certificate deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
