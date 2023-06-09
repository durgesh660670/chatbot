const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs'); //npm install bcryptjs 
const User = require('../models/user')
const jwt = require('jsonwebtoken') //npm i jsonwebtoken 



// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, username, mobile, address, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving user to database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user object and save to database
        const user = new User({
            username: username,
            email: email,
            mobile: mobile,
            address: address,
            password: hashedPassword,
        });
        const savedUser = await user.save();

        // Send success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while registering user', error: error });
    }
});
// login route

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user with given email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate and send JWT token in response
        jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY }, (err, token) => {
            if (err) {
                console.error('Error generating JWT token:', err); // Log the error to the console
                res.status(500).json({ error: 'Unable to generate JWT token' }); // Send an error response to the client
            } else {
                res.status(200).json({ message: "token generated successfully", token: token }); // Send the token as a JSON object in the response
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while authenticating user', error: error });
    }
});


module.exports = {
    router
}


