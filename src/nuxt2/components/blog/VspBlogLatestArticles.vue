<template>
  <v-row>
    <v-col
      cols="12"
      xl="6"
      v-for="article of articles"
      :key="article.slug"
    >
      <v-card
        class="my-5"
        height="100%"
        :to="`${contentsLink}/${article.slug}`"
      >
        <v-row>
          <v-col cols="12" :md="article.img ? 9 : 12">
            <v-card-title>
              <h2 class="font-bold font-13">{{ article.title }}</h2>
              <v-subheader v-if="article.updatedAt">{{ formatDate(article.updatedAt) }}</v-subheader>
              <v-spacer/>
              <small v-if="article.author">{{ article.author.name || "" }}</small>
            </v-card-title>
            <v-card-text v-if="article.description" class="py-5 font-bold text-gray-600 text-sm">
              {{ article.description || "" }}
            </v-card-text>
          </v-col>
          <v-col cols="12" md="3" v-if="article.img">
            <v-img
              contain
              :src="article.img"
            />
          </v-col>
          <v-col cols="12">
            <v-chip v-if="article.tags" v-for="(tag, id) in article.tags" :key="id">
              <v-btn
                v-if="tags[tag].name"
                outlined
                class="mr-1"
                rounded
                :to="`/blog/tag/${tags[tag].slug}`"
                x-small
              >
                {{ tags[tag].name }}
              </v-btn>
            </v-chip>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<i18n>
{
  "en": {
    "article_not_found": "post not found (404)."
  },
  "fa": {
    "article_not_found": "مقاله پیدا نشد (۴۰۴)"
  }
}
</i18n>
<script>
import _ from 'lodash';
export default {
  props: ['articles', 'tags'],
  data() {
    return {}
  },
  computed: {
    contentsLink() {
      return _.get(this.vsp, 'blog.contents', _.get(this.vsp, 'blog.home', '/'));
    },
    tagsLink() {
      return _.get(this.vsp, 'blog.tags', '/tags');
    },
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
      for (let item of this.articles) {
        breadcrumbjsnoLD['itemListElement'].push({
          "@type": "ListItem",
          "position": i++,
          "name": item.title,
          "item": url + this.contentsLink + '/' + item.slug
        });
      }
      return breadcrumbjsnoLD;
    } catch (e) {
      console.error({e})
    }
  },
  methods: {
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'}
      return new Date(date).toLocaleDateString('en', options)
    }
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
