<template>
  <v-app>
    <v-container>
      <VspShopHeader
        :product-root-link="productLinkRoot"
        :search-url="searchUrl"
        :root-link="rootLink"
        :menu-items="menuItems"
      />
      <VspLoginModal/>
      <VspRegisterModal/>
    </v-container>
    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
  import _ from 'lodash'

  export default {
    data() {
      return {
        menuItems: []
      }
    },
    mounted() {
      this.$axios.$get(this.vsp.shop.categoriesUrl).then(res => {
        this.menuItems = res;
      })
    },
    computed: {
      rootLink() {
        return _.get(this, 'vsp.shop.categories', '/categories')
      },
      productLinkRoot() {
        return _.get(this, 'vsp.shop.products', '/product')
      },
      searchUrl() {
        return _.get(this, 'vsp.shop.productsUrl', '/products')
      }
    }
  }
</script>
