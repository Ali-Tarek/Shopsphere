import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { placeOrder, userOrders } from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// payment features
orderRouter.post("/place", authUser, placeOrder);

// User features
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
