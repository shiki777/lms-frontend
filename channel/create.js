(function() {

var id = 1;

var vm = new Vue({
    el : '#page',
    data : {
        name : '',
        order : 1,
        tag : '',
        price : 100,
        desc : '',
        thumb : '',
        dependencyCharge : 1,
        chargeStrategy  : [{
            discount : 0.9,
            duration : 3,
            id : getId()
        }],
        onlineRatio : 1
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
            return;
            $('.ui.modal')
            .modal('show');            
            return false;
        },
        formatData : function() {
            var res = {
                name : this.name,
                thumb : this.getThumb(),
                desc : this.desc,
                charge : parseInt(this.dependencyCharge,10) ? true : false,
                order : this.order,
                chargeStrategy : this.getChargeStrategy()
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
                    mouth : charge.d,
                    discount : parseFloat(charge.m,10)
                });
            })     
            res.discount = discount;       
            return res;
        },
        getThumb : function() {
            return this.$refs.thumbcom.imgurl;
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