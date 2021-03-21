<template>
  <div>
    <v-row
      v-for="article of articles"
      :key="article.slug"
      class="my-5"
    >
      <v-card
        flat
        color="grey lighten-5"
        :to="`${contentsLink}/${article.slug}`"
      >
        <v-row>
          <v-col cols="12" md="9">
            <v-card-title>
              <h2 class="font-bold">{{ article.title }}</h2>
              <v-spacer/>
              <small>{{ article.author.name }}</small>
            </v-card-title>
            <v-card-text class="py-5 font-bold text-gray-600 text-sm">
              {{ article.description }}
            </v-card-text>
          </v-col>
          <v-col cols="12" md="3">
            <v-img
              contain
              v-if="article.img"
              :src="article.img"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
  export default {
    layout:"vspBlog",
    data() {
      return {
        articles: undefined,
        tags: undefined
      }
    },
    computed: {
      contentsLink() {
        return this.vsp.blog.contents || this.vsp.blog.home || '/';
      },
      tagsLink() {
        return this.vsp.blog.tags || '/tags';
      },
    },
    async asyncData({params, $content}) {
      const articles = await $content('articles')
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('createdAt', 'desc')
        .fetch()
        .catch(err => {
        })
      const tags = await $content('tags')
        .only(['name', 'description', 'img', 'slug'])
        .sortBy('createdAt', 'asc')
        .fetch()
        .catch(err => {
        })
      return {articles, tags}
    }
  }
</script>

<style class="postcss">
  .article-card {
    border-radius: 8px;
  }

  .article-card a {
    background-color: #fff;
    border-radius: 8px;
  }

  .article-card img div {
    border-radius: 8px 0 0 8px;
  }
</style>
