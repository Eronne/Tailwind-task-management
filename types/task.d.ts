import type { TaskStatus } from "~/constants/task";

export interface Task {
  id: string
  name: string
  description: string
  status: TaskStatus
}
