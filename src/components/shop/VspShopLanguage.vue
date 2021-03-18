<template>
  <div class="flex justify-end ml-6 mr-6 mt-4">
    <nuxt-link :to="switchLocalePath('en')"
               class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 ml-2 border border-gray-400 rounded shadow">
      English
    </nuxt-link>
    <nuxt-link :to="switchLocalePath('fa')"
               class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 ml-2 border border-gray-400 rounded shadow">
      فارسی
    </nuxt-link>
  </div>
</template>
