const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Res = require("../models/res.model.js"); // Import the model
const ResController = require("../controllers/res.controllers");
const AuthController = require("../controllers/auth.controllers");

const router = express.Router();

module.exports = (app) => {
    // Create One - Registration
    router.post("/register", (req, res) => {
        const { password, ...otherData } = req.body;

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

                const dataWithHashedPassword = {
                    ...otherData,
                    password: hashedPassword,
                };

                Res.create(dataWithHashedPassword)
                    .then((newRes) => res.json(newRes))
                    .catch((err) => res.status(400).json(err));
            });
        });
    });

    // Login
    router.post("/login", (req, res) => {
        const { username, password } = req.body;

        Res.findOne({ username }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ error: "Internal Server Error" });
                }

                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ error: "Incorrect password" });
                }

                return res.json({ message: "Login successful" });
            });
        });
    });

    // Attach the router to the Express app
    app.use("/", router);
};
