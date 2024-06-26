import db from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const userService = {
  list: async () => {
    return await db.select().from(users);
  },
  getById: async (id: number) => {
    return await db.select().from(users).where(eq(users.id, id)).execute();
  },
  create: async (user: any) => {
    return await db.insert(users).values(user).returning().execute();
  },
  update: async (id: number, user: any) => {
    return await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db.delete(users).where(eq(users.id, id)).execute();
  },
};
