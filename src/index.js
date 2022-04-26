import {
  defineNuxtModule,
  installModule,
  addTemplate,
  addPlugin,
  useModuleContainer,
  addComponent,
  addServerMiddleware,
  resolveAlias,
  requireModule,
  addPluginTemplate,
  AddPluginOptions,
  isNuxt2,
  createResolver,
  resolvePath
} from '@nuxt/kit'

export default defineNuxtModule({
  async setup(moduleOptions, nuxt = {}) {

    if (isNuxt2()) {
      const fs = await import('fs')
      const _ = await import('lodash')
      const moduleContainer = useModuleContainer(nuxt);

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

      try {
        const componentsList = await resolvePath(__dirname + '/' + 'components');
        let listOfFiles = await getFiles(componentsList);
        // return console.log({componentsList, listOfFiles})
        let options = {
          baseUrl: '',
          rtl: false,
          builder: {
            form: '/forms',
            group: '/groups',
            element: '/elements',
            record: '/records',
          },
          podcast: {
            title: 'Podcast Blog',
            subtitle: 'Our podcast blog',
            home: '/',
            logo: undefined,
            lottiePath: undefined,
            podcastsUrl: '/podcasts', // API
            podcasts: '/podcasts', // Frontend
            menu: [
              {title: 'home', icon: 'fa-home', color: "success darken-2", link: '/'},
            ],
          },
          ...moduleOptions
        }

        if (_.get(options, 'axios', true)) {
          let axiosOptions = _.get(this, 'nuxt.options.axios', {});
          installModule("@nuxtjs/axios", {...axiosOptions});
        }

        let baseURL = _.get(this, 'nuxt.options.axios.baseURL', _.get(process, 'env.API_URL', ''));
        options.API_URL = baseURL;


        try {
          addPlugin({
            fileName: 'VspOptions.js',
            src: await resolvePath(__dirname + '/' + 'VspOptions.js'),
            options
          })
        } catch (e) {
          console.warn({e})
        }

        // return console.log({listOfFiles})
        for (const componentName of listOfFiles) {
          let pName = 'components/' + componentName;
          addTemplate({
            fileName: pName,
            src: await resolvePath(__dirname + '/' + pName),
            options
          })
        }

        if (_.get(options, 'sweetalert', true)) {
          installModule("nuxt-sweetalert2");
        }

        nuxt.options.store = true;
        if (_.get(options, 'i18n', false)) {
          let i18nOption = _.get(this, 'nuxt.options.i18n', {});
          let i18nOptionLocales = _.get(this, 'nuxt.options.i18n.locales', {});
          installModule("nuxt-i18n", {
            vueI18nLoader: true,
            defaultLocale: _.get(moduleOptions, 'lang', 'en'),
            ...i18nOption
          });
        }

        if (_.get(options, 'auth', true)) {
          let authOptions = _.get(this, 'nuxt.options.auth', {});
          installModule("@nuxtjs/auth", {
            ...authOptions
          });
        }

        if (_.get(options, 'recaptcha', true)) {
          let recaptchaOptions = _.get(this, 'nuxt.options.recaptcha', {});
          installModule("@nuxtjs/recaptcha");
        }

        if (_.get(options, 'strapi', true)) {
          let strapiOptions = _.get(this, 'nuxt.options.strapi', {});
          installModule("@nuxtjs/strapi", {
            ...strapiOptions
          });
        }

        addTemplate({
          fileName: 'assets/vsp.png',
          src: await resolvePath(__dirname + '/' + 'assets/vsp.png')
        })

        addTemplate({
          fileName: 'assets/avatar.png',
          src: await resolvePath(__dirname + '/' + 'assets/avatar.png')
        })

        addTemplate({
          fileName: 'assets/VspStyles.css',
          src: await resolvePath(__dirname + '/' + 'assets/VspStyles.css')
        })
        addTemplate({
          fileName: 'assets/VspVariables.sass',
          src: await resolvePath(__dirname + '/' + 'assets/VspVariables.sass')
        })

        addTemplate({
          fileName: 'components/component-vsp.js',
          src: await resolvePath(__dirname + '/' + 'components/component-vsp.js'),
          options
        })

        addTemplate({
          fileName: 'assets/VspHelper.js',
          src: await resolvePath(__dirname + '/' + 'assets/VspHelper.js'),
          options
        })


        addTemplate({
          fileName: 'store/Vsp.js',
          src: await resolvePath(__dirname + '/' + 'store/Vsp.js'),
          options
        })

        addTemplate({
          fileName: 'store/VspCart.js',
          src: await resolvePath(__dirname + '/' + 'store/VspCart.js'),
          options
        })

        addTemplate({
          fileName: 'store/VspShopping.js',
          src: await resolvePath(__dirname + '/' + 'store/VspShopping.js'),
          options
        })

        addPlugin({
          fileName: 'VspPlugin.js',
          src: await resolvePath(__dirname + '/' + 'VspPlugin.js'),
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

        addPlugin({
          fileName: 'VspClientPlugin.js',
          mode: 'client',
          src: await resolvePath(__dirname + '/' + 'VspClientPlugin.js'),
          options
        })

        moduleContainer.addLayout({
          name: "vsp",
          src: await resolvePath(__dirname + '/' + 'layout/vsp.vue'),
        })

        moduleContainer.addLayout({
          name: "vspSpring",
          src: await resolvePath(__dirname + '/' + 'layout/vspSpring.vue'),
        })

        moduleContainer.addLayout({
          name: "vspReservation",
          src: await resolvePath(__dirname + '/' + 'layout/vspReservation.vue'),
        })

        moduleContainer.addLayout({
          name: "vspReservationItem",
          src: await resolvePath(__dirname + '/' + 'layout/vspReservationItem.vue'),
        })

        moduleContainer.addLayout({
          name: "vspPodcastBlog",
          src: await resolvePath(__dirname + '/' + 'layout/vspPodcastBlog.vue'),
        })

        moduleContainer.addLayout({
          name: "vspSimple",
          src: await resolvePath(__dirname + '/' + 'layout/vspSimple.vue'),
        })

        moduleContainer.addLayout({
          name: "vspShop",
          src: await resolvePath(__dirname + '/' + 'layout/vspShop.vue'),
        })

        moduleContainer.addLayout({
          name: "vspBlog",
          src: await resolvePath(__dirname + '/' + 'layout/vspBlog.vue'),
        })

        moduleContainer.addLayout({
          name: "vspAuth",
          src: await resolvePath(__dirname + '/' + 'layout/vspAuth.vue'),
        })

      } catch (e) {
        console.error({e})
      }
    } else {
      await installModule('@nuxtjs/tailwindcss')
    }
  }
});

module.exports.meta = require('../package.json')
