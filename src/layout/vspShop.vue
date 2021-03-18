<template>
  <v-app>
    <v-container>
      <VspShopHeader :menu-items="menuItems"/>
      <VspLoginModal/>
      <VspRegisterModal/>
    </v-container>
    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
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
    }
  }
</script>
