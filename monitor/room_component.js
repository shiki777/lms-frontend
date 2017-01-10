Vue.component('room', {
    template : '<tr>\
          <td>{{name}}</td>\
          <td>{{online}}</td>\
          <td>{{tag}}</td>\
          <td>{{playurl}}</td>\
        </tr>',
    props : ['roomid'],
    data : function() {
        return {
            name : '',
            online : '',
            tag : '',
            playurl : ''
        }
    },
    created : function() {
        var self = this;
        var url = 'http://127.0.0.1:5000/api/roominfo';
        Vue.http.jsonp(url,{params : {id : this.roomid}})
            .then(function(data) {
                var data = data.body;
                var info = data.info || {};
                console.log(info)
                self.name = info.name;
                self.online = info.online;
                self.tag = info.tag;
                self.playurl = data.playurl;              
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
        }
    }

})