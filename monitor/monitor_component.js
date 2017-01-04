Vue.component('monitor', {
    template : '<table class="ui bottom attached table">\
      <thead>\
        <th width="15%">房间名</th>\
        <th width="10%">在线人数</th>\
        <th width="10%">标签</th>\
        <th width="65%">流地址</th>\
      </thead>\
        <tbody v-for="channel in channels" is="channel" :channelid="channel.id"></tbody>\
    </table>',
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