<template>
  <v-row>
    <v-col cols="12">
      <NuxtLink
        :to="`/blog/author/${author.name}`"
      >
        <v-img
          contain
          v-if="author.img"
          :src="author.img"
        />
      </NuxtLink>
    </v-col>
    <v-col cols="12" class="grey--text">
      <h4 class="font-semibold">Author</h4>
      <p>{{ author.name }}</p>
      <p>{{ author.bio }}</p>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      author: {
        type: Object,
        required: true
      }
    }
  }
</script>
