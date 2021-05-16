define([], function() {
  return {
    created: function() {
      if (!axios.defaults.headers.common['Authorization']) {
        this.$router.push({name:'login'})
      }
    }
  }
})
