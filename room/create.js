(function() {

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
            unit : 'day'
        },{
            money : 300,
            duration : 3,
            unit : 'year'
        }],
        onlineRatio : 1,
        channelId : 1
    },
    methods : {
        submit : function(e) {
            $('.ui.modal')
            .modal('show');            
            return false;
        }
    }
});

})()