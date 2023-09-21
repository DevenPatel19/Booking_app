// STEP 1 IMPORT DEPENDENCIES
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.port;

//  STEP 4 import mongoose.config
require("./config/mongoose.config");

// STEP 2 CONFIGURE EXPRESS (MIDDLEWARES)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STEP 5 ROUTES
require("./routes/res.routes")(app);
require("./routes/hotel.routes")(app);
require("./routes/res.routes")(app);
require("./routes/res.routes")(app);
// routes(app); chose single line method

// STEP 3 Listen to Port
// this needs to be below the other code blocks - listen
app.listen(PORT, () => console.log(`🎈🎈🎈 Listening on port: ${PORT}`));
