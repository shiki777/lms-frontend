var infoUrl = 'http://127.0.0.1:5000/api/info';
var roominfoUrl = 'http://127.0.0.1:5000/api/roominfo';

var user = {
    name : 'guest',
    password : ''
};

init();

function init() {
    new Vue({
        'el' : '#page'
    })    
    getInfo()
    .then(function(data) {
    })         
}

function getInfo() {
    var defer = $.Deferred();
    $.get(infoUrl,function(data) {
        // channels = data;
        defer.resolve(data);
    })
    return defer.promise();
}

function getRoomInfo() {
    $.get(roominfoUrl + '?id=' + 10000,function(data) {
        console.log(data)
    })    
}

function getMd5(str) {
    var md5 = hex_md5(str);
    return md5.slice(8,8+16);
}