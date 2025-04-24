/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import axios from "../lib/axios.config";
import { IBooks } from "@/types";



const useBooks = () => {
  const { data: books, isLoading, error, mutate } = useSWR<IBooks[]>("/books", async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  });

  const updateBook = async (book: Partial<IBooks> & { id: string }) => {
    const { id, ...updatedData } = book;
    try {
      const { data: updatedBook } = await axios.put(`/books/${id}`, updatedData);
      mutate(
        (currentBooks) =>
          currentBooks?.map((b) => (b.id === id ? { ...b, ...updatedBook } : b)),
        false
      );
      return updatedBook;
    } catch (err) {
      console.error("Update failed", err);
      throw err;
    }
  };
  
  // Delete a book
  const deleteBook = async (id: string) => {
    try {
        if (!books) {
            return false;
        }
        await axios.delete(`/books/${id}`);
        mutate(books.filter((book) => book.id !== id), false);
    } catch (err) {
      console.error("Delete failed", err);
      throw err;
    }
  };

  return {
    books,
    isLoading,
    error,
    updateBook,
    deleteBook,
  };
};

export default useBooks;
