import { z } from "zod";

export const studentSchema = z.object({
    firstName: z.string().min(2),
    lastName:z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export const validateStudent = (data: any) => {
    const user = studentSchema.safeParse(data);
    if (!user.success) {
        throw new Error(user.error.errors[0].message);
    }
    return user.data;
}

export const bookSchema = z.object({
    name: z.string(),
    author: z.string(),
    publisher: z.string(),
    publicationYear:z.number().min(1000).max(2024),
    subject:z.string(),
});

export const validateBook = (data: any) => {
    const book = bookSchema.safeParse(data);
    if (!book.success) {
        throw new Error(book.error.errors[0].message);
    }
    return book.data;
};

export const validateBooks = (data: any) => {
    const books = z.array(bookSchema).safeParse(data);
    if (!books.success) {
        throw new Error(books.error.errors[0].message);
    }
    return books.data;
};

