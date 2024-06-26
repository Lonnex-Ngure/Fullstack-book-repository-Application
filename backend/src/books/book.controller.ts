import { Context } from 'hono';
import { bookService } from './book.service';

export const listBooks = async (c: Context) => {
  const data = await bookService.list();
  if (!data || data.length === 0) {
    return c.text('No books found', 404);
  }
  return c.json(data, 200);
};

export const getBookById = async (c: Context) => {
  const id = c.req.param('id');
  const data = await bookService.getById(Number(id));
  if (!data) {
    return c.text('Book not found', 404);
  }
  return c.json(data, 200);
};

export const createBook = async (c: Context) => {
  const book = await c.req.json();
  const newBook = await bookService.create(book);
  return c.json(newBook, 201);
};

export const updateBook = async (c: Context) => {
  const id = c.req.param('id');
  const book = await c.req.json();
  const updatedBook = await bookService.update(Number(id), book);
  if (!updatedBook) {
    return c.text('Book not found', 404);
  }
  return c.json(updatedBook, 200);
};

export const deleteBook = async (c: Context) => {
  const id = c.req.param('id');
  const deleted = await bookService.delete(Number(id));
  if (!deleted) {
    return c.text('Book not found', 404);
  }
  return c.text('Book deleted', 200);
};
