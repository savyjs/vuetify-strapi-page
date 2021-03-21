import webpack from "webpack";
import {sortRoutes} from '@nuxt/utils'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const getFiles = path => {
  const files = []
  for (const file of fs.readdirSync(path)) {
    const fullPath = path + '/' + file
    if (fs.lstatSync(fullPath).isDirectory())
      getFiles(fullPath).forEach(x => files.push(file + '/' + x))
    else files.push(file)
  }
  return files
}

export default async function VuetifyStrapiDashboardModule(moduleOptions) {

  try {
    let listOfFiles = getFiles(path.resolve(__dirname, './components'));

    const options = {
      rtl: false,
      builder: {
        form: '/forms',
        group: '/groups',
        element: '/elements',
        record: '/records',
      },
      ...moduleOptions
    }

    if (_.get(options, 'axios', true)) {
      let axiosOptions = _.get(this, 'nuxt.options.axios', {});
      this.addModule({
        src: "@nuxtjs/axios",
        options: {
          ...axiosOptions
        }
      });
    }

    let baseURL = _.get(this, 'nuxt.options.axios.baseURL', _.get(process, 'env.API_URL', ''));
    options.API_URL = baseURL;

    this.addPlugin({
      fileName: 'options.js',
      src: path.resolve(__dirname, 'options.js'),
      options
    })

    for (const componentName of listOfFiles) {
      let pName = 'components/' + componentName;
      this.addTemplate({
        fileName: pName,
        src: path.resolve(__dirname, pName),
        options
      })
    }

    if (_.get(options, 'sweetalert', true)) {
      this.addModule({
        src: "nuxt-sweetalert2"
      });
    }

    this.nuxt.options.store = true

    // this.nuxt.options.build.plugins = [lodashPlugin];

    if (_.get(options, 'i18n', true)) {
      let i18nOption = _.get(this, 'nuxt.options.i18n', {});
      let i18nOptionLocales = _.get(this, 'nuxt.options.i18n.locales', {});
      this.addModule({
        src: "nuxt-i18n",
        options: {
          vueI18nLoader: true,
          defaultLocale: _.get(moduleOptions, 'lang', 'en'),
          ...i18nOption
        }
      });
    }

    if (_.get(options, 'auth', true)) {
      let authOptions = _.get(this, 'nuxt.options.auth', {});
      this.addModule({
        src: "@nuxtjs/auth",
        options: {
          ...authOptions
        }
      });
    }

    if (_.get(options, 'strapi', true)) {
      let strapiOptions = _.get(this, 'nuxt.options.strapi', {});
      this.addModule({
        src: "@nuxtjs/strapi",
        options: {
          ...strapiOptions
        }
      });
    }

    // This will be called before Nuxt generates your pages
    let contentOptions = _.get(this, 'nuxt.options.content', {});
    // this.addModule({
    //   src: "@nuxt/content"
    // });

    // this.nuxt.hook('generate:cache:ignore', ignore => ignore.push('content'))

    this.addTemplate({
      fileName: 'assets/vsp.png',
      src: path.resolve(__dirname, 'assets/vsp.png')
    })

    this.addTemplate({
      fileName: 'assets/avatar.png',
      src: path.resolve(__dirname, 'assets/avatar.png')
    })

    this.addTemplate({
      fileName: 'assets/styles.css',
      src: path.resolve(__dirname, 'assets/styles.css')
    })

    this.addTemplate({
      fileName: 'components/component-vsp.js',
      src: path.resolve(__dirname, 'components/component-vsp.js'),
      options
    })

    this.addTemplate({
      fileName: 'assets/helper.js',
      src: path.resolve(__dirname, 'assets/helper.js'),
      options
    })


    this.addTemplate({
      fileName: 'store/Vsp.js',
      src: path.resolve(__dirname, 'store/Vsp.js'),
      options
    })

    this.addTemplate({
      fileName: 'store/VspCart.js',
      src: path.resolve(__dirname, 'store/VspCart.js'),
      options
    })

    this.addTemplate({
      fileName: 'store/VspShopping.js',
      src: path.resolve(__dirname, 'store/VspShopping.js'),
      options
    })

    this.addPlugin({
      fileName: 'plugin.js',
      src: path.resolve(__dirname, 'plugin.js'),
      options
    })

    let blogRoutes = {
      home: "/blog",
      contents: "/blog",
      tags: "/blog/tags",
      logo: "/blog/logo.png",
      title: "Blog",
      menu: [{
        text: 'Home',
        link: '/blog'
      }],
      ...moduleOptions.blog
    };

    this.extendRoutes.extendRoutes(
      (routes, resolve) => {
        const blogRoute = {};
        blogRoutes.Home = {
          name: 'blogHome',
          chunkName: 'blogHome',
          path: blogRoutes.home,
          component: resolve(__dirname, './src/components/blog/VspBlogShowList.vue'),
        }
        blogRoutes.Posts = {
          name: 'blogPosts',
          chunkName: 'blogPosts',
          path: blogRoutes.contents,
          component: resolve(__dirname, './src/components/blog/VspBlogShowList.vue'),
        }
        blogRoutes.Post = {
          name: 'blogPost',
          chunkName: 'blogPost',
          path: blogRoutes.contents + '/:slug',
          component: resolve(__dirname, './src/components/blog/VspBlogShowContent.vue'),
        }
        blogRoutes.Tags = {
          name: 'blogTags',
          chunkName: 'blogTags',
          path: blogRoutes.tags + '/:slug',
          component: resolve(__dirname, './src/components/blog/VspBlogShowTagPage.vue'),
        }

        for (const item in blogRoute) {
          console.log({item})
          routes.unshift(item)
        }
      }
    );

    this.addPlugin({
      fileName: 'clientPlugin.js',
      mode: 'client',
      src: path.resolve(__dirname, 'clientPlugin.js'),
      options
    })

    this.addLayout({
      name: "vsp",
      src: path.resolve(__dirname, 'layout/vsp.vue'),
    })

    this.addLayout({
      name: "vspSimple",
      src: path.resolve(__dirname, 'layout/vspSimple.vue'),
    })

    this.addLayout({
      name: "vspShop",
      src: path.resolve(__dirname, 'layout/vspShop.vue'),
    })

    this.addLayout({
      name: "vspBlog",
      src: path.resolve(__dirname, 'layout/vspBlog.vue'),
    })

    this.addLayout({
      name: "vspAuth",
      src: path.resolve(__dirname, 'layout/vspAuth.vue'),
    })

  } catch (e) {
    console.error({e})
  }
}

module.exports.meta = require('../package.json')
