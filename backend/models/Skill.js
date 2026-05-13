const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String }, // For skill icons
    percentage: { type: Number, required: true, min: 0, max: 100 },
    category: { type: String, default: 'General' }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
