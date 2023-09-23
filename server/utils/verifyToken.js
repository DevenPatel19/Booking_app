// Import the createError function
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.access_token;
        console.log("Token:", token);

        // Check if the token is missing
        if (!token) {
            return next(createError(401, "You are not authenticated!"));
        }

        // Verify the token with the JWT secret
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                return next(createError(403, "Token is not valid!"));
            }
            // Attach the user object to the request for later use
            req.user = user;
            next();
        });
    } catch (error) {
        // Handle unexpected errors
        next(createError(500, "Internal Server Error"));
    }
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
