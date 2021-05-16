function lazyPage(name) {
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
}

function lazyComponent(name) {
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
