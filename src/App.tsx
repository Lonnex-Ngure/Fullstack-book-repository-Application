import React, { useReducer, useEffect, useCallback, useState } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";
import { bookReducer } from "./reducer";
import { Book } from "./types";
import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Use the API URL directly

const App: React.FC = () => {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const booksPerPage = 5;
  const totalPages = Math.ceil(books.length / booksPerPage);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      dispatch({ type: "INIT", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleSubmit = async (book: Book) => {
    try {
      if (editingBook) {
        await axios.put(`${API_URL}/books/${book.id}`, book);
        dispatch({ type: "UPDATE_BOOK", book });
      } else {
        const response = await axios.post(`${API_URL}/books`, book);
        dispatch({ type: "ADD_BOOK", book: response.data });
      }
      setEditingBook(null);
      fetchBooks(); // Refetch books after add/update
    } catch (error) {
      console.error("Failed to save book:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      dispatch({ type: "DELETE_BOOK", id });
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase())
  );

  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div>
      <h1>Book Repository</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </div>
      <BookForm onSubmit={handleSubmit} book={editingBook || undefined} />
      <BookList
        books={displayedBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
