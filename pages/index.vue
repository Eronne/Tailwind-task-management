<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'

const { t } = useI18n()
useHead({
  title: t('pages.home.title'),
})

const { tasks } = useTasksStore()
</script>

<template>
  <div>
    <pre>{{ tasks }}</pre>
  </div>
</template>
