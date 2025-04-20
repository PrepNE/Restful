import { Router } from "express";
import BookController from "../controllers/book.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", isAuthenticated, BookController.createBook);
router.post("/bulk", isAuthenticated, BookController.createMultipleBooks);
router.get("/", isAuthenticated, BookController.getAllBooks);
router.get("/:id", isAuthenticated, BookController.getBookById);
router.put("/:id", isAuthenticated, BookController.updateBook);
router.delete("/:id", isAuthenticated, BookController.deleteBook);

const bookRouter = router
export default bookRouter;
