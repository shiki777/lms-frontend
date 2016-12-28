Vue.component('charge',{
    template : '<div class="inline">\
                    <input type="number" class="charge-input-money" v-model="m"/>\
                        <span class="charge-span">元</span>\
                        <input type="number" class="charge-input-duration" v-model="d"/>\
                        <select class="charge-input" v-model="u">\
                            <option value="day">天</option>\
                            <option value="mouth">月</option>\
                            <option value="year">年</option>\
                        </select>\
                        <div class="negative ui button delete-btn" v-on:click="remove"> <i class="minus icon delete-icon"></i>删除</div>\
                </div>',
    props : ['money','duration','unit', 'id'],
    data : function() {
        return {
            m : this.money || 30,
            d : this.duration || 20,
            u : this.unit || 'day'
        }
    },
    methods : {
        remove : function() {
            this.$el.remove();
            this.$destroy();
        }
    }
});
