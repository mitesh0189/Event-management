const express = require("express");
const path = require("path");
const dbConnection = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
dbConnection();

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`listening on port : http://localhost:${PORT}`);
});
