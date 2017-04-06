// 十大品牌列表页js

$(function() {
    (function() {
        // 点击每一个商品时传递url参数
        template.helper("getUrlId", getUrlId)

        function getUrlId() {
            return window.location.search.slice(1);
        }

        // 通过localStorage方式获取标题
        var brandTit = window.localStorage.getItem("brandTit").slice(0, -4);
        var tit = brandTit.slice(-2);
        // 通过url方式传参，获取参数
        var id = getURL("brandtitleid");
        // 获取数据
        // 品牌数据
        $.ajax({
            url: "http://139.199.157.195:9090/api/getbrand",
            data: { brandtitleid: id },
            dataType: "jsonp",
            success: function(data) {

                // 将自定义tit参数传入data的result中
                $.each(data.result, function(i, v) {
                    v.tit = tit;
                    console.log(v.tit);
                });
                // 渲染页面
                var html = template("brandInfo", data);
                $(".brand-list .category-list-info").html(html);


                // 设置标题
                var brandTitle = brandTit + "哪个牌子好";
                var saleTitle = brandTit + "产品销量排行";
                var commentTitle = brandTit + "最新评论";
                // 设置品牌标题
                $(".brand-list .category-list-hd").html(brandTitle);
                // 设置销量标题
                $(".sale-list .category-list-hd").html(saleTitle);
                // 设置评论标题
                $(".comment-list .category-list-hd").html(commentTitle);


                // 设置面包屑导航
                $("#brandNav").html(brandTit);
            }
        });
        // 销量数据
        $.ajax({
            url: "http://139.199.157.195:9090/api/getbrandproductlist",
            dataType: "jsonp",
            data: { brandtitleid: id },
            success: function(data) {

                // 将自定义tit参数传入data的result中
                $.each(data.result, function(i, v) {
                    v.tit = tit;
                });

                var html = template("saleInfo", data);
                //中央空调及之后的result数据为空，不存在productName属性，
                // 会报错，所以应该先判断
                var name = "";
                var img = "";
                if (data.result.length != 0) {
                    name = data.result[0].productName;
                    img = data.result[0].productImg;
                    $(".sale-list .category-list-info").html(html);
                } else {
                    $(".sale-list .category-list-info").html("<li>抱歉，暂无相关数据</li>");
                }

                // 评价数据
                $.ajax({
                    url: "http://139.199.157.195:9090/api/getproductcom",
                    data: { productid: id },
                    success: function(data) {
                        // 将自定义tit参数传入data的result中
                        $.each(data.result, function(i, v) {
                            v.tit = tit;
                        });
                        if (data.result.length == 0) {
                            $(".comment-list .category-list-info").html("<li>暂无评论</li>");
                        } else {
                            data.result[0].img = img;
                            data.result[0].name = name;
                            var html = template("commentInfo", data);
                            $(".comment-list .category-list-info").html(html);
                        }
                    }
                });
            }
        });

        // 点击导航切换显示隐藏
        $(".category-list>li").click(function(e) {
            $(this).children("ul").toggleClass('show');
            $(this).siblings().children("ul").removeClass('show');
            e.stopPropagation()
        });
        // 点击屏幕隐藏所有
        $(document).click(function() {
            $(".category-list>li").children("ul").removeClass('show');
        });






        //获取url中参数
        function getURL(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }


        //智能提示
        $("#txt").keyup(function() {
            var kw = $(this).val();
            if (kw === '') {
                $('.cha').hide();
                $("#info").html('');
                return;
            }
            //console.log(kw);
            $.ajax({
                url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
                jsonp: 'cb',
                data: { wd: kw },
                dataType: 'jsonp',
                success: function(data) {
                    var sug = data.s;
                    var tag = '<ul>';
                    $.each(sug, function(i, e) {
                        tag += '<li>' + e + '</li>';
                    });
                    tag += '</ul>';
                    $("#info").html(tag);


                    $("#info").find('li').click(
                        function() {
                            var tips = $(this).html();
                            $("#txt").val(tips);
                            $("#info").html('');
                        })
                }
            });
            $('.cha').show();
            $('.cha').click(function() {
                $('.cha').hide();
                $("#txt").val('');
                $("#info").html('');
            })

        })










    })()
})
