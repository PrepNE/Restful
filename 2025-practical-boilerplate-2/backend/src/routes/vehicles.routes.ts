import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import VehicleController from "../controllers/vehicle.controller";



const router = Router();


router.post("/" , isAuthenticated , VehicleController.registerVehicle);
router.get("/user", isAuthenticated , VehicleController.getUserVehicles);
router.get("/:plateNumber", isAuthenticated, VehicleController.getVehicleByPlateNumber);

const vehicleRoutes = router;
export default vehicleRoutes;