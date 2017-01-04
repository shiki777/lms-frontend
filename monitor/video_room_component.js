Vue.component('room', {
    template : '<div class="play-item"><div :id="domid" class="player"></div><div class="play-name">{{name}}</div></div>',
    props : ['roomid'],
    data : function() {
        return {
            name : '',
            online : '',
            tag : '',
            playurl : ''
        }
    },
    computed : {
        domid : function() {
            return 'pid' + this.roomid;
        }
    },
    created : function() {
        var self = this;
        var url = 'http://127.0.0.1:5000/api/roominfo';
        Vue.http.jsonp(url,{params : {id : this.roomid}})
            .then(function(data) {
                if(window.num >21){
                    self.$el.remove();
                    self.$destroy();
                    return;
                }
                var data = data.body; 
                var info = data.info;
                self.name = info.name;
                window.num++;
                self.play(data.playurl);     
            }, function() {
                console.log('room info faild by id : ' + self.id);
            })
    },
    methods : {
        formatChannels : function(arr) {
            var res = [];
            arr.map(function(item) {
                res.push({
                    value : item.id,
                    name : item.name
                });
            })
            return res;
        },
        play : function(url) {
            var player = jwplayer(this.domid).setup({
                file: url,
                width: 277,
                height: 155
            });
            setTimeout(function() {
                console.log(1)
                player.play(true);
            }, 1000);
        }
    }

})