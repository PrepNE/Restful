import { Request, Response, NextFunction } from "express";
import BookService from "../services/book.service";
import AppError from "../utils/appError";

export default class BookController {

    public static createBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await BookService.createBook(req.body);

            if (!result.success) {
                return next(new AppError(result.error, 400));
            }

            return res.status(201).json(result.book);
        } catch (err: any) {
            next(new AppError(err.message, 500));
        }
    }

    public static createMultipleBooks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await BookService.createMultipleBooks(req.body);

            if (!result.success) {
                return next(new AppError(result.error, 400));
            }

            return res.status(201).json(result.books);
        } catch (err: any) {
            next(new AppError(err.message, 500));
        }
    }

    public static getAllBooks = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await BookService.getAllBooks();

            if (!result.success) {
                return next(new AppError(result.error, 500));
            }

            return res.status(200).json(result.books);
        } catch (err: any) {
            next(new AppError(err.message, 500));
        }
    }

    public static getBookById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await BookService.getBookById(id);

            if (result instanceof AppError) {
                return next(result);
            }

            if (!result.success) {
                return next(new AppError(result.error, 500));
            }

            return res.status(200).json(result.book);
        } catch (err: any) {
            next(new AppError(err.message, 500));
        }
    }

    public static updateBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await BookService.updateBook(id, req.body);

            if (result instanceof AppError) {
                return next(result);
            }

            if (!result.success) {
                return next(new AppError(result.error, 400));
            }

            return res.status(200).json(result.updatedBook);
        } catch (err: any) {
            next(new AppError(err.message, 500));
        }
    }

    public static deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await BookService.deleteBook(id);

            if (result instanceof AppError) {
                return next(result);
            }

            if (!result.success) {
                return next(new AppError(result.error, 500));
            }

            return res.status(200).json({ message: "Book Deleted" });
        } catch (err: any) {
            next(new AppError(err.message, 500));
        }
    }

}
