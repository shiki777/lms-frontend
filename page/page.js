Vue.component('pagination', {
    template : '<div v-on:click="load">hello,{{url}}</div>',
    props : ['url'],
    methods : {
        load : function() {
            console.log(this.url);
        }
    },
    created : function() {
        console.log(this.$el)
    },
    mounted : function() {
        console.log(this.$el)
    }
});