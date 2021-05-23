<template>
  <v-card tile flat>
    <v-slide-x-transition>
      <v-container>
        <v-row>
          <v-col v-for="(item,j) in items" :key="j" v-show="item" :cols="cols || 12" :sm="sm || 6" :md="md || 4"
                 :xl="xl || 3">
            <vsp-reserve-item-card :item="item"/>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-x-transition>
  </v-card>
</template>
<script>
  export default {
    props: ['items', 'cols', 'sm', 'md', 'xl'],
    data() {
      return {
        margin: 0,
      }
    }
  }
</script>
