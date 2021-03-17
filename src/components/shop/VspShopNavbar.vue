<template>
  <div>
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
    <div class="flex justify-between ml-6 mr-6 mt-4">
      <nuxt-link to="/">
    <span class="emoji">
      <img :src="logo" class="logo" width="100px"/>
    </span>
      </nuxt-link>
      <nuxt-link :to="vsp.shop.cart || `/cart`" class="snipcart-checkout flex items-center">
        <v-icon>shopping_cart</v-icon>
        <span class="snipcart-total-price ml-3 font-semibold text-sm text-indigo-500">
                    {{cartBadge}}
                </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  const logo = _.get(process, 'env.LOGO', '');
  export default {
    data() {
      return {
        logo
      }
    },
    computed: {
      cartBadge() {
        let items = this.$store.state.vspCart.items || [];
        return items.length;
      }
    },
    created() {
      this.$nuxt.$on('addToCart', (item) => {
        this.addToCart(item);
      })
    },
    methods: {
      async addToCart(item) {
        try {
          let result = await this.$store.dispatch('vspCart/addToCart', item);
        } catch (e) {
          console.log({e})
        }
      },
      async removeFromCart(item) {
        try {
          let result = await this.$store.dispatch('vspCart/removeFromCart', item);
        } catch (e) {
          console.log({e})
        }
      },
    },
    components: {}
  }
</script>

<style>
  .emoji {
    font-size: 30px;
  }

</style>
