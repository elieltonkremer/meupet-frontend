define(['jquery'], function(jquery) {
    return {
      data: function() {
        let url_search = new URLSearchParams(window.location.search)
        return {
          loading: false,
          code: url_search.get('code') || null,
          code_message: null,
        }
      },
      methods: {
        clear: function() {
          this.message = null
          this.code_message = null
        },
        process_response: function(data) {
          this.loading = false
          if (data.success)
            return
          this.code_message = data.message
        },
        process_success: function(data) {
          var headers = jquery.ajaxSettings.headers || {}
          if (!headers['Authorization']) {
            this.$router.push({name:'login'})
          } else {
            this.$router.push({name:'welcome'})
          }
        },
        confirm: function() {
          if (this.loading) {
            return
          }
          var self = this;
          self.clear()
          self.loading = true;
          jquery.ajax({
            path: 'confirmation?code=' + self.code,
            method: 'get',
            success: function (data) {
              self.loading = false
              if (data.success === true) {
                self.process_success(data.data)
              } else {
                self.process_response(data.data)
              }
            }
          })
        }
      }
    }
  })
  