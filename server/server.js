import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    process.env.ADMIN_URL || "http://localhost:5174",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Api Endpoints
app.get("/", (req, res) => res.status(200).send("API Working"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Listen
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
