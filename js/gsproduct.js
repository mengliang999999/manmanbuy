// 凑单品js
$(function() {
    (function() {
        // 默认参数shopid和areaid为0，请求数据渲染页面
        // 伪造一个等待加载
        // setTimeout(getDateDefault, 500);

        getDateDefault();
        // getDateDefault(0, 0);
        // 点击类名为on的li标签，获取其索引值
        // 显示隐藏切换     
        $("li.on").click(function(e) {
            var index = $(this).index();
            // 显示内容更换
            $(".popbox").eq(index).toggleClass('show').siblings().removeClass('show');
            // 箭头更换
            $(this).children("i").toggleClass('upArr');
            $(this).siblings().children("i").removeClass('upArr');
            // 阻止事件冒泡，避免触发document的点击事件
            e.stopPropagation();
        });

        // 点击页面任何位置都可以让筛选列表隐藏
        $(document).click(function() {
            $(".popbox").removeClass('show');
        });


        // 当url地址传入参数shopid和areaid根据相应的店铺和区域获取数据

        var shopid = "";
        var areaid = "";

        // 获取数据
        // 店铺数据
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsshop",
            dataType: "jsonp",
            success: function(data) {
                // 渲染数据
                var html = template("shoplist", data);
                $("#shop").html(html);

                // 动态添加默认数据
                $(".filter li").eq(0).children("a").html(data.result[0].shopName);

                // 点击商店下拉列表改变筛选列表中li标签的内容 
                changeData("#shop li", "#shop", "shopid", 0);
            }
        });

        //区域数据
        $.ajax({
            url: "http://139.199.157.195:9090/api/getgsshoparea",
            dataType: "jsonp",
            success: function(data) {
                var html = template("arealist", data);
                $("#area").html(html);

                //动态添加默认数据
                $(".filter li").eq(1).children("a").html(data.result[0].areaName.slice(0, 2));

                // 点击区域下拉列表改变筛选列表中li标签的内容 
                changeData("#area li", "#area", "areaid", 1);
            }
        });


        // 改变筛选列表中的数据
        function changeData(dom, box, id, i) {
            $(dom).click(function(e) {
                var index = $(this).index();
                $(this).parent().addClass('show');
                var html = $(this).children(index).html().split("（")[0];
                console.log(html);
                $("li.on").eq(i).children("a").text(html);
                // 箭头更换
                $("li.on").eq(i).children("i").removeClass('upArr');
                $(box).removeClass('show');
                //动态获取标题的自定义属性areaid的值用于url传参
                $(".filter li").eq(i).children("a").attr(id, index);
                // 获取shopid和areaid的值
                shopid = $(".filter li").eq(0).children("a").attr("shopid");
                areaid = $(".filter li").eq(1).children("a").attr("areaid");
                // 阻止事件冒泡，避免触发document的点击事件
                e.stopPropagation();
                // 获取凑单品列表数据，并渲染到页面中
                getDate(shopid, areaid);
            });
        }

        var Data = {};
        // // 获取凑单品列表数据，并渲染到页面中
        function getDate(shopid, areaid) {
            $.ajax({
                url: "http://139.199.157.195:9090/api/getgsproduct",
                dataType: "json",
                data: { shopid: shopid, areaid: areaid },
                success: function(data) {
                    // 先将之前的ul内容清空，否则会追加到此产品底下
                    $(".gs-product-list ul").empty();
                    Data = data;
                    rander();
                }
            });
            $("#mask").hide();
        }

        // // 页面加载默认数据
        function getDateDefault() {
            getDate(0, 0);
        }
        // // 渲染数据
        function rander() {
            var newData = { result: [] };
            var leng = 4;
            if (Data.result.length <= 4) {
                leng = Data.result.length;
            }
            for (var i = 0; i < leng; i++) {
                newData.result.push(Data.result.shift());
            }

            var html = template("productlist", newData);
            $(".gs-product-list ul").append(html);
            flag = false;
        }

        // 懒加载

        // 加一个控制数据多次加载的开关，这是因为我们的ajax是异步的原因
        var flag = false;
        $(window).scroll(function() {
            if (Data.result.length == 0 || flag) {
                return;
            }
            var height = $(".gs-product-list ul").height() + $("#header").height() + $(".footer").height() - $(document.body).height();

            var disHeight = height - $(window).scrollTop();
            if (disHeight < 50) {
                flag = true;
                rander();
            }
            // 跳转到头部
            if($(window).scrollTop()>500){
                $("#gotop").stop().show();
                $("#gotop").click(function(){
                   $(window).scrollTop(0);
                   $("#gotop").stop().hide();
                })
            }else{
                $("#gotop").stop().hide();
            }
        });
    })()
})
