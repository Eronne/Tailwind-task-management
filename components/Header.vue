<script setup lang="ts">
const navigation = [
  { title: 'Home', to: '/' },
]
</script>

<template>
  <div class="bg-white">
    <div class="px-6 py-6 lg:px-8">
      <Nav :navigation="navigation" />
    </div>
  </div>
</template>
