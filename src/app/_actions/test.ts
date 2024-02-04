"use server"

import { db } from "@/database"
import { timers } from "@/database/schema"
import { v4 as uuidv4 } from "uuid"

export async function addTimerAction({
  time,
  remainTime,
}: {
  time: number
  remainTime: number
}) {
  await db.insert(timers).values({
    id: uuidv4(),
    time,
    remainTime,
  })
}
