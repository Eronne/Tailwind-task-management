<script setup lang="ts">
import Modal from '~/components/ui/Modal/Modal.vue'
import ModalBody from '~/components/ui/Modal/ModalBody.vue'
import Button from '~/components/ui/Button/Button.vue'
import Input from '~/components/ui/Input.vue'
import type { AddTaskParams } from '~/composables/useTasks'

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
const { modelValue } = toRefs(props)
const isOpen = ref(modelValue.value)
watch(modelValue, (value) => {
  isOpen.value = value
})

watch(isOpen, (value) => {
  emit('update:modelValue', value)
})

const newTask = reactive<AddTaskParams>({
  name: '',
  description: '',
})
const isFormValid = computed(() => {
  return newTask.name.length > 0 && newTask.description.length > 0
})
const { addTask } = useTasks()

function submitForm() {
  addTask(newTask)
  newTask.name = ''
  newTask.description = ''
  isOpen.value = false
}
</script>

<template>
  <Modal v-model="isOpen">
    <ModalBody>
      <p class="mb-5 text-xl font-bold">
        {{ $t('components.pages.home.task-modal.title') }}
      </p>

      <div class="mb-5">
        <label for="name" class="block mb-1 font-bold">{{ $t('components.pages.home.task-modal.form.name.label') }}</label>
        <Input
          id="name"
          v-model="newTask.name"
          :placeholder="$t('components.pages.home.task-modal.form.name.placeholder')"
        />
      </div>

      <div class="mb-5">
        <label for="description" class="block mb-1 font-bold">{{ $t('components.pages.home.task-modal.form.description.label') }}</label>
        <Input
          id="name"
          v-model="newTask.description"
          :placeholder="$t('components.pages.home.task-modal.form.description.placeholder')"
        />
      </div>

      <div class="flex justify-end">
        <Button :disabled="!isFormValid" @click="submitForm">
          {{ $t('common.cta.add') }}
        </Button>
      </div>
    </ModalBody>
  </Modal>
</template>
