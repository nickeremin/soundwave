import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"
import { boolean, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core"

// Users
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  imageUrl: text("image_url"),
  email: text("email").notNull(),
  username: text("username").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  tables: many(tables),
}))

export type SelectUser = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>

// Table data
export const tables = pgTable("tables", {
  id: text("id").notNull().primaryKey(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  favorite: boolean("favorite").notNull().default(false),
})

export type SelectTable = InferSelectModel<typeof tables>
export type InsertTable = InferInsertModel<typeof tables>

export const timers = pgTable("timers", {
  id: text("id").notNull().primaryKey(),
  time: numeric("time").notNull(),
  remainTime: numeric("remain_time").notNull(),
})
