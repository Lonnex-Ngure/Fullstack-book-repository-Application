import { Hono } from 'hono';
import { listBooks, getBookById, createBook, updateBook, deleteBook } from './book.controller';
import { zValidator } from '@hono/zod-validator';
import { bookSchema } from '../validators';

export const booksRouter = new Hono();

booksRouter.get('/books', listBooks);
booksRouter.get('/books/:id', getBookById);
booksRouter.post('/books', zValidator('json', bookSchema), createBook);
booksRouter.put('/books/:id', zValidator('json', bookSchema), updateBook);
booksRouter.delete('/books/:id', deleteBook);
