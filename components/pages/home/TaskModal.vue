<script setup lang="ts">
import ModalHeader from "~/components/ui/Modal/ModalHeader.vue";
import type { Task } from '~/types/task'
import TaskForm from "~/components/pages/common/TaskForm.vue";
import Modal from '~/components/ui/Modal/Modal.vue'
import ModalBody from '~/components/ui/Modal/ModalBody.vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const { modelValue } = toRefs(props)
const isOpen = ref(modelValue.value)

const initialTask = {
  name: '',
  description: '',
}

watch(modelValue, (value) => {
  isOpen.value = value
})
watch(isOpen, (value) => {
  emit('update:modelValue', value)
})

const { addTask } = useTasks()

function submit(task: Task) {
  addTask(task)
  isOpen.value = false
}
</script>

<template>
  <Modal v-model="isOpen">
    <ModalHeader>
      <p class="text-xl font-bold">
        {{ $t('components.pages.home.task-modal.title') }}
      </p>
    </ModalHeader>
    <ModalBody>
      <TaskForm :initial-task="initialTask" @submit="submit" />
    </ModalBody>
  </Modal>
</template>
