import { createContext, useContext, useEffect, useState } from "react";

const BooksContext = createContext();
export const useBooks = () => useContext(BooksContext);

const API_URL = import.meta.env.VITE_API_URL + "/api";

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
            const res = await fetch(`${API_URL}/books`);

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            const result = await res.json();
            setBooks(result);
        } catch(err) {
            console.log(err);
        }
    };

    const deleteBook = async id => {
        try {
            const res = await fetch(`${API_URL}/books/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message);
            };

            setBooks(prev => prev.filter(item => item._id !== id));
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <BooksContext.Provider value={{books, deleteBook}}>
            {children}
        </BooksContext.Provider>
    )
}