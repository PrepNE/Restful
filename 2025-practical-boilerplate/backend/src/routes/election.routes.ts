import { Router } from "express";
import ElectionController from "../controllers/election.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", isAuthenticated,ElectionController.createElection);
router.get("/", isAuthenticated,ElectionController.getAllElections);
router.get("/:id",isAuthenticated, ElectionController.getElectionsById);
router.put("/:id",isAuthenticated, ElectionController.updateElection);
router.delete("/:id",isAuthenticated, ElectionController.deleteElection);

const electionRouter = router;
export default electionRouter;
