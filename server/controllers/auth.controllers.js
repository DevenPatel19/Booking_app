// Import necessary modules and models
const Res = require("../models/res.model.js"); // Replace with your actual model path
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration
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
                .catch((err) => res.status(400).json({ error: err.message }));
        });
    });
};

// User Login
module.exports.login = async (req, res) => {
    const { username, password: inputPassword } = req.body; // Rename 'password' to 'inputPassword'

    try {
        // Find the user by username in the database
        const user = await Res.findOne({ username }).exec();

        if (!user) {
            // If the user does not exist, return a 404 error
            return res.status(404).json({ error: "Incorrect Credentials" });
        }

        // Compare the input password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(inputPassword, user.password);

        if (!isMatch) {
            // If the passwords do not match, return a 401 error
            return res.status(401).json({ error: "Incorrect Credentials" });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // Extract user details without password and isAdmin
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Respond with user details (excluding password and isAdmin) and set the JWT token as an HTTP-only cookie
        return res
            .cookie("access_token", token, { httpOnly: true, secure: true }) // Secure flag for HTTPS
            .status(200)
            .json(otherDetails);
    } catch (err) {
        // Handle internal server errors and log them
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
