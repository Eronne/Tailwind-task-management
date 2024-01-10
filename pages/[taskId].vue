<script setup lang="ts">
import type { Task } from '~/types/task'
import TaskForm from '~/components/pages/common/TaskForm.vue'

const { t } = useI18n()
useHead({
  title: t('pages.task-id.head.title'),
})

const { params } = useRoute()
const { editTask, tasks } = useTasks()
const task = ref(tasks.find(task => task.id === params.taskId) ?? null)

function submit(task: Task) {
  editTask(task)
  navigateTo('/')
}
</script>

<template>
  <div>
    <div class="flex justify-between mb-10">
      <NuxtLink :to="localePath('/')" class="text-xl">
        <Icon
          name="heroicons:arrow-left-20-solid"
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        {{ $t('common.cta.back') }}
      </NuxtLink>
    </div>

    <TaskForm :initial-task="task" @submit="submit" />
  </div>
</template>
