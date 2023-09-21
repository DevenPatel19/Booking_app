// Import the createError function
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("Token:", token); // Log the token

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        console.log("Decoded User:", user);
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

// Middleware to verify user
const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
};

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
