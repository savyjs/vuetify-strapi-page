<template>
  <header class="flex">
    <v-row justify="center">
      <v-col
        cols="12">
        <v-row justify="space-between">
          <v-col
            cols="12"
            class="d-flex justify-start align start"
            lg="8">
            <NuxtLink class="text-left d-flex justify-start align-center" :to="blogHome">
              <v-img position="center left" :src="blogLogo" height="70px" contain/>
              <h1 style="text-underline: none">{{$t(blogTitle)}}</h1>
            </NuxtLink>
          </v-col>
          <v-col
            cols="12"
            lg="4">
            <VspBlogSearchInput class="ml-8"/>
          </v-col>
          <v-col cols="12">
            <v-row class="d-flex align-content-center pb-1 flex-wrap">
              <v-col>
                <h2 class="mt-4 mb-1">
                  {{$t(blogSubtitle)}}
                </h2>
              </v-col>
              <v-col class="d-flex align-end justify-end">
                <template v-for="(item,j) in menuItems">
                  <span v-if="j>0" class="mx-1" style="padding-bottom: 1px">•</span>
                  <v-btn small text :to="item.link">{{item.text}}</v-btn>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <span
            v-for="(tag,i) of tags"
            :key="tag.slug"
            class="px-2 my-2 text-left"
          >
            <NuxtLink text :to="`${tagsLink}/${tag.slug}`" class="grey--text px-1">
              <small>
                {{ tag.name }}
              </small>
            </NuxtLink>
          </span>
        </v-row>
      </v-col>
    </v-row>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        articles: [],
        tags: []
      }
    },
    async mounted() {
      const tags = await this.$content('tags')
        .only(['name', 'description', 'img', 'slug'])
        .sortBy('createdAt', 'asc')
        .fetch().then(res => {
          this.tags = res
        })
        .catch(err => {
          alert(err)
        })
    },
    computed: {
      blogSubtitle() {
        return this.vsp.blog.subtitle || 'sub title here';
      },
      blogTitle() {
        return this.vsp.blog.title || 'Blog';
      },
      blogLogo() {
        return this.vsp.blog.logo || '/logo.png';
      },
      blogHome() {
        return this.vsp.blog.home || '/';
      },
      contentsLink() {
        return this.vsp.blog.contents || this.vsp.blog.home || '/';
      },
      tagsLink() {
        return this.vsp.blog.tags || '/tags';
      },
      menuItems() {
        return this.vsp.blog.menu || [];
      }
    }
  }
</script>
