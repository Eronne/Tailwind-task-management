<template>
  <footer>
    <div
      class="container text-center md:text-left px-4 py-5 mx-auto flex flex-col sm:flex-row justify-between gap-2 sm:items-center"
    >
      <NuxtLink to="/" class="font-semibold text-lg">
        {{ $t("common.app-name") }}
      </NuxtLink>

      <div class="text-sm text-gray-600">
        <span>Made by <a href="https://github.com/Eronne" target="_blank" class="font-medium hover:underline text-gray-800">Eronne</a>.</span>
      </div>
    </div>
  </footer>
</template>
