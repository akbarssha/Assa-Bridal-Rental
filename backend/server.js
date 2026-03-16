require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db.js");
const PORT = process.env.PORT || 3036;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
