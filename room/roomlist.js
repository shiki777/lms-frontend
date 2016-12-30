(function() {

var vm = new Vue({
    el : '#page',
    data : {
        rooms : []
    },
    methods : {
        pageLoaded : function(data) {
            this.rooms = this.formatRooms(data.data);
        },
        formatRooms : function(data) {
            var res = [];
            data.map(function(item) {
                res.push({
                  name : item.name,
                  thumb : item.thumb,
                  living : item.living,
                  user : item.user,
                  id : item.id,
                  link : 'http://www.baidu.com?id=' + item.id
                });
            })
            return res;
        },
        isRoomLivingShow : function(living) {
        }
    }
})

})()