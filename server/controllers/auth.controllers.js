const Res = require("../models/res.model.js");
const bcrypt = require("bcrypt");

// Create One
module.exports.createRes = (req, res) => {
    // Extract the password from the request body
    const { password, ...otherData } = req.body;

    // Generate a salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).json({ error: "Error generating salt" });
        }

        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                return res
                    .status(500)
                    .json({ error: "Error hashing password" });
            }

            // Replace the password in the request body with the hashed password
            const dataWithHashedPassword = {
                ...otherData,
                password: hashedPassword,
            };

            // Create the resource with the hashed password
            Res.create(dataWithHashedPassword)
                .then((newRes) => res.json(newRes))
                .catch((err) => res.status(400).json(err));
        });
    });
};

// Login function
module.exports.login = (req, res) => {
    const { username, password } = req.body;

    // Find the user by username in the database
    Res.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (!isMatch) {
                return res.status(401).json({ error: "Incorrect password" });
            }

            // Password is correct; you can create a session or token for authentication
            // For simplicity, here we're just sending a success message
            return res.json({ message: "Login successful" });
        });
    });
};
