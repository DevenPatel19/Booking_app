const Res = require("../models/res.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
module.exports.login = async (req, res) => {
    const { username, password: inputPassword } = req.body; // Rename 'password' to 'inputPassword'

    try {
        const user = await Res.findOne({ username }).exec();

        if (!user) {
            return res.status(404).json({ error: "Incorrect Credentials" });
        }

        const isMatch = await bcrypt.compare(inputPassword, user.password); // Use 'inputPassword' here

        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect Credentials" });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            "123456"
        );

        // Password is correct; extract user details without password and isAdmin
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Respond with user details (excluding password and isAdmin)
        return res.status(200).json(otherDetails);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
