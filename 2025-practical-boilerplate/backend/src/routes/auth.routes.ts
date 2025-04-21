import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/me", isAuthenticated, AuthController.getCurrentUser);

const authRouter = router;
export default authRouter;
