<script setup lang="ts">
interface Classes {
  wrapper?: string
  body?: string
}

withDefaults(
  defineProps<{
    classes?: Classes
    bodyClass?: string
  }>(),
  {
    classes: () => ({
      wrapper: 'overflow-hidden border border-gray-200 rounded-lg bg-white',
      body: '',
    }),
  },
)
</script>

<template>
  <div :class="classes.wrapper">
    <div class="px-4 py-3 text-gray-600" :class="[classes.body, bodyClass]">
      <slot />
    </div>
  </div>
</template>
