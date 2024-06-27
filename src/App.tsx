import React, { useReducer, useEffect, useCallback, useState } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";
import { bookReducer } from "./reducer";
import { Book } from "./types";
import axios from "axios";

const API_URL = "http://localhost:8000/api"; 

const App: React.FC = () => {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const booksPerPage = 5;

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/books`);
      dispatch({ type: "INIT", payload: response.data });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setError("Failed to fetch books");
      setLoading(false);
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
      setLoading(true);
      let response;
      if (editingBook) {
        response = await axios.put(`${API_URL}/books/${book.id}`, book);
        dispatch({ type: "UPDATE_BOOK", book: response.data });
      } else {
        response = await axios.post(`${API_URL}/books`, book);
        dispatch({ type: "ADD_BOOK", book: response.data });
      }
      setEditingBook(null);
      setLoading(false);
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to save book:", error);
      setError("Failed to save book");
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/books/${id}`);
      dispatch({ type: "DELETE_BOOK", id });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete book:", error);
      setError("Failed to delete book");
      setLoading(false);
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
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
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
        totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
