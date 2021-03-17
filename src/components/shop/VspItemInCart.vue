<template>
  <div
    class="border border-gray-200 bg-gray grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
    <div class="rounded-t-lg pt-2 pb-2">
      <img :src="`${getStrapiMedia(item.image.formats.thumbnail.url)}`" class="m-auto">
    </div>
    <div class="w-full p-5 flex flex-col justify-between">
      <div>
        <h4 class="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">{{item.title}} -
          ${{ item.price }}</h4>
        <div class="mt-1 text-gray-600">{{ item.description }}</div>
      </div>
      <div class="p-5 flex flex-row ">
        <button
          @click="addToCart(item)"
          class="mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
        >
          +
        </button>
        <input
          style="width: 40px"
          disabled
          v-model="cart[item.id].count"
          class="mt-4 text-center bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-1 rounded shadow"/>
        <button
          @click="removeFromCart(item)"
          class="mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
        >
          -
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    data() {

    },
    methods: {
      async changeNumber(item, value) {
        // TODO
      },
      async addToCart(item) {
        try {
          let result = await this.$store.dispatch('cart/addToCart', item);
        } catch (e) {
          console.log({e})
        }
      },
      async removeFromCart(item) {
        try {
          let result = await this.$store.dispatch('cart/removeFromCart', item);
        } catch (e) {
          console.log({e})
        }
      },
    }
  }
</script>
