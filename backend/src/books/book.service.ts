import db from "../drizzle/db";
import { books } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const bookService = {
  list: async () => {
    return await db.select().from(books);
  },
  getById: async (id: number) => {
    return await db.select().from(books).where(eq(books.id, id)).execute();
  },
  create: async (book: any) => {
    return await db.insert(books).values(book).returning().execute();
  },
  update: async (id: number, book: any) => {
    return await db
      .update(books)
      .set(book)
      .where(eq(books.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db.delete(books).where(eq(books.id, id)).execute();
  },
};
