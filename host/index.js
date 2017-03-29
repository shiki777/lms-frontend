(function() {

var id = 9999;
load();

function getId() {
    return id++;
}

function load(id) {
    var url = window.hosturl + '/lms/host/list';
    Vue.http.jsonp(url)
    .then(function(data) {
        if(data.body.code == 0){
            var vmdata = formatRoomData(data.body.list);
            createVm(vmdata);
        } else {
            alert('主播列表加载失败，请重试!');
            console.log(data.body.msg);
        }

    })
}

function formatRoomData(data) {
    data.sort(function(a,b) {
        return b.roomid - a.roomid;
    });
    data.sort();
    return {
        users : data,
        currentUser : '',
        icode : '',
        newpw : ''
    };
}

function createVm(data) {
var vm = new Vue({
    el : '#page',
    data : data,
    computed : {
    },
    methods : {
        getLink : function(id) {
            return window.hosturl + '/lms/page/roomupdate?id=' + id;
        },
        sendEmail : function() {
            var url = window.hosturl + '/lms/user/email';
            Vue.http.post(url, {email : this.currentUser.username,name : this.currentUser.username})
            .then(function(body) {
                if(body.data.code == 0){
                     alert('验证码获取成功，请去邮箱查收!');
                } else {
                    alert('验证码获取失败' + body.data.msg);
                }
               
            })
            .catch(function(e) {
                alert('验证码获取失败！')
            })
        },
        modifyPwd : function(user) {
            this.currentUser = user;
            $('.ui.modal.pop').modal('show');
        },
        submitPwd : function() {
            var url = window.hosturl + '/lms/user/modifypwd';
            Vue.http.jsonp(url,{params : {
                username : this.currentUser.username,
                pw : this.newpw,
                code : this.icode
            }})
            .then(function(data) {
                if(data.body.code == 0){
                    $('.ui.modal.suc').modal('show');
                } else {
                    $('.ui.modal.fail').modal('show');
                }
            })
            .catch(function() {
                $('.ui.modal.fail').modal('show');
            })
        }
    }
});    
}


})()