define(['jquery', 'lazy'], function(jquery, lazy) {
  return {
    components: {waitMe: lazy.Component('waitMe')},
    created: function() {
      var headers = jquery.ajaxSettings.headers || {}
      if (!headers['Authorization']) {
        return this.$router.push({name:'login'})
      }
      this.load_customer()

    },
    data: function() {
      return {
        loading: true,
        customer: {}
      }
    },
    methods: {
      load_customer: function() {
        var self = this;
        jquery.ajax({
          path: "customer-info",
          contentType: 'application/json',
          success: function(data) {
            self.loading = false
            if (data.success === true) {
              if (self.status === 'pending') {
                self.$router.push({name: 'confirmation'})
              }

              if (!data.data.tutor || !data.data.veterinary) {
                  self.$router.push({name: 'account'})
              }
              self.customer = data.data

            } else {
              self.$router.push({name: 'login'})
            }
          },
          error: function() {
            self.loading = false;
            self.$router.push({name: 'login'})
          }
        })
      }
    }
  }
})
