// 品牌大全页面js
// jq入口函数
$(function() {
    //沙箱模式
    (function() {
        // 伪造一个等待加载
        setTimeout(getHtml, 500);

        // ajax请求获取数据方法
        function getHtml() {
            $.ajax({
                url: "http://139.199.157.195:9090/api/getbrandtitle",
                dataType: "jsonp",
                success: function(data) {
                    var html = template("brandTitle", data);
                    $(".rank").html(html);

                    //通过localStorage传参
                    $(".rank li").on("click", function() {
                        //存储标题
                        window.localStorage.setItem('brandTit', data.result[$(this).index()].brandTitle);
                    })
                }
            });
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
