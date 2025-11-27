import express from "express";
import { protect } from "../middleware/auth.js";
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvaliability, updateUserImage } from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";
import multer from "multer";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);   
ownerRouter.post("/add-car", protect, upload.single("image"), addCar);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.post("/toggle-car", protect, toggleCarAvaliability);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/update-profile", upload.single("image"), protect, updateUserImage);

export default ownerRouter;