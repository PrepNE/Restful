import { Router } from "express";
import CandidateController from "../controllers/candidate.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();


router.post("/",isAuthenticated,  CandidateController.createCandidate);
router.get("/election/:electionId",isAuthenticated, CandidateController.getCandidatesByElection);
router.post('/elections/:electionId/candidates/:candidateId/vote',isAuthenticated, CandidateController.vote);
router.get("/:id",isAuthenticated, CandidateController.getCandidateById);


const candidateRouter = router;
export default candidateRouter;
