const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    issuer: { type: String },
    date: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
