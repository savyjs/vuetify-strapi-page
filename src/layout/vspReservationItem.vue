<template>
  <v-app>
    <v-card tile class="ma-0 pa-0 grey lighten-4">
      <v-container class="reserveBg" fluid>
        <v-container>
          <v-row>
            <v-col class="d-flex justify-start align-center">
              <nuxt-link v-if="logo" exact-active-class="" active-class="" :to="_.get(vsp,'reservation.home','/')">
                <v-img :src="logo" max-width="100px" contain max-height="70px"/>
              </nuxt-link>
              <div class="mx-1" v-else-if="title || subtitle">
                <h1 v-if="title">{{title}}</h1>
                <h3 v-if="subtitle">{{subtitle}}</h3>
              </div>
            </v-col>
            <v-col class="d-flex justify-end align-center">
              <v-btn text small class="mx-1" :to="_.get(item,'link',undefined)" dark rounded
                     v-for="(item,j) in menuItems" :key="j">
                <v-icon v-if="item.icon" class="mx-1">{{item.icon}}</v-icon>
                {{item.text || ''}}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <v-main>
        <nuxt/>
      </v-main>
      <v-footer dark color="grey darken-4">
        <v-container>
          <div class="text-center">
            <template v-for="(item,i) in footer.items">
              <span v-if="i>0" class="mx-1" style="padding-bottom: 1px">•</span>
              <v-btn text :to="item.link">
                {{item.title}}
              </v-btn>
            </template>
            <div class="py-1">{{footer.text}}</div>
            <div class="d-flex align-center justify-center py-1">
              <v-img :src="footer.logo" :to="footer.link" height="30px" contain/>
            </div>
          </div>
        </v-container>
      </v-footer>
    </v-card>
  </v-app>
</template>
<script>
  import _ from 'lodash'

  const defaultConfig = {
    title: 'Title Here',
    logo: '/logo-dark.png',
    subtitle: 'Subtitle Here',
    background: '/bg/1.jpg',
    footer: {
      text: 'footer text',
      logo: '/icon.png',
      link: '/',
      items: [
        {title: 'Download', link: '/#', color: 'success'},
        {title: 'Articles', link: '/#', btnText: 'Blog', icon: 'list', color: 'warning'},
        {title: 'Campaign', link: '/#', btnText: 'Join Us', icon: 'bookmark', color: 'error'},
      ]
    },

  };
  export default {
    data() {
      return {
        dark: false
      }
    },
    created() {
      this._ = _;
    },
    computed: {
      menuItems() {
        return _.get(this.vsp, 'reservation.menu', []);
      },
      title() {
        return _.get(this.vsp, 'title', process.env.title || defaultConfig.title);
      },
      subtitle() {
        return _.get(this.vsp, 'subtitle', process.env.subtitle || defaultConfig.subtitle);
      },
      logo() {
        return _.get(this.vsp, 'logo', process.env.logo || defaultConfig.logo);
      },
      background() {
        return _.get(this.vsp, 'background', process.env.background || defaultConfig.background);
      },
      footer() {
        return _.get(this.vsp, 'footer', process.env.card || defaultConfig.footer);
      }
    }
  }
</script>
<style>
  .reserveBg {
    background: #00b09b; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #96c93d, #00b09b); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #96c93d, #00b09b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .reserveBg3 {
    background: #0f0c29; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .reserveBg2 {
    background: #a8ff78; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #78ffd6, #a8ff78); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #78ffd6, #a8ff78); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
