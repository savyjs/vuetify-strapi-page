<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="8" lg="5">
      <vsp-show-media-block :mini="mini" v-for="item in items" :key="item.id" :item="item"/>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    props: ['mini', 'items']
  }
</script>
