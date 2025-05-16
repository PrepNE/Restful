import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/auth.middleware";




const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.signup);
router.get("/me", isAuthenticated, AuthController.getLoggedInUser);

const authRoutes = router;
export default authRoutes;