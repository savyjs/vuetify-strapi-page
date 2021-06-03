<template>
  <div
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div v-if="_.has(articles,'0.author.img','')" class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img
        :src="articles[0].author.img"
        :alt="articles[0].author.name || ''"
        class="absolute h-full w-full object-cover"
      />
    </div>
    <div class="overlay"></div>
    <div class="absolute top-32 left-32 text-white">
      <NuxtLink to="/">
        <Logo/>
      </NuxtLink>
      <div class="mt-16 -mb-3 flex flex-col uppercase text-sm">
        <h1 v-if="_.has(articles,'0.author.name','')" class="text-4xl font-bold">
          {{ articles[0].author.name || ''}}
        </h1>
        <p class="mb-4" v-if="_.has(articles,'0.author','')">{{ articles[0].author.bio }}</p>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <NuxtLink to="/"
      ><p class="hover:underline">Back to All Articles</p></NuxtLink
      >
      <h3 class="mb-4 font-bold text-4xl" v-if="_.has(articles,'0.author','')">
        Here are a list of articles by {{ articles[0].author.name }}:
      </h3>
      <ul>
        <li
          v-for="article in articles"
          :key="article.slug"
          class="w-full px-2 xs:mb-6 md:mb-12 article-card"
        >
          <NuxtLink
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
          >
            <img
              v-if="article.img"
              class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
              :src="article.img"
              :alt="article.alt"
            />

            <div
              class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
            >
              <h2 class="font-bold">{{ article.title }}</h2>
              <p>{{ article.description }}</p>
              <p class="font-bold text-gray-600 text-sm">
                {{ formatDate(article.updatedAt) }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: ['articles'],
    data() {
      return {}
    },
    computed: {
      contentsLink() {
        return this.vsp.blog.contents || this.vsp.blog.home || '/';
      },
      tagsLink() {
        return this.vsp.blog.tags || '/tags';
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
