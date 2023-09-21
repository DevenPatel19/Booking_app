// Import the controller
const RoomController = require("../controllers/room.controllers");

module.exports = (app) => {
    // Get requests
    // Get all route
    app.get("/api/rooms", RoomController.allRoom);

    // Get one by ID
    app.get("/api/rooms/:id", RoomController.oneRoom);

    // Post Requests
    app.post("/api/rooms/", RoomController.createRoom);

    // 	Put Requests
    // ? Put vs Patch?
    // ? Put sets the entire data entry and patch only does a piece
    app.put("/api/rooms/:id/edit", RoomController.updateRoom);

    // Delete Requests
    app.delete("/api/rooms/:id", RoomController.deleteRoom);
};

// 3 Import routes to our server!

// module.exports = router;
