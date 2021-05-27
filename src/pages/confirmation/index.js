define([], function() {
    return {
      data: function() {
        return {
          loading: false,
          message: null,
          code: null,
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
          if (typeof data.data === 'string') {
            this.message = data.data
          } else {
            // this.email_message = data.data.email
          }
        },
        process_success: function(data) {
        //   axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.data.token
          console.log(data)
          this.$router.push({name:'welcome'})
        },
        cofirmation: function() {
          if (this.loading) {
            return
          }
          var self = this;
          self.clear()
          self.loading = true;
          setTimeout(function() {
            axios.get('http://167.172.150.95:3001/confirmation?code=' + self.code).then(self.process_success).catch(function(data) {
              console.log(data)
              self.process_response(data.response.data)
            })
          }, 1000)
        }
      }
    }
  })
  