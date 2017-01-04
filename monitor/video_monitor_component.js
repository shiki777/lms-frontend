Vue.component('monitor', {
    template : '<div class="wrap"><div v-for="channel in channels" is="channel" :channelid="channel.id"></div></div>',
    data : function() {
        return {
            channels : []
        }
    },
    created: function() {
        var self = this;
        var url = 'http://127.0.0.1:5000/api/info';
        Vue.http.get(url)
            .then(function(data) {
                var body = JSON.parse(data.body);
                self.channels = body.data.list;
            }, function(e) {
                console.log(e)
            })
    }
})