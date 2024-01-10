import { useStorage } from '@vueuse/core'
import type { Task } from '~/types/task';
import { TaskStatus } from "~/constants/task";

export interface AddTaskParams {
  name: string
  description: string
}

const state = useStorage<{ tasks: Task[] }>('use-tasks', {
  tasks: [],
})

export default () => {
  const addTask = ({ name, description }: AddTaskParams) => {
    state.value.tasks.push({
      id: String(Math.random()),
      name,
      description,
      status: TaskStatus.TODO,
    })
  }
  const editTask = (task: Task) => {
    const index = state.value.tasks.findIndex(t => t.id === task.id)
    state.value.tasks[index] = task
  }
  const deleteTask = (task: Task) => {
    const index = state.value.tasks.findIndex(t => t.id === task.id)
    state.value.tasks.splice(index, 1)
  }

  return {
    ...state.value,
    addTask,
    editTask,
    deleteTask,
  }
}
