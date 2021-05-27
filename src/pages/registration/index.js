define([], function() {
  return {
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
        if (data.success) {
          this.confirmation_code = data.data.confirmation_code
          return
        }
        if (typeof data.data === 'string') {
          this.message = data.data
        } else {
          this.email_message = data.data.email
          this.password_message = data.data.password
        }
      },
      process_success: function(data) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.data.token
        console.log(data.data.confirmation_code)
        this.$router.push({name:'confirmation'})
      },
      register: function() {
        if (this.loading) {
          return
        }
        var self = this;
        self.clear()
        self.loading = true;
        setTimeout(function() {
          axios.post('http://167.172.150.95:3001/register', {
            email: self.email,
            type: '1',
            password: self.password
          }).then(self.process_success).catch(function(data) {
            console.log(data)
            self.process_response(data.response.data)
          })
        }, 1000)
      }
    }
  }
})
