<template>
  <v-row>
    <v-col cols="3" lg="2" class="d-flex align-center justify-start">
      Home
    </v-col>
    <v-col class="d-flex align-center justify-start">
      <VspShopSearch :search-url="searchUrl" :root-link="productRootLink" />
    </v-col>
    <v-col cols="12" md="3" class="d-flex justify-end align-center">
      <v-btn class="mx-1 px-1" color="grey" small outlined @click="$nuxt.$emit('VspLoginModal',true)">
        <v-icon class="mx-1" small>account_circle</v-icon>
        {{$t('login')}}
      </v-btn>
      <v-divider inset light class="mx-1" vertical/>
      <VspShopCart/>
    </v-col>
    <v-col cols="12">
      <VspShopMegaMenu v-model="menuItems" :root-link="rootLink"/>
      <VspStripe v-if="false" v-model="menuItems"/>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    props: ['menuItems', 'rootLink','searchUrl','productRootLink']
  }
</script>
