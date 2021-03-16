import _ from 'lodash'
import Vue from 'vue'
import moduleOptions from './options'
// import JsonExcel from "vue-json-excel";
import Helper from './assets/helper'
import VspStore from './store/vsp'
import * as components from "./components/component-vsp";
import {ValidationProvider, ValidationObserver, extend, localize} from 'vee-validate/dist/vee-validate.full.esm';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './assets/styles.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// import '@fontawesome/fontawesome-free/css/all.css'
import 'font-awesome/css/font-awesome.min.css';
import 'material-icons/iconfont/material-icons.css';
import wysiwyg from "vue-wysiwyg";
function loadLocale(code) {
  return import(`vee-validate/dist/locale/${code}.json`).then(locale => {
    localize(code, locale);
  });
}
const t = (val) => _.isString(val) ? val.replace(/_/g, ' ') : val

const ComponentLibrary = {
  install(Vue, options = {}) {
    try {
      Vue.use(wysiwyg, {});
      Vue.component('ValidationProvider', ValidationProvider);
      let locale = _.get(moduleOptions, 'locale', 'en-EN').substring(0, 2)
      loadLocale(locale)
      Vue.set(Vue.prototype, 'vsp', {...moduleOptions,Helper,'$Helper':Helper});
      for (const componentName in components.default) {
        let component = components.default[componentName]
        try {
          Vue.component(componentName, component);
        } catch (e) {
          console.error({componentName, e})
        }
      }
    } catch (e) {
      console.error({e})
    }
  }
}


export default async (ctx, inject) => {

  inject('vsd', {...moduleOptions,Helper,'$Helper':Helper})
  ctx.vsd = {...moduleOptions,Helper,'$Helper':Helper}

  try {
    ctx.store.registerModule('vsp', VspStore)
  } catch (e) {
    console.error({e}, 'error on loading store files')
  }
  ComponentLibrary.install(Vue);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary)
}
