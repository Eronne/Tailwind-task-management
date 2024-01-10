<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="container flex-1 z-0 mx-auto px-4 py-6 max-w-screen-sm lg:px-0">
      <slot />
    </div>
    <Footer />
  </div>
</template>
