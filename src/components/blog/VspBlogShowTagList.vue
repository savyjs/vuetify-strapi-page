<template>
  <div
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div v-if="_.has(tag,'img','')" class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img
        :src="tag.img"
        :alt="tag.name"
        class="absolute h-full w-full object-cover"
      />
    </div>
    <div class="overlay"></div>
    <div class="absolute top-32 left-32 right-32 text-white">
      <NuxtLink to="/">
        <Logo/>
      </NuxtLink>
      <div class="mt-16 -mb-3 flex flex-col text-sm">
        <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
          <h1 v-if="_.has(tag,'name')" class="text-4xl font-bold uppercase">
            {{ tag.name }}
          </h1>
          <p class="mb-4 uppercase" v-if="_.has(tag,'description')">{{ tag.description }}</p>
          <nuxt-content :document="tag"/>
        </div>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <NuxtLink to="/"
      ><p class="hover:underline">Back to All Articles</p></NuxtLink
      >
      <h3 class="mb-4 font-bold text-4xl" v-if="_.has(tag,'name')">Articles tagged {{ tag.name }}:</h3>

      <v-card
        v-for="article in articles"
        :key="article.slug"
        v-if="article"
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
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: ['articles', 'tags', 'tag'],
    data() {
      return {}
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
