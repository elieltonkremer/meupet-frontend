define(['vue', 'vue-router', 'jquery', 'lazy'], function (Vue, VueRouter, jquery, lazy) {

    jquery.ajaxSetup({
        beforeSend: function(xhr, options) {
            if (options.path) {
                options.url = 'http://localhost:3001/' + options.path
                options.contentType = 'application/json'
                options.dataType = 'json'
            }
            if (options.json)
                options.data = JSON.stringify(options.json)
        }
    })

    Vue.use(VueRouter)

    return {
        router: new VueRouter({
            mode: 'history',
            routes: [
                {
                    name: 'login',
                    path: '/login',
                    component: lazy.Page('login')
                },
                {
                    name: 'registration',
                    path: '/registration',
                    component: lazy.Page('registration')
                },
                {
                    name: 'confirmation',
                    path: '/confirmation',
                    component: lazy.Page('confirmation')
                },
                {
                    name: 'internal',
                    path: '/internal',
                    component: lazy.Page('internal'),
                    children: [
                        {
                            name: 'welcome',
                            path: "welcome",
                            component: lazy.Page('internal/welcome')
                        },
                        {
                            name: 'account',
                            path: "account",
                            component: lazy.Page('internal/account')
                        }
                    ]
                },
            ]
        })

    }
})