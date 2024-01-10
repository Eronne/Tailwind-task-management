export interface Task {
  id: string
  name: string
  description: string
  status: string
  assignee: string
  dueDate: Date
  createdAt: Date
  updatedAt: Date
}
