define(['lazy', 'jquery'], function(lazy, jquery) {
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
        password_confirmation: null,
        password_confirmation_message: null,
        type: null,
        type_message: null
      }
    },
    computed: {
      is_valid: function() {
        return this.email && (!this.email_message) && this.password && (!this.password_message) &&
            this.password_confirmation && (!this.password_confirmation_message) && this.type && (!this.type_message)
      }
    },
    watch: {
      email: function() {
        this.email_message = null;
      },
      password: function() {
        this.password_message = null;
      },
      type: function() {
        this.type_message = null;
      },
      password_confirmation: function() {
        if (this.password_confirmation !== this.password) {
          this.password_confirmation_message = 'passwords do not match'
        } else {
          this.password_confirmation_message = null
        }
      }
    },
    methods: {
      clear: function() {
        this.message = null
        this.email_message = null
        this.password_message = null
        this.password_confirmation_message = null
      },
      process_response: function(data) {
        if (data.success) {
          this.confirmation_code = data.data.confirmation_code
          return
        }
        if (typeof data.data === 'string') {
          this.message = data.data
        } else {
          this.email_message = data.data.email
          this.password_message = data.data.password
          this.type_message = data.data.type
        }
      },
      process_success: function(data) {
        jquery.ajaxSetup({
          headers: {'Authorization': "Bearer " + data.data.token}
        })
        this.$router.push({name:'confirmation'})
      },
      register: function() {
        if (this.loading || !this.is_valid) {
          return
        }
        var self = this;
        self.clear()
        self.loading = true;

        jquery.ajax({
          path: 'register',
          method: 'post',
          json: {email: this.email, password: this.password, type: [this.type]},
          contentType: 'application/json',
          success: self.process_success,
          error: function(response) {
            if (response.responseJSON) {
              self.process_response(response.responseJSON);
            }
            self.loading = false
          }
        })
      }
    }
  }
})
