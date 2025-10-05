import { db, pool } from "../server/db/db";
import * as schema from "../server/db/schema";
import { seed } from "drizzle-seed";

const seedDb = async () => {
  try {
    await seed(db, schema).refine((funcs) => ({
      notes: {
        columns: {
          title: funcs.valuesFromArray({
            values: ["Buy Milk", "Develop docs for client", "Read a Book"],
          }),
          description: funcs.valuesFromArray({
            values: [
              "In the morning",
              "Daily grind",
              "Ram chandra trilogy",
              undefined,
            ],
          }),
        },
      },
    }));
    console.log("Database seeded successfully");
  } catch (err) {
    console.error(`Failed to seed the database: \n ${err}`);
  } finally {
    await pool.end();
  }
};

seedDb();
