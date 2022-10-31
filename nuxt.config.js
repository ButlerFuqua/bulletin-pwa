import * as SITE_INFO from './content/site/info.json'
import * as CONTENT from './content/site/podcast.json'
import * as COLOR from './content/site/color.json'
import * as ARTICLES from './content/site/articles.json'
import * as LANDING from './content/site/landing.json'
import * as IMAGES from './content/site/images.json'

const tailwindCssFilePath = 'assets/css/tailwind.css';

const colorPrimary = COLOR.primary;

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  mode: 'spa',
  generate: {
    fallback: true
  },

  env: {
    siteName: SITE_INFO.sitename,
    siteDescription: SITE_INFO.sitedescription,
    podcastRssFeed: CONTENT.podcastrssfeed,
    colorPrimary,
    colorSecondary: COLOR.secondary,
    colorAction: COLOR.action,
    colorLink: COLOR.link,
    articlesDisplayName: ARTICLES.displayname,
    landingPageContent: LANDING.landingpagecontent,
    landingLogo: IMAGES.landinglogo,
    aboutimage: IMAGES.aboutimage,
    askAQuestionLink: process.env.HEY_BUDDY_ASK_A_QUESTION_LINK
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: SITE_INFO.sitename || '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: SITE_INFO.sitedescription || '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: "https://identity.netlify.com/v1/netlify-identity-widget.js",
      },
      {
        src: "https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main',
    `@/${tailwindCssFilePath}`
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  tailwindcss: {
    cssPath: `~/${tailwindCssFilePath}s`,
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  }

}
