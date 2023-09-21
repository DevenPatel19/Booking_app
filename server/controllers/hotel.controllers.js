// import model
const Hotel = require("../models/hotel.model.js");

// Server Test:

module,
    (exports.apiTest = (req, hotel) => {
        hotel.json({ message: "Server is working for Hotel!" });
    });

// 2 export all functions with placeholder

// Create One
module.exports.createHotel = (req, hotel) => {
    Hotel.create(req.body)
        .then((newHotel) => hotel.json(newHotel))
        .catch((err) => hotel.status(400).json(err));
};

// Read All
module.exports.allHotel = (req, hotel) => {
    Hotel.find()
        .then((hotelList) => hotel.json(hotelList))
        .catch((err) => hotel.status(400).json(err));
};

// Read One
module.exports.oneHotel = (req, hotel) => {
    Hotel.findOne({ _id: req.params.id })
        .then((oneHotel) => hotel.json(oneHotel))
        .catch((err) => hotel.status(400).json(err));
};

// Update One
module.exports.updateHotel = (req, hotel) => {
    Hotel.findOneAndUpdate(
        { _id: req.params.id }, // Find the document by ID
        { $set: req.body }, // Update the document with the request body
        { new: true, runValidators: true } // Options: return the updated document and run validators
    )
        .then((updatedHotel) => {
            if (!updatedHotel) {
                return hotel.status(404).json({ message: "Hotel not found" });
            }
            hotel.json(updatedHotel);
        })
        .catch((err) => hotel.status(400).json(err));
};

// Delete One
module.exports.deleteHotel = (req, hotel) => {
    Hotel.deleteOne({ _id: req.params.id })
        .then((status) => hotel.json(status))
        .catch((err) => hotel.status(400).json(err));
};
