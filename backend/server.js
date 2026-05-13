const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

// Database Connection
console.log('Connecting to MongoDB...');
if (!process.env.MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is not defined in .env file!');
} else {
    console.log('MONGODB_URI found in environment.');
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error Details:');
        console.error(err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
