define([], function() {
  return {
    Page: function(name) {
      return function(resolve) {
        requirejs([
          '/static/pages/' + name + '/index.js',
          'text!/static/pages/' + name + '/index.html'
        ], function(component, template) {
          resolve({
            template: template,
            mixins: [component]
          })
        })
      }
    },
    Component: function(name) {
      return function(resolve) {
        requirejs([
          '/static/components/' + name + '/index.js',
          'text!/static/components/' + name + '/index.html'
        ], function(component, template) {
          resolve({
            template: template,
            mixins: [component]
          })
        })
      }
    }
  }
})





