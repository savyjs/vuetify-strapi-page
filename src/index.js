import {
    defineNuxtModule,
    installModule,
    addTemplate,
    addPlugin,
    useModuleContainer,
    addComponentsDir,
    addPluginTemplate,
    isNuxt2,
    isNuxt3,
    resolvePath
} from '@nuxt/kit'

export default defineNuxtModule({
    async setup(moduleOptions, nuxt = {}) {
        const moduleContainer = useModuleContainer(nuxt);
        if (isNuxt2()) {
            const fs = await import('fs')
            const _ = await import('lodash')

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

            const componentsList = await resolvePath(__dirname + '/nuxt2/' + 'components');
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
                let axiosOptions = _.get(nuxt, 'options.axios', {});
                installModule("@nuxtjs/axios", {...axiosOptions});
            }

            let baseURL = _.get(nuxt, 'options.axios.baseURL', _.get(process, 'env.API_URL', ''));
            options.API_URL = baseURL;

            moduleContainer.addPlugin({
                fileName: 'VspOptions.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'VspOptions.js'),
                options
            })


            // return console.log({listOfFiles})
            for (const componentName of listOfFiles) {
                let pName = 'components/' + componentName;
                moduleContainer.addTemplate({
                    fileName: pName,
                    src: await resolvePath(__dirname + '/nuxt2/' + pName),
                    options
                })
            }

            if (_.get(options, 'sweetalert', true)) {
                installModule("nuxt-sweetalert2");
            }

            moduleContainer.nuxt.options.store = true;
            if (_.get(options, 'i18n', true)) {
                let i18nOption = _.get(nuxt, 'options.i18n', {});
                let i18nOptionLocales = _.get(nuxt, 'options.i18n.locales', {});
            }

            if (_.get(options, 'auth', true)) {
                let authOptions = _.get(nuxt, 'options.auth', {});
                installModule("@nuxtjs/auth", {
                    ...authOptions
                });
            }

            if (_.get(options, 'recaptcha', true)) {
                let recaptchaOptions = _.get(nuxt, 'options.recaptcha', {});
                installModule("@nuxtjs/recaptcha");
            }

            if (_.get(options, 'strapi', true)) {
                let strapiOptions = _.get(nuxt, 'options.strapi', {});
                installModule("@nuxtjs/strapi", {
                    ...strapiOptions
                });
            }

            moduleContainer.addTemplate({
                fileName: 'assets/vsp.png',
                src: await resolvePath(__dirname + '/nuxt2/' + 'assets/vsp.png')
            })

            moduleContainer.addTemplate({
                fileName: 'assets/avatar.png',
                src: await resolvePath(__dirname + '/nuxt2/' + 'assets/avatar.png')
            })

            moduleContainer.addTemplate({
                fileName: 'assets/VspStyles.css',
                src: await resolvePath(__dirname + '/nuxt2/' + 'assets/VspStyles.css')
            })
            moduleContainer.addTemplate({
                fileName: 'assets/VspVariables.sass',
                src: await resolvePath(__dirname + '/nuxt2/' + 'assets/VspVariables.sass')
            })

            moduleContainer.addTemplate({
                fileName: 'components/component-vsp.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'components/component-vsp.js'),
                options
            })

            moduleContainer.addTemplate({
                fileName: 'assets/VspHelper.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'assets/VspHelper.js'),
                options
            })


            moduleContainer.addTemplate({
                fileName: 'store/Vsp.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'store/Vsp.js'),
                options
            })

            moduleContainer.addTemplate({
                fileName: 'store/VspCart.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'store/VspCart.js'),
                options
            })

            moduleContainer.addTemplate({
                fileName: 'store/VspShopping.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'store/VspShopping.js'),
                options
            })

            moduleContainer.addPlugin({
                fileName: 'VspPlugin.js',
                src: await resolvePath(__dirname + '/nuxt2/' + 'VspPlugin.js'),
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
                ...options.blog
            };

            moduleContainer.addPlugin({
                fileName: 'VspClientPlugin.js',
                mode: 'client',
                src: await resolvePath(__dirname + '/nuxt2/' + 'VspClientPlugin.js'),
                options
            })

            moduleContainer.addLayout({
                name: "vsp",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vsp.vue'),
            })

            moduleContainer.addLayout({
                name: "vspSpring",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspSpring.vue'),
            })

            moduleContainer.addLayout({
                name: "vspReservation",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspReservation.vue'),
            })

            moduleContainer.addLayout({
                name: "vspReservationItem",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspReservationItem.vue'),
            })

            moduleContainer.addLayout({
                name: "vspPodcastBlog",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspPodcastBlog.vue'),
            })

            moduleContainer.addLayout({
                name: "vspSimple",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspSimple.vue'),
            })

            moduleContainer.addLayout({
                name: "vspShop",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspShop.vue'),
            })

            moduleContainer.addLayout({
                name: "vspBlog",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspBlog.vue'),
            })

            moduleContainer.addLayout({
                name: "vspAuth",
                src: await resolvePath(__dirname + '/nuxt2/' + 'layout/vspAuth.vue'),
            })

        } else if (isNuxt3()) {
            await installModule('@nuxtjs/tailwindcss')

            await addTemplate({
                fileName: "component/VspHeader.vue",
                src: await resolvePath(__dirname + '/nuxt3/component/VspHeader.vue'),
            })

            await addComponentsDir(await resolvePath(__dirname + '/nuxt3/component'));

            await addTemplate({
                fileName: "VspPlugin",
                src: await resolvePath(__dirname + '/nuxt3/plugin/VspPlugin.ts'),
            })

            await addTemplate({
                fileName: "VspPanel.vue",
                src: await resolvePath(__dirname + '/nuxt3/layout/VspPanel.vue'),
            })

            await moduleContainer.addLayout({
                name: "VspPanel",
                src: await resolvePath(__dirname + '/nuxt3/layout/VspPanel.vue'),
            })
        }
    }
});
