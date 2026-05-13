const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const { uploadFile, deleteFile } = require('../utils/gdrive');

const upload = multer({ storage: multer.memoryStorage() });

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        console.log('Fetched projects. Image URLs:', projects.map(p => ({ title: p.title, image: p.image })));
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a project
router.post('/', upload.single('image'), async (req, res) => {
    try {
        let projectData = { ...req.body };
        
        if (req.file) {
            const imageUrl = await uploadFile(req.file);
            projectData.image = imageUrl;
        }
        
        // Handle tags if they come as a string (common with FormData)
        if (typeof projectData.tags === 'string') {
            projectData.tags = projectData.tags.split(',').map(tag => tag.trim());
        }

        const project = new Project(projectData);
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.error('Project Create Error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update a project
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let updateData = { ...req.body };
        
        // Find existing project to check for old image
        const existingProject = await Project.findById(req.params.id);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (req.file) {
            console.log('New file received for update:', req.file.originalname);
            // Delete old image from GDrive if it exists
            if (existingProject.image) {
                console.log('Attempting to delete old image:', existingProject.image);
                await deleteFile(existingProject.image);
            }
            // Upload new image
            const imageUrl = await uploadFile(req.file);
            console.log('New image uploaded. URL:', imageUrl);
            updateData.image = imageUrl;
        } else {
            console.log('No new file received. Keeping current image.');
        }

        // Remove tags logic as it is not in the model
        // if (typeof updateData.tags === 'string') {
        //     updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
        // }

        console.log('Updating project in database with data:', updateData);
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
        console.log('Project updated successfully:', updatedProject.title);
        res.json(updatedProject);
    } catch (err) {
        console.error('Project Update Error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project && project.image) {
            await deleteFile(project.image);
        }
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
