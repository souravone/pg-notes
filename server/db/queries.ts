import { desc } from "drizzle-orm";
import { db } from "./db";
import { notes } from "./schema";

export const getNotes = async () => {
  return await db.select().from(notes).orderBy(desc(notes.createdAt));
};
