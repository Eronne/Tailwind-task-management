import { defineStore } from 'pinia'
import type { Task } from '~/types/task'

export interface TasksState {
  tasks: Task[]
  addTask: (task: Task) => void
  editTask: (task: Task) => void
  deleteTask: (task: Task) => void
}

export const useTasksStore = defineStore<'tasksStore', TasksState>(
  'tasksStore',
  () => {
    const tasks = ref<Task[]>([])
    const addTask = (task: Task) => {
      tasks.value.push(task)
    }
    const editTask = (task: Task) => {
      const index = tasks.value.findIndex(t => t.id === task.id)
      tasks.value[index] = task
    }
    const deleteTask = (task: Task) => {
      const index = tasks.value.findIndex(t => t.id === task.id)
      tasks.value.splice(index, 1)
    }

    return {
      tasks: tasks.value,
      addTask,
      editTask,
      deleteTask,
    }
  },
)
