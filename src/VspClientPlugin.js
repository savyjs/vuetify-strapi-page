import _ from 'lodash'
import Vue from 'vue'
import moduleOptions from './options'
// import '@fontawesome/fontawesome-free/css/all.css'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import LottiePlayer from 'lottie-player-vue';

const ComponentLibrary = {
  install(Vue, options = {}) {
    try {
      Vue.use(VuePlyr, {
        plyr: {}
      });
      Vue.use(LottiePlayer)
    } catch (e) {
      console.error({e})
    }
  }
}


export default async (ctx, inject) => {
  ComponentLibrary.install(Vue);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary)
}
