define(['lazy'], function(lazy) {
    return {
        components: {waitMe: lazy.Component('waitMe')},
        props: {customer: {type: Object}},
        data: function () {
            return {
                loading: false
            }
        },
        computed: {
            is_valid: function () {
                return true;
            }
        },
        methods: {
            save: function () {
                this.loading = true;
            }
        }
    }
})