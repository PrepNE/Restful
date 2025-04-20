import { IBooks } from "../../types/types";
import AppError from "../utils/appError";
import prisma from "../utils/client";
import { validateBook } from "../utils/validator";




export default class BookService {


    public static createBook = async(bookInfo: IBooks) => {
        try{
            const book =  validateBook(bookInfo);

            const newBook = await prisma.book.create({
                data: book
            })

            return { success: true , book: newBook}
        }catch(error: any){
            return {
                success: false,
                error: error?.message
            }
        }
    }


    public static createMultipleBooks = async(booksInfo: IBooks[]) => {
        try{
            const books = validateBook(booksInfo);
            const newBooks = await prisma.book.createMany({
                 data: books
            })

            return { success: true , books: newBooks}
        }catch(error: any){
            return {
                success: false,
                error: error?.message
            }
        }
    }


    public static getAllBooks = async() => {
        try{
            const books = await prisma.book.findMany();
            return { success: true , books}
        }catch(error: any){
            return {
                success: false,
                error: error?.message
            }
        }
    }


    public static getBookById = async(bookId: string) => {
        try{
            const book = await  prisma.book.findUnique({
                where: {
                    id: bookId
                }
            })

            if(!book){
                return new AppError(`Book with ID: ${bookId} Not Found`, 404)
            }

            return {success: true , book}
        }catch(error: any){
            return {
                success: false,
                error: error?.message
            }
        }
    }


    public static updateBook = async(bookId: string , bookData: IBooks) => {
        try{
            const book = validateBook(bookData);
            const existingBook = await prisma.book.findUnique({
                where: {
                    id: bookId
                }
            })

            if(!existingBook){
                return new AppError("Book Not found!", 404)
            }

            const updatedBook = await prisma.book.update({
                where: {
                    id: bookId
                },
                data: book
            })

            return { success: true , updatedBook}
        }catch(error: any){
            return {
                success: false,
                error: error?.message
            }
        }
    }


    public static deleteBook = async(bookId: string) => {
        try{
            const existingBook = await prisma.book.findUnique({
                where: {
                    id: bookId
                }
            });

            if(!existingBook){
                return new AppError("Book Not found!", 404)
            }

            await prisma.book.delete({
                where: {
                    id: bookId
                }
            })

            return { success: true, message: "Book Deleted"}
        }catch(error: any){
            return {
                success: false,
                error: error?.message
            }
        }
    }

    
}