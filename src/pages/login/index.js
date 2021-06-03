define(['jquery', 'lazy'], function(jquery, lazy) {
  return {
    components: {waitMe: lazy.Component('waitMe')},
    data: function() {
      return {
        loading: false,
        message: null,
        email: null,
        email_message: null,
        password: null,
        password_message: null,
      }
    },
    methods: {
      clear: function() {
        this.message = null
        this.email_message = null
        this.password_message = null
      },
      process_response: function(data) {
        this.loading = false
        if (data.success)
          return
        if (typeof data.data === 'string') {
          this.message = data.data
        } else {
          this.email_message = data.data.email
          this.password_message = data.data.password
        }
      },
      process_success: function(data) {
        jquery.ajaxSetup({
          headers: {'Authorization': "Bearer " + data.data.token}
        })
        this.$router.push({name:'welcome'})
      },
      login: function() {
        if (this.loading) {
          return
        }
        var self = this;
        self.clear()
        this.loading = true
        jquery.ajax({
          path: 'login',
          method: 'post',
          json: {email: self.email, password: self.password},
          contentType: 'application/json',
          success: self.process_success,
          error: function(response) {
            if (response.responseJSON) {
              return self.process_response(response.responseJSON)
            }
          }
        })
      }
    }
  }
})
