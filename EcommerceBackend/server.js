const express = require("express");
const db = require("./config/knexfile");
require("dotenv").config();
const routes = require("./routes/index");
const cors = require("cors"); // Corrected the typo here
const bodyParser = require("body-parser"); // Make sure to import body-parser
const path = require("path");

const app = express();

// Enable CORS for all routes
app.use(cors()); // You can also configure CORS if needed
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// routes
app.use(bodyParser.json({ limit: "50mb" })); // You can set the limit as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// ✅ Serve Static Files (Uploaded Images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", routes); // Prefix all routes with "/api"

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log("Server Is Running On", port);
});
