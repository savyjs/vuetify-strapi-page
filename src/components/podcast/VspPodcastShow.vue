<template>
  <v-row justify="center">
    <v-col cols="12">
      <vsp-podcast-block :mini="false" :item="item"/>
    </v-col>
  </v-row>
</template>
<script>

  export default {
    props: ['item'],
  }
</script>
