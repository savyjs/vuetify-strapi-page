<template>
  <v-card tile flat>
    <v-row>
      <v-col v-for="(item,j) in (items||[])" :key="j">
        <v-card flat tile>
          <v-card-title v-if="item.title">{{ item.title }}</v-card-title>
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          <v-img :alt="item.title" v-if="item.image" :src="item.image"/>
          <v-card-text v-if="item.text">
            {{ item.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  props: ['items'],
}
</script>
