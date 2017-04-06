var hgl = {};
$(".collapse").collapse()
hgl.category = function () {

    $(function () {
//分类数据
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getcategorytitle',
            type: "get",
            dataType: 'json',
            success: function (data) {
                $('body').css('overflow', 'auto');
                //延迟隐藏加载
                setTimeout(function () {
                    $('#load').hide();
                }, 500);
                //获取分类标题
                var tem = template('categoryTitleTmp', data);
                $('.panel-group').html(tem);
                $('.panel').click(function () {
                    var titleid = $(this).find('a').data('titleid');
                    //console.log(titleid);
                    var that = $(this)
                    $.ajax({
                        url: 'http://139.199.157.195:9090/api/getcategory',
                        type: 'get',
                        dataType: 'json',
                        data: {titleid: titleid},
                        success: function (data) {
                            //获取分类列表
                            var tem = template('categoryTmp', data);
                            that.find('.panel-collapse>.panel-body').html(tem);
                        }
                    })
                })

            },
            error: function () {
//访问出错
                $('#load').hide();
                $('#loading').show();
            }
        })
        //搜索框智能提示
        $("#txt").keyup(function () {
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
                data: {wd: kw},
                dataType: 'jsonp',
                success: function (data) {
                    var sug = data.s;
                    var tag = '<ul>';
                    $.each(sug, function (i, e) {
                        tag += '<li>' + e + '</li>';
                    });
                    tag += '</ul>';
                    $("#info").html(tag);

                    $("#info").find('li').click(
                        function () {
                            var tips = $(this).html();
                            $("#txt").val(tips);
                            $("#info").html('');
                        })
                }
            });
            $('.cha').show();
            $('.cha').click(function () {
                $('.cha').hide();
                $("#txt").val('');
                $("#info").html('');
            })

        })

    })
}
hgl.category();