const express = require('express');
const mongoose = require('mongoose');  // For MongoDB connection
const bcrypt = require('bcryptjs');    // For hashing passwords
const jwt = require('jsonwebtoken');   // For JWT token creation
const bodyParser = require('body-parser');  // To parse form data

const app = express();
app.use(bodyParser.json());  // To handle JSON data

// Replace with your MongoDB connection string (Local or MongoDB Atlas)
const mongoURI = 'mongodb://localhost:27017/annexcash';  // Local MongoDB
// OR if using MongoDB Atlas, replace with this string:
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/annexcash?retryWrites=true&w=majority';

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema for MongoDB
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },  // Add phone if you're using phone numbers
});

const User = mongoose.model('User', userSchema);

// Sign-up route
app.post('/signup', async (req, res) => {
    const { email, password, phone } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ email, password: hashedPassword, phone });
        await newUser.save();  // Save the user in the database
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});