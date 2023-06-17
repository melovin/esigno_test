const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
  //proxy: 'https://userhw.sandbox.esigno.io'
    proxy: {
      "/api": {
          target: 'https://userhw.sandbox.esigno.io',
          pathRewrite: {'^/api': ''},
      },
  }
  }
})