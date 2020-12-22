module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Vue.js | Authentication'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import \'~@/sass/global\''
      }
    }
  }
}

