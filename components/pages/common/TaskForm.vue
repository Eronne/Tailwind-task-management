<script setup lang="ts">
import type { Task } from "~/types/task";
import Button from '~/components/ui/Button/Button.vue'
import Input from '~/components/ui/Input.vue'
import type { AddTaskParams } from '~/composables/useTasks'

const props = defineProps<{
  initialTask: Task | AddTaskParams
}>()
const emit = defineEmits(['submit'])

const formModel = reactive<AddTaskParams>({
  name: props.initialTask?.name ?? '',
  description: props.initialTask?.description ?? '',
})
const isFormValid = computed(() => {
  return formModel.name.length > 0 && formModel.description.length > 0
})

function submit() {
  const payload = {
    ...props.initialTask,
    ...formModel,
  }
  emit('submit', payload)
  formModel.name = ''
  formModel.description = ''
}
</script>

<template>
  <div class="mb-5">
    <label for="name" class="block mb-1 font-bold">{{ $t('components.pages.home.task-modal.form.name.label') }}</label>
    <Input
      id="name"
      v-model="formModel.name"
      :placeholder="$t('components.pages.home.task-modal.form.name.placeholder')"
    />
  </div>

  <div class="mb-5">
    <label for="description" class="block mb-1 font-bold">{{ $t('components.pages.home.task-modal.form.description.label') }}</label>
    <Input
      id="name"
      v-model="formModel.description"
      :placeholder="$t('components.pages.home.task-modal.form.description.placeholder')"
    />
  </div>

  <div class="flex justify-end">
    <Button :disabled="!isFormValid" @click="submit">
      {{ $t('common.cta.add') }}
    </Button>
  </div>
</template>
