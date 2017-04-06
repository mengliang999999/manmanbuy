'use strict';
$(function() {
    // alert(0)
    var Data = {};
    //下拉动作
    $("#slide").pullToRefresh();

    //下拉刷新
    $("#slide").on("pull-to-refresh", function() {
        setTimeout(function() {
            window.location.reload();
            //复位
            $("#slide").pullToRefreshDone();
        }, 2000)
    });


    //===========方法调用===================
    getMenuList();
    getProductList();
    getSearchData();
    // lazyLoading();
    //===========方法定义=======================
    //获取菜单
    function getMenuList() {
        // alert(0)
        $.ajax({
            url: "http://139.199.157.195:9090/api/getindexmenu",
            type: 'get',
            dataType: 'json',
            success: function(data) {
                // console.log(data);
                var navHtml = template("menuTmp", data);
                $(".container > #rowContent").html(navHtml);
            }
        })
    };

    //注册方法
    template.helper("getNum1", getNum);

    function getNum(text) {
        var value = text.replace(/[^0-9]/ig, "");
        return value;
    }


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
    $("#superValue .sanjiao").on("click", function() {
        var has = $(".main").hasClass("slide");
        if (has) {
            $(this).css({
                "transform": "translateY(-0.1rem) rotate(45deg)"
            })

            $(".main").removeClass("slide");
            $(".main").slideDown(500);
        } else {
            $(this).css({
                "transform": "rotate(-45deg)"
            })
            $(".main").addClass("slide");
            $(".main").slideUp(500);
        }
    });


    //获取商品
    function getProductList() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            type: "get",
            dataType: "json",
            success: function(data) {
                var productHtml = template("productTmp", data);

                $(".main").html(productHtml);

                $("#rowContent .area-item").eq(7).on("click", function() {
                    var has = $("#rowContent").hasClass("toggleDown");
                    if (has) {
                        $("nav .row").removeClass("toggleDown");
                    } else {
                        $("nav .row").addClass("toggleDown");
                    }
                })
            }
        })
    }


});
