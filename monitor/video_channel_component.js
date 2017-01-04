Vue.component('channel', {
    template : '<div class="channel"><room v-for="room in rooms" :roomid="room.id"></room><div>',
    props : ['channelid'],
    data : function() {
        return {
            rooms : []
        }
    },
    created : function() {
        var self = this;
        var url = 'http://127.0.0.1:5000/api/channelroomlist';
        Vue.http.jsonp(url,{params : {id : this.channelid}})
            .then(function(data) {
                var channels = JSON.parse(data.body).data.list;
                self.rooms = self.formatChannels(channels); 
            }, function(e) {
                console.log(e)
            })
    },
    methods : {
        formatChannels : function(arr) {
            var res = [];
            arr.map(function(item) {
                res.push({
                    id : item.id,
                    name : item.name
                });
            })
            return res;
        }
    }

})