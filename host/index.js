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
        users : data
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
        modifyPwd : function(user) {
            $('.ui.modal.pop').modal('show');
        },
        submitPwd : function() {
            var url = window.hosturl + '/lms/user/modifypwd';
            Vue.http.jsonp(url,{params : {
                username : '277398527@qq.com',
                pw : 111111,
                npw : 222222
            }})
            .then(function(data) {
                $('.ui.modal.suc').modal('show');
            })
            .catch(function() {
                $('.ui.modal.fail').modal('show');
            })
        }
    }
});    
}


})()