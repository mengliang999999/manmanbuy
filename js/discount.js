'use strict';
$(function () {
    //  var arr = window.location.search.slice(1).split("=");
    //     var res = {};
    //     res[arr[0]] = arr[1];
    //     console.log(res);
    var productId = getQueryString("productid");
    getProductData();
    //获得产品数据
    function getProductData() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getmoneyctrlproduct",
            type: "get",
            dataType: "json",
            data: {
                productid: productId
            },
            // data:res,
            success: function (data) {
                // console.log(data);
                var detailHtml = template("detailTmp", data);
                $("#discount").html(detailHtml);
            },
            error: function (data) {
                var img = $('<img src="images/error.jpg" alt="">');
                $("#discount").html(img);
            }
        })
    }


    //获取url地址中的参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})