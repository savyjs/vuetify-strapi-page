<template>
  <div>
    <link v-if="_.has(item,'canonical')" rel="canonical" :href="item.canonical"/>
    <v-container class="reserveBg" fluid>
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="6">
            <v-card v-if="_.has(item,'img')" rounded class="pa-5">
              <v-img :src="item.img" contain/>
            </v-card>
            <br/>
            <div class="text-center">
              <v-btn small color="white" outlined rounded target="_blank" v-if="documentationLink"
                     :href="documentationLink">
                <v-icon small class="mx-1">description</v-icon>
                Documentation
              </v-btn>
              <v-btn small color="white" rounded target="_blank" :href="demoLink" v-if="demoLink">
                <v-icon small class="mx-1" color="grey">info</v-icon>
                Demo
              </v-btn>
            </div>
          </v-col>
          <v-col cols="6" class="text-center white--text">
            <h1 class="text-white" v-if="_.has(item,'title')">{{item.title}}</h1>
            <h3 class="text-white font-13" v-if="_.has(item,'subtitle')">{{item.subtitle}}</h3>
            <br/>
            <span class="text-white font-13" v-if="_.has(item,'downloads')">
              <v-icon small color="white" class="mx-1">save_alt</v-icon>
              Installs: {{item.downloads}}
            </span>
            <br/>
            <p class="text-white font-13" v-if="_.has(item,'stars')">
              <v-icon color="white"
                      v-for="j in item.stars"
                      small
                      class="mx-1"
                      :key="j">star
              </v-icon>
            </p>
            <p class=" text-white font-13">
              <v-icon small color="white" class="mx-1">receipt</v-icon>
              License: (EAUL)
            </p>
            <v-divider dark class="my-3"/>
            <v-btn color="white" class="grey-text" rounded target="_blank" v-if="buyLink" :href="buyLink">Get
              <v-divider vertical class="mx-1"/>
              {{item.price}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container>
      <v-card>
        <vsp-v-card-header v-if="false" left="1%" right="1%">
          <h1 class="font-16 px-2">
            {{_.get(item,'title','')}}
          </h1>
          <v-spacer/>
          <h2 class="font-13 px-2">{{_.get(item,'subtitle','')}}</h2>
        </vsp-v-card-header>
        <v-card-text>
          <v-row>
            <v-col cols="12" order-md="2" md="4">
              <div class="d-flex justify-space-around">
                <v-btn color="info" @click="vsp.Helper.copyToClipboard" rounded x-small>
                  <v-icon class="mx-1" x-small>content_copy</v-icon>
                  Copy Link
                </v-btn>
                <span class="font-12">
                  <template v-if="_.get(item,'discount',0) && _.get(item,'price',0)">
                    <b class="px-3 mr-1 teal--text">
                      {{ _.isNumber(item.price) ? $Helper.price(item.price-item.discount,'$') : (item.price || '')}}
                    </b>
                    <i class="ml-1 px-3 red white--text"><small>{{$Helper.price(item.discount,'$')}}
                      {{$t('off')}}</small></i>
                  </template>
                </span>
              </div>
              <div>
                <table class="oddTable">
                  <tbody>
                  <tr v-for="(row,key) in _.get(item,'rows',[])" :key="key">
                    <td v-if="row.title">
                      {{row.title || ''}}
                    </td>
                    <td v-if="row.value">
                      {{row.value || ''}}
                    </td>
                    <td v-if="row.icon">
                      <v-icon>{{row.icon}}</v-icon>
                    </td>
                    <td v-if="row.image">
                      <img :src="row.image"/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <v-tooltip bottom v-for="(badge,key) in _.get(item,'badges',[])" :key="key">
                <template v-slot:activator="{ on }">
                  <v-btn class="ml-1" :color="badge.color || 'primary'" v-on="on" outlined fab small>
                    <v-icon small>{{badge.icon}}</v-icon>
                  </v-btn>
                </template>
                <span v-if="_.has(badge,'title')">{{badge.title}}</span>
              </v-tooltip>
              <div>
                <v-chip
                  v-for="(tag,key) in _.get(item,'tags',[])"
                  :key="key"
                  small
                  dark
                  class="ml-1 my-1"
                  color="green lighten-1"
                >
                  <v-icon color="white" small class="mx-1 font-11">{{tag.icon}}</v-icon>
                  <span class="mx-1" v-if="_.has(tag,'title')">{{tag.title}}</span>
                </v-chip>
              </div>
              <div class="mr-1 d-flex">
                <v-img :cover="false" :contain="false" max-width="100%" class="mx-1"
                       v-for="(image,i) in _.get(item,'tagImages',[])" :key="i" :src="image"/>
              </div>
            </v-col>
            <v-col cols="12" order-md="1" md="8">
              <article v-if="_.get(item,'description',null)" v-html="_.get(item,'description',null)"></article>
              <v-divider class="my-5" v-if="article && _.get(item,'description',null)"/>
              <nuxt-content v-if="article" :document="article"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: ['item', 'article', 'tags'],
    data() {
      return {
        tab: 0
      }
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
        let jsnoLD = {
          "@context": 'https://schema.org',
          "@type": 'Product',
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": _.get(this.item, 'downloads', 11)
          },
          "name": _.get(this.item, 'title', ''),
          "image": this.vsp.API_URL + _.get(this.item, 'image.url', ''),
          "description": _.get(this.item, 'subtitle', '') + ' - ' + _.get(this.item, 'description', this.article || '')
        };
        return jsnoLD;
      } catch (e) {
        console.error('jsonLD', {e})
      }
    },
    computed: {
      buyLink() {
        return _.get(this.item, 'link', false)
      },
      demoLink() {
        return _.get(this.item, 'demo', false)
      },
      documentationLink() {
        return _.get(this.item, 'documentation', false)
      },
    },

    created() {
      this._ = _;
    },
  }
</script>
