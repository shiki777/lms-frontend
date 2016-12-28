(function() {

var id = 1;

var vm = new Vue({
    el : '#page',
    data : {
        name : 'AAA',
        order : 2,
        tag : '',
        userNum : 2,
        desc : '',
        thumb : './image.png',
        u3dbg : './image.png',
        dependencyCharge : 1,
        chargeStrategy  : [{
            money : 100,
            duration : 20,
            unit : 'day',
            id : getId()
        },{
            money : 300,
            duration : 3,
            unit : 'mouth',
            id : getId()
        }],
        onlineRatio : 1,
        channelId : 1
    },
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
            console.log(this.formatData())
            // return;
            $('.ui.modal')
            .modal('show');            
            return false;
        },
        formatData : function() {
            var res = {
                name : this.name,
                channelId : this.channelId,
                living: false,
                onlineRatio : this.onlineRatio,
                thumb : this.getThumb(),
                desc : this.desc,
                charge : true,
                dependencyCharge : parseInt(this.dependencyCharge,10) ? true : false,
                order : this.order,
                chargeStrategy : this.getChargeStrategy(),
                u3dbg : this.getU3dBg(),
                userNum : this.userNum,
                tag : this.tag
            };
            return res;
        },
        getChargeStrategy : function() {
            if(parseInt(this.dependencyCharge,10))
            var arr = [];
            this.$refs.charges.map(function(charge) {
                if(charge.del == true) return;
                var money = charge.m;
                var duration = charge.d;
                var unit = charge.u;
                var tmpstr = duration + unit.substr(0,1) + money;
                arr.push(tmpstr);
            })            
            return arr.join('-');
        },
        getThumb : function() {
            return this.$refs.thumbcom.imgurl;
        },
        getU3dBg : function() {
            return this.$refs.u3dcom.imgurl;
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

function getId() {
    return id++;
}

})()