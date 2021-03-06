(function() {

var l = Vue.config.lang;
var id = 1;
var channelid = window.location.search.match(/id=(.*)/) ? window.location.search.match(/id=(.*)/)[1] : 0;
loadRoomInfo(channelid);

function getId() {
    return id++;
}

function loadRoomInfo(id) {
    var url = window.hosturl + '/lms/channel/get';
    Vue.http.jsonp(url,{params : {id : id}})
    .then(function(data) {
        if(data.body.code == 0){
            var vmdata = formatRoomData(data.body.data);
            createVm(vmdata);
        } else {
            alert(window.messages[l].message.channelloadfail);
            console.log(data.body.msg);
        }

    })
}

function formatRoomData(data) {
    var discount = [];
    if(data.chargeStrategy.discount.length >0){
        data.chargeStrategy.discount.map(function(item) {
            discount.push({
                discount : item.discount * 10,
                duration : item.month,
                id : getId()
            })
        })
    } else {
        discount.push({
            discount : 9,
            duration : 3
        });
    }
    return {
        name : data.name,
        order : data.order,
        price : data.chargeStrategy.price,
        desc : data.desc,
        thumb : data.thumb,
        tag : data.tag,
        icon : data.icon,
        dependencyCharge : data.charge ? 1 : 0,
        chargeStrategy  : discount,
        channelid : channelid,
        defaultRoom : data.defaultRoom || 0,
        deleteChannel : 0,
        thumbstr : window.messages[l].message.thumb,
        iconstr : window.messages[l].message.icon
    }
}

function createVm(data) {
var vm = new Vue({
    i18n: i18n,
    el : '#page',
    data : data,
    computed : {
        changeShow : function() {
            return parseInt(this.dependencyCharge,10) ? 'block' : 'none';
        }
    },
    methods : {
        addStrategy : function() {
            this.chargeStrategy.push({
                money : '',
                duration : '',
                unit : '',
                id : getId()
            })
        },
        /*监听收费策略删除，从数据中移除对应数据*/
        onChargeRemove : function(e) {
            this.removeStrategy(e.id);
        },
        submit : function(e) {
            var isDel = parseInt(this.deleteChannel,10);
            if(isDel){
                this.del();
                return;
            }
            var data = this.formatData();
            if(!data.defaultRoom){
                alert(window.messages[l].message.selectroom);
                return;
            }
            var url = window.hosturl + '/lms/channel/update';
            var self = this;
            Vue.http.post(url,data,{params : {id : channelid}})
            .then(function(data) {
                if(data.body.code == 0){
                    $('.ui.modal')
                    .modal('show'); 
                    window.setTimeout(function() {
                         window.location.reload();
                    }, 1500);
                } else {
                    alert(window.messages[l].message.submit + window.messages[l].message.fail + data.body.msg);
                }

            }, function(e) {
                alert(window.messages[l].message.submit + window.messages[l].message.fail);
            })           
            return false;
        },
        del: function() {
            var url = window.hosturl + '/lms/channel/del'
            Vue.http.delete(url, {
                params: {
                    id: channelid
                }
            })
            .then(function(data) {
                if (data.body.code == 0) {
                    $('.ui.modal').modal('show');
                    window.setTimeout(function() {
                        location.href = '/lms/page/channellist';
                    }, 1500);
                } else {
                    if (data.body.code == 1) {
                        alert(window.messages[l].message.deletefail);
                    } else {
                        alert(window.messages[l].message.fail + data.body.msg);
                    }
                }
            }, function(e) {
                alert(window.messages[l].message.submit + window.messages[l].message.fail);
                console.log(e)
            })
        },
        formatData : function() {
            var res = {
                name : this.name,
                thumb : this.getThumb(),
                desc : this.desc,
                charge : parseInt(this.dependencyCharge,10) ? 1 : 0,
                order : this.order,
                icon : this.getIcon(),
                tag : this.tag,
                chargeStrategy : this.getChargeStrategy(),
                defaultRoom : this.getDefaultRoom()
            };
            return res;
        },
        getChargeStrategy : function() {
            if(parseInt(this.dependencyCharge,10) == 0){
                return {
                    price : 0,
                    discount : []
                };
            }
            var res = {
                price : this.price,
            }
            discount = [];
            this.$refs.charges.map(function(charge) {
                if(charge.del == true) return;
                discount.push({
                    month : charge.d,
                    discount : parseFloat(charge.m,10)/10
                });
            })     
            res.discount = discount;       
            return res;
        },
        getThumb : function() {
            return this.$refs.thumbcom.imgurl;
        },
        getIcon : function() {
            return this.$refs.iconcom.imgurl;
        },
        getDefaultRoom : function() {
            return this.$refs.defaultroom.room || null;
        },
        removeStrategy : function(id) {
            /*组件调用destroy后 refs没有同步减少，所以这么做，vue刚使用不熟悉*/
            this.$refs.charges.map(function(charge) {
                if(charge.id == id){
                    charge.del = true;
                }
            })
        }

    }
});   
}


})()