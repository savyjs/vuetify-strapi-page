<template>
  <div>
    <v-btn fab small text icon :to="vsp.shop.cart || `/cart`">
      <v-icon>shopping_cart</v-icon>
    </v-btn>
    <v-badge
      :content="cartBadge"
      bordered
      bottom
      color="deep-purple accent-4"
    >
    </v-badge>
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
    mounted() {
      this.$store.dispatch('vspCart/loadCart');
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
