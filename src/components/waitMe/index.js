define(['jquery', 'waitme'], function(jquery) {
    return {
        mounted: function() {
            this.load(this.loading)
        },
        props: {
            loading: {type: Boolean}
        },
        watch: {
            loading: function() {
                this.load(this.loading)
            }
        },
        methods: {
            load: function(data) {
                jquery(this.$el).waitMe(data === true ? {effect: 'win8_linear'} : 'hide')
            }
        }
    }
})