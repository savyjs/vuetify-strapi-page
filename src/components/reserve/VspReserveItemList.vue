<template>
  <v-card tile flat :color="separate ? 'transparent' : ''">
    <v-slide-x-transition>
      <v-container>
        <v-row>
          <v-col
            v-for="(item,j) in items"
            :key="j"
            v-show="item"
            :cols="cols || 12"
            :sm="sm || 6"
            :md="md || 4"
            :xl="xl || 3">
            <vsp-reserve-item-card :item="item"/>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-x-transition>
  </v-card>
</template>
<script>
  import _ from 'lodash';

  export default {
    props: ['items', 'cols', 'sm', 'md', 'xl', 'separate'],
    data() {
      return {
        margin: 0,
      }
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
        for (let item of this.items || []) {
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
    computed:{
      contentsLink() {
        return this.vsp.blog.contents || this.vsp.blog.home || '/';
      },
    },
    created() {
      this._ = _;
    }
  }
</script>
