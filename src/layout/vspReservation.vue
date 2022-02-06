<template>
  <v-app>
    <template v-if="isMobile">
      <v-app-bar elevation="1" app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer/>
        <span style="max-height: 100%;">
          <nuxt-link
            style="max-height: 100%;text-decoration: none"
            exact-active-class=""
            active-class=""
            :to="_.get(vsp,'reservation.home','/')">
          <v-img contain max-height="50px" :src="logo"/>
        </nuxt-link>
        </span>
      </v-app-bar>
      <v-navigation-drawer
        color="drawer"
        class="drawertext--text"
        v-model="drawer"
        fixed :right="isRTL" :temporary="isMobile" app>
        <template v-for="(menuItem, i) in menuItems">
          <template>
            <v-list-item v-if="!_.has(menuItem,'items[0]') " :to="menuItem.link">
              <v-list-item-icon class="mx-1">
                <v-icon color="primary" size="15">{{ menuItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title color="accent"><b class="font-13">{{ capitalize($t(menuItem.text)) }}</b>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-group v-else>
              <template v-slot:activator>
                <v-list-item-icon class="mx-1">
                  <v-icon color="primary" size="15">{{ menuItem.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title color="accent"><b class="font-13">{{ capitalize($t(menuItem.text)) }}</b>
                </v-list-item-title>
              </template>
              <template v-for="(item, i) in menuItem.items">
                <v-list-item
                  :to="_.get(item,'link','')"
                  router
                  class="mr-1"
                  exact
                >
                  <v-list-item-icon v-show="false">
                    <v-icon class="font-18 mx-0" color="primary">{{ _.get(item, 'icon', '') }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="font-12 mr-5" v-text="capitalize($t(_.get(item,'text','')))"/>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
        </template>
      </v-navigation-drawer>
    </template>
    <v-main>
      <v-card tile class="ma-0 pa-0 grey lighten-4">
        <v-container class="reserveBg" fluid>
          <v-container>
            <v-row>
              <v-col class="d-flex justify-start align-center">
                <nuxt-link style="text-decoration: none" exact-active-class="" active-class=""
                           :to="_.get(vsp,'reservation.home','/')">
                  <v-img v-if="logo && !isMobile" :src="logo" max-width="100px" contain max-height="70px"/>
                  <div class="mx-1 my-2" v-if="title || subtitle">
                    <h1 v-if="title" class="green--text text--darken-4  font-13">{{ title }}</h1>
                    <h3 v-if="subtitle">{{ subtitle }}</h3>
                  </div>
                </nuxt-link>
              </v-col>
              <v-col class="d-flex justify-end align-center" v-if="!isMobile">
                <v-btn text
                       small
                       class="mx-1 mx-sm-0"
                       :to="_.get(item,'link',undefined)"
                       dark
                       rounded
                       v-for="(item,j) in menuItems"
                       :key="j">
                  <v-icon v-if="item.icon" class="mx-1">{{ item.icon }}</v-icon>
                  {{ item.text || '' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-container>

        <nuxt/>

        <v-footer dark color="grey darken-4">
          <v-container>
            <div class="text-center">
              <template v-for="(item,i) in footer.items">
                <span v-if="i>0" class="mx-1" style="padding-bottom: 1px">•</span>
                <v-btn text :to="item.link">
                  {{ item.title }}
                </v-btn>
              </template>
              <div class="py-1">{{ footer.text }}</div>
              <div class="d-flex align-center justify-center py-1">
                <v-img :src="footer.logo" :to="footer.link" height="30px" contain/>
              </div>
            </div>
          </v-container>
        </v-footer>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import _ from 'lodash'

const defaultConfig = {
  title: 'Title Here',
  logo: '/logo-dark.png',
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
      dark: false,
      drawer: false,
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
      return _.get(this.vsp, 'reservation.title', process.env.title || defaultConfig.title);
    },
    subtitle() {
      return _.get(this.vsp, 'reservation.subtitle', process.env.subtitle || defaultConfig.subtitle);
    },
    logo() {
      return _.get(this.vsp, 'reservation.logo', process.env.logo || defaultConfig.logo);
    },
    background() {
      return _.get(this.vsp, 'reservation.background', process.env.background || defaultConfig.background);
    },
    footer() {
      return _.get(this.vsp, 'reservation.footer', process.env.card || defaultConfig.footer);
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown || false;
    },
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    goto(path) {
      return this.$router.push(path)
    },
  }
}
</script>
