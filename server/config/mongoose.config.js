// import the mongoose library
const mongoose = require("mongoose");

// Extract from .ENV
const dbName = process.env.DB;
const dbUser = process.env.ATLAS_USER;
const dbPW = process.env.ATLAS_PW;
const uri = `mongodb+srv://${dbUser}:${dbPW}@cluster0.0ghecvv.mongodb.net/
${dbName}?retryWrites=true&w=majority`;

// mongoose promise
mongoose
    .connect(uri)
    .then(() =>
        console.log("🦄🦄🦄🦄🦄Established a connection to the Mongo DB")
    )
    .catch((err) =>
        console.log(
            "❌❌❌❌Something went wrong when connecting to the Mongo DB",
            err
        )
    );
