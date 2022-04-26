<template>
  <v-container justify="start" fluid class="mt-5">
    <v-row v-if="article">
      <v-col
        cols="12"
        md="2"
      >
        <v-img
          contain
          v-if="article.img"
          :src="article.img"
          :alt="article.alt"
        />
        <div class="overlay"></div>
        <div class="text-white" v-if="tags">
                    <span v-for="(tag, id) in article.tags" :key="id" v-if="_.has(tags,tag + '.slug')">
            <v-btn
              outlined
              class="mr-1"
              rounded
              :to="`${tagsLink}/${tags[tag].slug}`"
              x-small
            >
              {{ tags[tag].name }}
            </v-btn>
        </span>
        </div>
        <!-- content author component -->
        <div class="my-5">
          <vsp-blog-author v-if="article.author" :author="article.author"/>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <h1 class="font-bold text-4xl">{{ article.title || "" }}</h1>
        <p>{{ article.description || "" }}</p>
        <p class="pb-4" v-if="article.updatedAt">{{ formatDate(article.updatedAt) }}</p>
        <!-- table of contents -->
        <nav class="pb-6">
          <ul>
            <li
              v-for="link of article.toc"
              :key="link.id"
              :class="{
              'font-semibold': link.depth === 2
            }"
            >
              <nuxtLink
                :to="`#${link.id}`"
                class="hover:underline"
                :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
              >{{ link.text }}
              </nuxtLink
              >
            </li>
          </ul>
        </nav>
        <!-- content from markdown -->

        <nuxt-content :document="article"/>
        <v-divider/>
        <!-- prevNext component -->
        <vsp-blog-prev-next :prev="prev" :next="next" class="mt-8"/>
        <br/>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-alert type="warning" dense width="100%">
        {{$t("article_not_found")}}
      </v-alert>
    </v-row>
  </v-container>
</template>
<i18n>
  {
  "en":{
  "article_not_found" : "post not found (404)."
  },
  "fa":{
  "article_not_found": "مقاله پیدا نشد (۴۰۴)"
  }
  }
</i18n>
<script>
  import _ from 'lodash';

  export default {
    props: ['article', 'tags', 'next', 'prev', 'params'],
    data() {
      return {}
    },
    head() {
      return {
        title: _.get(this.article, 'title', "") || "",
        meta: [
          {
            hid: "description",
            name: "description",
            content: _.get(this.article, 'description'),
          },
          {hid: "og-title", property: "og:title", content: _.get(this.article, 'title', "")},
          {
            hid: "og-image",
            property: "og:image",
            content: _.get(this.article, 'img'),
          },
          {hid: "og-image-width", property: "og:image:width", content: 500},
          {hid: "og-image-height", property: "og:image:height", content: 300},
          {
            hid: "og-image-type",
            property: "og:image:type",
            content: "image/jpeg",
          },
        ],
      };
    },
    jsonld() {
      try {
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "datePublished": _.get(this.article, "updatedAt") || "",
          "description": _.get(this.article, "description") || "",
          "articleBody": _.get(this.article, "body") || "",
          "author": _.get(this.article, "author.name") || "",
          "name": _.get(this.article, "title") || ''
        }
      } catch (e) {
        console.error('jsonld error:', e)
      }
    },
    computed: {
      contentsLink() {
        return _.get(this.vsp, 'blog.contents', _.get(this.vsp, 'blog.home', '/'));
      },
      tagsLink() {
        return _.get(this.vsp, 'blog.tags', '/tags');
      },
    },
    created() {
      this._ = _;
    },
    methods: {
      formatDate(date) {
        const options = {year: 'numeric', month: 'long', day: 'numeric'}
        return new Date(date).toLocaleDateString('en', options)
      }
    }
  }
</script>
