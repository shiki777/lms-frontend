(function() {

var id = 1;

var vm = new Vue({
    el : '#page',
    data : {
        name : '',
        url : '',
        thumb : ''
    },
    computed : {
        changeShow : function() {
            return parseInt(this.dependencyCharge,10) ? 'block' : 'none';
        }
    },
    methods : {
        submit : function(e) {
            var url = 'http://127.0.0.1:5000/room/add';
            var self = this;
            Vue.http.post(url,{body : this.formatData()})
            .then(function(data) {
                if(data.body.code == 0){
                    $('.ui.modal')
                    .modal('show'); 
                    // location.href= '';
                } else {
                    alert('提交失败：' + data.body.msg);
                }

            }, function(e) {
                alert('提交失败');
            })           
            return false;
        },
        formatData : function() {
            var res = {
                name : this.name,
                url : this.url,
                thumb : this.getThumb(),
            };
            return res;
        },
        getThumb : function() {
            return this.$refs.thumbcom.imgurl;
        }
    }
});

function getId() {
    return id++;
}

})()