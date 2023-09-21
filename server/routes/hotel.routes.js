// Import the controller
const HotelController = require("../controllers/hotel.controllers");

module.exports = (app) => {
    // Get requests
    // Get all route
    app.get("/api/hotels", HotelController.allHotel);

    // Get one by ID
    app.get("/api/hotels/:id", HotelController.oneHotel);

    // Post Requests
    app.post("/api/hotels/", HotelController.createHotel);

    // 	Put Requests
    // ? Put vs Patch?
    // ? Put sets the entire data entry and patch only does a piece
    app.put("/api/hotels/:id/edit", HotelController.updateHotel);

    // Delete Requests
    app.delete("/api/hotels/:id", HotelController.deleteHotel);
};

// 3 Import routes to our server!

// module.exports = router;
