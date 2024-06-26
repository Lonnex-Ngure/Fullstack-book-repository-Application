import React from 'react';
import { Book } from '../types';
import './BookList.css'; 

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <table className="book-list-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book.id)} className="delete-button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
