<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

defineProps<{
  navigation: any[]
}>()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>

<template>
  <nav class="container mx-auto flex items-center justify-between" aria-label="Global">
    <div class="flex lg:flex-1">
      <Logo />
    </div>

    <!-- Mobile -->
    <div class="flex lg:hidden">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span class="sr-only">Open main menu</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>

    <!-- Desktop -->
    <div class="flex align-middle">
      <div class="hidden mr-4 lg:flex lg:gap-x-12">
        <template v-for="item in navigation" :key="item.title">
          <NuxtLink :to="item.to" class="text-sm font-semibold leading-6 text-gray-900">
            {{ item.title }}
          </NuxtLink>
        </template>
      </div>

      <NuxtLink
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <span class="text-xs uppercase">{{ locale.code }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
