<template>
  <div>
    <v-card
      v-for="article of articles"
      :key="article.slug"
      flat
      color="grey lighten-5"
      class="my-5 full"
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
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: ['articles', 'tags'],
    data() {
      return {}
    },
    created() {
      this._ = _;
    },
    jsonld() {
      try {
        let breadcrumbjsnoLD = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": []
        };
        let i = 1;
        let url = this.vsp.baseUrl;
        for (let article of this.articles) {
          breadcrumbjsnoLD['itemListElement'].push({
            "@type": "ListItem",
            "position": i++,
            "name": article.title,
            "item": url + this.contentsLink + '/' + article.slug
          });
        }
        return breadcrumbjsnoLD;
      } catch (e) {
        console.error({e})
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
