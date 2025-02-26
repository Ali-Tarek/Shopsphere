import express from "express";
import { register, login, adminLogin } from "../controllers/userController.js"; // Ensure the path is correct

const router = express.Router();

// Define the register route
router.post("/register", register);

// Define other routes
router.post("/login", login);
router.post("/admin/login", adminLogin);

export default router;
