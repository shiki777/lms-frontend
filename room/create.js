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
        dependencyCharge : 0,
        chargeStrategy  : [{
            money : 100,
            duration : 20,
            unit : 'day',
            id : 1
        },{
            money : 300,
            duration : 3,
            unit : 'mouth',
            id : 2
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
        submit : function(e) {
            console.log(this.formatCharge());
            return;
            $('.ui.modal')
            .modal('show');            
            return false;
        },
        formatData : function() {
            var res = {};
        },
        formatCharge : function() {
            var arr = [];
            this.$refs.charges.map(function(charge) {
                var money = charge.m;
                var duration = charge.d;
                var unit = charge.u;
                var tmpstr = duration + unit.substr(0,1) + money;
                arr.push(tmpstr);
            })            
            return arr.join('-');
        }
    }
});

function getId() {
    return id++;
}

})()