<template>
  <div>
    <v-text-field
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      clearable
      append-icon="search"
      outlined
      dense
      :placeholder="$t('SearchArticles')"
    />
    <ul
      v-if="articles.length"
      class="z-10 absolute w-auto flex-1 top-40 bg-white dark:bg-gray-900 rounded-md border border-gray-300 overflow-hidden"
    >
      <li v-for="article of articles" :key="article.slug">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex px-4 py-2 items-center leading-5 transition ease-in-out duration-150 text-green-500 hover:text-black"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<i18n>
  {
  "fa":{
  "SearchArticles":"جست و جوی مقالات"
  },
  "en":{
  "SearchArticles":"Search Articles"
  }
  }
</i18n>
<script>
  export default {
    data() {
      return {
        searchQuery: '',
        articles: []
      }
    },
    watch: {
      async searchQuery(searchQuery) {
        if (!searchQuery) {
          this.articles = []
          return
        }
        this.articles = await this.$content('articles')
          .limit(6)
          .search(searchQuery)
          .fetch()
          .catch(err => {
            alert(err);
          })
      }
    }
  }
</script>
