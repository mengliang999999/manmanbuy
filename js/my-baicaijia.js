"use strict";
$(function () {
    getNavData();
    //获得导航数据
    function getNavData() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getbaicaijiatitle",
            type: "get",
            dataType: "json",
            success: function (data) {
                var navHtml = template("swiperTmp", data);
                $("#swiper-nav").html(navHtml);
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    slidesPerView: 5,
                    paginationClickable: true,
                    spaceBetween: 0
                });
                $("#navList li:first").addClass("active");

                $.ajax({
                    url: "http://139.199.157.195:9090/api/getbaicaijiaproduct",
                    type: "get",
                    dataType: "json",
                    data: {
                        titleid: 0
                    },
                    success: function (data) {
                        var productHtml = template("contentTmp", data);
                        $("#mainContent").html(productHtml);
                    }
                })

                $("#navList li").on("click", function () {
                    $(this).addClass("active").siblings("li").removeClass("active");
                    var definedAttr = $(this).attr("data-titleId");
                    $.ajax({
                        url: "http://139.199.157.195:9090/api/getbaicaijiaproduct",
                        type: "get",
                        dataType: "json",
                        data: {
                            titleid: definedAttr
                        },
                        success: function (data) {
                            var productHtml = template("contentTmp", data);
                            $("#mainContent").html(productHtml);
                        }
                    })
                })
            }
        })
    }










});