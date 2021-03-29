<template>
  <v-app>
    <header>
      <v-container>
        <v-row justify="center">
          <v-col cols="5" md="3" lg="1">
            <v-avatar color="orange darken-2" size="100">
              <vsp-lottie v-if="config.lottiePath" :path="config.lottiePath" count="2" width="100%"/>
              <v-img v-else-if="config.logo" contain width="200px" :src="config.logo" />
            </v-avatar>
          </v-col>
          <v-col md="5" lg="6" cols="7">
            <h1 class="px-5">
              {{config.title}}
            </h1>
            <h3 class="px-5 py-2">
              {{config.subtitle}}
            </h3>
            <v-row class="mb-1">
              <v-col>
                <v-btn
                  v-for="item in config.menu"
                  :color="item.color"
                  small
                  text
                  :target="_.startsWith(item.link,'http') ? '_blank' : undefined"
                  :to="_.startsWith(item.link,'http') ? undefined : item.link"
                  :href="!_.startsWith(item.link,'http') ? undefined : item.link"
                  :key="item.title">
                  <v-icon x-small class="mx-1">{{item.icon}}</v-icon>
                  {{item.title}}
                </v-btn>
              </v-col>
            </v-row>
            <v-divider/>
          </v-col>
        </v-row>
      </v-container>
    </header>
    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from "vue";

  export default {
    head() {
      return {
        title: this.config.title || 'no title',
      }
    },
    computed: {
      config() {
        return _.get(this.$vsp, 'podcast', {});
      }
    },
    methods: {},
    created() {
      const goTo = (path) => {
        return this.$router.push(path)
      }
      Vue.set(Vue.prototype, 'goTo', goTo);
      Vue.set(Vue.prototype, '$goTo', goTo);
    }
  }
</script>
