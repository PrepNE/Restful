import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import ParkingRecordController from "../controllers/record.controller";
import { restrictTo } from "../middleware/admin.middleware";


const router = Router();


router.post("/check-in", isAuthenticated , ParkingRecordController.checkIn)
router.post("/check-out", isAuthenticated, ParkingRecordController.checkOut)
router.get("/history/:plateNumber", isAuthenticated, ParkingRecordController.getVehicleHistory);
router.get("/search", isAuthenticated, restrictTo("ADMIN"), ParkingRecordController.searchRecord);

const recordRoutes = router;
export default recordRoutes;