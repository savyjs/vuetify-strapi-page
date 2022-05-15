<template>
  <header class="flex">
    <v-row justify="center">
      <v-col cols="12">
        <v-row justify="space-between">
          <v-col
            cols="12"
            class="d-flex justify-start align start"
            lg="8">
            <nuxt-link
              active-class=""
              exact-active-class=""
              class="text-start d-flex justify-start align-center" :to="blogHome">
              <v-img
                v-if="blogLogo"
                position="center left"
                :src="blogLogo"
                max-width="100px"
                max-height="70px"
                contain
              />
              <h1 v-if="blogTitle" style="text-underline: none">{{$t(blogTitle)}}</h1>
            </nuxt-link>
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
        <v-chip-group>
          <v-chip
            outlined
            small
            v-for="(tag,i) of tags"
            :key="tag.slug"
            class="px-2 my-2"
            color="success"
            :to="`${tagsLink}/${tag.slug}`"
          >
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
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
        return this.vsp.blog.subtitle || '';
      },
      blogTitle() {
        return this.vsp.blog.title || '';
      },
      blogLogo() {
        return this.vsp.blog.logo || '/logo.png';
      },
      blogHome() {
        return _.get(this.vsp, 'blog.home', '/') || '/';
      },
      contentsLink() {
        return _.get(this.vsp, 'blog.contents', _.get(this.vsp, 'blog.home', '/'));
      },
      tagsLink() {
        return _.get(this.vsp, 'blog.tags', '/tags');
      },
      menuItems() {
        return this.vsp.blog.menu || [];
      }
    }
  }
</script>
