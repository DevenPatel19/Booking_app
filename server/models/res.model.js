// ! 1 import Mongoose

const mongoose = require("mongoose");

// ? 2. Define the schema with keys + validations

const ResSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required."],
            minlength: [2, "Must be 2+ characters in length"],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required."],
            minlength: [2, "Must be 2+ characters in length"],
        },
        milId: {
            type: String,
            required: [true, "Must have Military ID"],
            min: [2, "Must be 2+ characters in length"],
        },
        email: {
            type: String,
            required: [true, "What is it?!"],
            minlength: [2, "Give me more than 2 letters please."],
        },
        userRole: {
            type: String,
            required: [true, "Select a role."],
        },
    },
    { timestamps: true }
);

// * 3. Create a model with the schema and export it

const Res = mongoose.model("Res", ResSchema);

module.exports = Res;
