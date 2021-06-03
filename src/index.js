// 167.172.150.95
// https://vuejs.org/v2/guide/
// https://router.vuejs.org/guide/#javascript

requirejs.config({
  baseUrl: '/static/js',
  paths: {
    'jquery': 'jquery/jquery.min',
    'waitme': 'jquery/waitMe.min',
    'foundation': 'jquery/foundation.min',
    'vue': 'vue/vue',
    'vue-router': 'vue/vue-router',
    'text': 'require/text',
    'lazy': 'require/lazy'
  }
})



requirejs(['vue', 'setup'], function(Vue, setup) {
  var vue = new Vue({
    el: "#app",
    router: setup.router
  })
})
