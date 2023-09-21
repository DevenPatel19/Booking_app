// ! 1 import Mongoose

const mongoose = require("mongoose");

// ? 2. Define the schema with keys + validations

const hotelSchema = new mongoose.Schema(
    {
        hotelName: {
            type: String,
            required: true,
        },
        hotelType: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        photos: {
            type: String,
        },
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        },
        rooms: {
            type: String,
        },
        rackRate: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

// * 3. Create a model with the schema and export it

const hotel = mongoose.model("hotel", hotelSchema);

module.exports = hotel;
