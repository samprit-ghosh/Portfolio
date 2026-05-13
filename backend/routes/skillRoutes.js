const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const multer = require('multer');
const { uploadFile, deleteFile } = require('../utils/gdrive');

const upload = multer({ storage: multer.memoryStorage() });

// Get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a skill
router.post('/', upload.single('image'), async (req, res) => {
    try {
        let skillData = { ...req.body };
        
        if (req.file) {
            const imageUrl = await uploadFile(req.file);
            skillData.image = imageUrl;
        }

        const skill = new Skill(skillData);
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a skill
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        const existingSkill = await Skill.findById(req.params.id);
        if (!existingSkill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        if (req.file) {
            if (existingSkill.image) {
                await deleteFile(existingSkill.image);
            }
            const imageUrl = await uploadFile(req.file);
            updateData.image = imageUrl;
        }

        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (skill && skill.image) {
            await deleteFile(skill.image);
        }
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
