Vue.component('userselect', {
    template : '<select multiple="multiple" v-model="userids"><option v-for="user in users" :value="user.id">{{user.name}}</option></select>',
    data : function() {
        return {
            userids : [],
            users : []
        }
    },
    beforeCreate : function() {
        var self = this;
        var url = 'http://127.0.0.1:5000/user';
        Vue.http.jsonp(url,{params : {}})
            .then(function(data) {
                if(data.body.code == 0){
                    self.users = self.formatUsers(data.body.data);
                } else {
                    alert('用户列表读取失败！');
                    console.log(data.body.msg);
                }
                
            })
    },
    methods : {
        formatUsers : function(arr) {
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