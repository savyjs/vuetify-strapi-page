import _ from 'lodash'
import Vue from 'vue'
import moduleOptions from './VspOptions'
// import JsonExcel from "vue-json-excel";
import Helper from './assets/VspHelper'
import VspStore from './store/Vsp'
import VspCartStore from './store/VspCart'
import * as components from "./components/component-vsp";
import {ValidationProvider, ValidationObserver, extend, localize} from 'vee-validate/dist/vee-validate.full.esm';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import './assets/styles.css' // Ensure you are using css-loader
import './assets/VspVariables.sass' // Ensure you are using sass-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// import '@fontawesome/fontawesome-free/css/all.css'
import VueStripeMenu from 'vue-stripe-menu'
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
      Vue.use(VueStripeMenu, {});
      Vue.component('ValidationProvider', ValidationProvider);
      let locale = _.get(moduleOptions, 'locale', 'en-EN').substring(0, 2)
      loadLocale(locale)
      Vue.set(Vue.prototype, 'vsp', {...moduleOptions, Helper, '$Helper': Helper});
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

  inject('vsp', {...moduleOptions, Helper, '$Helper': Helper})
  ctx.vsp = {...moduleOptions, Helper, '$Helper': Helper}


  try {
    ctx.store.registerModule('vsp', VspStore)
    ctx.store.registerModule('vspCart', VspCartStore)
  } catch (e) {
    console.error({e}, 'error on loading store files')
  }
  ComponentLibrary.install(Vue);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentLibrary)
}
