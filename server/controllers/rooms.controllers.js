// import model
const Rooms = require("../models/rooms.model");

// Server Test:

module,
    (exports.apiTest = (req, rooms) => {
        rooms.json({ message: "Server is working!" });
    });

// 2 export all functions with placeholder

// Create One
module.exports.createRooms = (req, rooms) => {
    Rooms.create(req.body)
        .then((newRooms) => rooms.json(newRooms))
        .catch((err) => rooms.status(400).json(err));
};

// Read All
module.exports.allRooms = (req, rooms) => {
    Rooms.find()
        .then((roomsList) => rooms.json(roomsList))
        .catch((err) => rooms.status(400).json(err));
};

// Read One
module.exports.oneRooms = (req, rooms) => {
    Rooms.findOne({ _id: req.params.id })
        .then((oneRooms) => rooms.json(oneRooms))
        .catch((err) => rooms.status(400).json(err));
};

// Update One
module.exports.updateRooms = (req, rooms) => {
    Rooms.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true, // Enabling validation step
    })
        .then((updatedRooms) => rooms.json(updatedRooms))
        .catch((err) => rooms.status(400).json(err));
};

// Delete One
module.exports.deleteRooms = (req, rooms) => {
    Rooms.deleteOne({ _id: req.params.id })
        .then((status) => rooms.json(status))
        .catch((err) => rooms.status(400).json(err));
};
