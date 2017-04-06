"use strict";
$(function() {
    getSearchData();
    //获取搜索内容
    function getSearchData() {
        $("#keyWord").keyup(function() {
            var v = $(this).val();
            if ($(this).val().trim() != "") {
                $("#delete-img").show();
            } else {
                $("#delete-img").hide();
            }
            $.ajax({
                url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                dataType: "jsonp",
                jsonp: "cb",
                data: {
                    wd: v
                },
                success: function(data) {
                    var searchHtml = template("searchTmp", data);
                    $(".searchList").html(searchHtml);
                    $(".searchList li").on("click", function() {
                        $("#keyWord").val($(this).html());
                        $(".searchList").hide();
                    })
                }
            })
        });
    }
    $("#delete-img").on("click", function() {
        $(this).hide();
        $("#keyWord").val("")
        $(".searchList").html("");
    })



    getproductList();
    //获取产品；列表
    function getproductList() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getcategorytitle",
            type: "get",
            dataType: "json",
            success: function(data) {
                console.log(data);
                var contentHtml = template("contentTmp", data);
                $("#accordion").html(contentHtml);
                $(".panel-heading").on("click", function() {
                    var num = $(this).attr("data-id");
                    var that = $(this);
                    console.log(num);
                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getcategory",
                        type: "get",
                        dataType: "json",
                        data: {
                            titleid: num
                        },
                        success: function(data) {
                            console.log(data)
                            var rowHtml = template("rowTmp", data);
                            console.log(that);
                            that.next().find("#rows").html(rowHtml);
                            $("#rows div").css({
                                "text-align": "center",
                                "height": "40px",
                                "line-height": "40px",
                                "border-right": "1px solid #ccc",
                                "border-bottom": "1px solid #ccc",
                                "font-size": "12px"
                            })
                        }
                    })
                })
            }
        })
    }
})
