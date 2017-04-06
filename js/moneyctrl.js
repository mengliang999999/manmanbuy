"use strict";
$(function () {
    var currentPage, totalPages, pageSize, counts, num = 1;
    getdata();

    //下一页
    function getNext() {
        $(".sel option").eq(num).prop("selected", true);
        num++;
        if (num >= 15) {
            $(".page .next").off("click", getNext);
            num = 15;
            alert("已经是最后一页了");
        }
        console.log(num);
        $.ajax({
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            type: "get",
            dataType: "json",
            data: {
                pageid: num
            },
            success: function (data) {
                var productHtml = template("productTmp", data);
                $(".main").html(productHtml);
            }
        })

    }
    // 上一页
    function getPrev() {
        num--;
        console.log(num);
        if (num <= 1) {
            $(".page .prev").off("click", getPrev);
            num = 1;
            alert("已经是第一页了");
        }

        $.ajax({
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            type: "get",
            dataType: "json",
            data: {
                pageid: num
            },
            success: function (data) {
                var productHtml = template("productTmp", data);
                $(".main").html(productHtml);
            }
        })
        $(".sel option").eq(num - 1).prop("selected", true);

    }


    //注册方法
    template.helper("getNum1", getNum);

    function getNum(text) {
        var value = text.replace(/[^0-9]/ig, "");
        return value;
    }

    function getdata() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            type: "get",
            dataType: "json",
            success: function (data) {
                // console.log(data);

                var productHtml = template("productTmp", data);
                $(".main").html(productHtml);

                //page
                pageSize = data.pagesize;
                counts = data.totalCount;
                totalPages = Math.ceil(counts / pageSize);
                var html = '';
                for (var i = 1; i <= totalPages; i++) {
                    html += '<option value="' + i + '"><em>' + i + '</em>/<em>' + totalPages + '</em></option>';
                }
                $(".sel").html(html);

                //下一页
                $(".page .next").on("click", getNext);

                //上一页
                $(".page .prev").on("click", getPrev);

                //改变
                $(".sel").on("change", function () {
                    var v = $(this).val();
                    num = parseInt(v);
                    console.log(v);
                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getmoneyctrl",
                        type: "get",
                        dataType: "json",
                        data: {
                            pageid: v
                        },
                        success: function (data) {
                            var productHtml = template("productTmp", data);
                            $(".main").html(productHtml);
                        }
                    })
                })

            },
            error:function(data){
                var img = $('<img src="images/error.jpg" alt="">');
                $(".main").html(img);
            }
        })
    }





})