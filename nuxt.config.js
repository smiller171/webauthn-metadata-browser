const path = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'webauthn-metadata-browser',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Browse FIDO2 authenticator metadata' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: 'en'
    },
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        loader: 'sass-loader',
        test: /\.(scss|sass)$/,
        options: {
          sourceMap: false,
          includePaths: [path.resolve(__dirname,'./node_modules')],
        },
      })
    },
    transpile: [
      'vue-mdc-adapter'
    ]
  },
  plugins: [
    '~/plugins/globalComponents'
  ],
  css: [
    'normalize.css/normalize.css',
    '~/assets/styles/theme.scss'
  ]
}
