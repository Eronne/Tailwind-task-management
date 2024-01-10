<script setup lang="ts">
import TaskModal from '~/components/pages/home/TaskModal.vue'
import Button from '~/components/ui/Button/Button.vue'
import Card from '~/components/ui/Card/Card.vue'
import Select from '~/components/ui/Select/Select.vue'
import type { SelectItem } from '~/components/ui/Select/types'
import { TaskStatus } from '~/constants/task'

const { t } = useI18n()
useHead({
  title: t('pages.home.head.title'),
})

const isModalVisible = ref(false)
const { deleteTask, tasks } = useTasks()

const statusesItems: SelectItem[] = [
  { text: t('common.task.statuses.todo'), value: TaskStatus.ToDo },
  { text: t('common.task.statuses.in-progress'), value: TaskStatus.InProgress },
  { text: t('common.task.statuses.done'), value: TaskStatus.Done },
]
</script>

<template>
  <div>
    <div class="flex justify-between mb-10">
      <p class="text-xl">
        {{ $t('pages.home.title', tasks.length, { count: tasks.length }) }}
      </p>
      <Button @click="isModalVisible = true">
        {{ $t('pages.home.add-task') }}
      </Button>
    </div>
    <template v-if="tasks.length > 0">
      <Card
        v-for="(task, taskIndex) in tasks"
        :key="task.id"
        :class="{
          'mb-4': taskIndex !== tasks.length - 1,
          'bg-gray-50 border-gray-50': task.status === TaskStatus.ToDo,
          'bg-warning-50 border-warning-50': task.status === TaskStatus.InProgress,
          'bg-success-50 border-success-50': task.status === TaskStatus.Done,
        }"
        hide-header
        hide-footer
      >
        <div class="flex justify-between align-middle mb-2">
          <p class="self-center">
            {{ task.name }}
          </p>

          <div class="flex align-middle">
            <Select v-model="task.status" :items="statusesItems" class="hidden mr-2 sm:block" />

            <Button variant="ghost" @click="deleteTask(task)">
              <Icon name="heroicons:x-mark-20-solid" class="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Select v-model="task.status" :items="statusesItems" class="mb-3 sm:hidden" />

        <p class="text-sm">
          {{ task.description }}
        </p>
      </Card>
    </template>
    <p v-else class="text-center">
      {{ $t('pages.home.no-task') }}
    </p>

    <TaskModal v-model="isModalVisible" />
  </div>
</template>
