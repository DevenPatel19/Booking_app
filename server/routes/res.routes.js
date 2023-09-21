// Import the controller
const ResController = require("../controllers/res.controllers");
const AuthController = require("../controllers/auth.controllers");

module.exports = (app) => {
    // Get requests
    app.get("/api/test", ResController.apiTest);
    // Get all route
    app.get("/api/ress", ResController.allRes);

    // Get one by ID
    app.get("/api/ress/:id", ResController.oneRes);

    // Post Requests
    app.post("/register", AuthController.createRes);
    app.post("/login", AuthController.login);

    // 	Put Requests
    // ? Put vs Patch?
    // ? Put sets the entire data entry and patch only does a piece
    app.put("/api/ress/:id/edit", ResController.updateRes);

    // Delete Requests
    app.delete("/api/ress/:id", ResController.deleteRes);
};

// 3 Import routes to our server!

// module.exports = router;
