const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const dbConnect = require("./config/dbConnect.js");

// dotenv configuration
dotenv.config();

//Connecting MongoDB
dbConnect();

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//Routes
// url ---> http://localhost:9999
app.use("/api/v1/auth", require("./routes/authRoutes.js"));
app.use("/api/v1/user", require("./routes/userRoutes.js"));
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes.js"));
app.use("/api/v1/category", require("./routes/categoryRoutes.js"));
app.use("/api/v1/food", require("./routes/foodRoutes.js"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Listening to Port No ${PORT}`));
