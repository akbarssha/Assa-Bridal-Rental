require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db.js");


connectDB();

app.listen(3036, () => console.log("Server running on port 3036"));

