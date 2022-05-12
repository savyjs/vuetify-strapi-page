<template>
  <v-row class="d-flex justify-center">
    <v-col cols="12" md="8" lg="5">
      <vsp-podcast-block :mini="true" v-for="item in items" :key="item.id" :item="item"/>
    </v-col>
  </v-row>
</template>
<script>

  export default {
    props: ['items', 'main'],
    methods: {}
  }
</script>
