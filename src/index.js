// 167.172.150.95
// https://vuejs.org/v2/guide/
// https://router.vuejs.org/guide/#javascript

requirejs([], function() {
  var routes = [
    {
      name: 'login',
      path: '/login',
      component: lazyPage('login')
    },
    {
      name: 'registration',
      path: '/registration',
      component: lazyPage('registration')
    },
    {
      name: 'confirmation',
      path: '/confirmation',
      component: lazyPage('confirmation')
    },      
    {
      name: 'internal',
      path: '/internal',
      component: lazyPage('internal'),
      children: [
        {
          name: 'welcome',
          path: "welcome",
          component: lazyPage('welcome')
        }
      ]
    },
  ]

  var router = new VueRouter({
    mode: 'history',
    routes: routes
  })

  var vue = new Vue({
    el: "#app",
    router: router
  })
})
