(function () {
    //通过$.ajax进行jsonp请求
    $.ajax({
        type: 'get',
        //将前一个页面传递过来的参数拼接进url中
        url: 'http://139.199.157.195:9090/api/getdiscountproduct?productid=' + getQueryString("productId"),
        dataType: 'jsonp',
        success: function (data) {
            // console.log(data)
            //通过模版生成节点
            var html = template("opop", data);
            //将节点生成页面
            $("#container").html(html);
            //点击的时候去除类让介绍文字完整显示
            $('.P-off').on('click', function () {
                $('.P-off').toggleClass('P-off');
            });
            //判断result是否有数据没有给错误图片
            if (data.result.length == 0) {
                document.getElementById("error").style.display = "block";
            }
        }
    });
    //获取url传递过来的参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})();