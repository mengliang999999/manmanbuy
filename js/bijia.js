/**
 * Created by fanfchun on 2017/3/30.
 */
var fc={}
fc.getUrlParam=function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return r[2]; return null; //返回参数值
}
fc.bijia= function () {
    //获取url参数
    var id=fc.getUrlParam('productid');
    var name=decodeURI(fc.getUrlParam('category'));
    //购买详情页
    $.ajax({
        type:'get',
        dataType:'json',
        url:'http://139.199.157.195:9090/api/getproduct',
        data:{productid:id},
        success: function (data) {
            $('#zaijiaerror').hide();
            $('#update').hide();
            var tem=template('getproduct',data);
            var pname=data.result[0]['productName'];
            setTimeout(function () {
                $('.mask').hide();
                $('body').css('overflow','auto');
            },500)
            $('title').html(pname);
            var t=pname.split(' ');
            $('header').eq(1).after(tem);
            $('.list-title3').html(t[0]);
            $('.list-title2').html(name);
            fc.shaixuan();
            //生成评价页
            $.ajax({
                type:'get',
                dataType:'json',
                url:'http://139.199.157.195:9090/api/getproductcom',
                data:{productid:id},
                success: function (data) {
                    var tem=template('getproductcom',data);
                    $('.product-com-list ul').append(tem);
                    id=1;
                    //tab操作
                    var lis=$('.tab').find('li');
                    lis.on('click', function () {
                        $(this).siblings('li').removeClass('cur');
                        $(this).addClass('cur');
                        if($(this)[0]==lis.get(0)){
                            $('.plist table').css({display:'table'});
                            $('.plist .note').css({display:'none'});
                            $('.product-com-title').css({display:'none'});
                            $('.product-com-list').css({display:'none'});
                        }
                        if($(this)[0]==lis.get(1)){
                            $('.plist table').css({display:'none'});
                            $('.plist .note').css({display:'block'});
                            $('.product-com-title').css({display:'none'});
                            $('.product-com-list').css({display:'none'});
                        }
                        if($(this)[0]==lis.get(2)){
                            $('.plist table').css({display:'none'});
                            $('.plist .note').css({display:'none'});
                            $('.product-com-title').css({display:'block'});
                            $('.product-com-list').css({display:'block'});
                        }
                    })
                }

            })
            //点击更多评价加载更多
            $('.morein').on('click',function () {
                console.log(1);
                $.ajax({
                    type:'get',
                    dataType:'json',
                    url:'http://139.199.157.195:9090/api/getproductcom',
                    data:{productid:id},
                    success: function (data) {
                        var tem=template('getproductcom',data);
                        $('.product-com-list ul').append(tem);
                        id++;
                    }
                })
            })
            //收藏操作
            $('.product-collect a').on('click', function (e) {
                $(this).parent().append('<a></a><div></div>');
                $(this).siblings('div').css({position:'absolute',left:0,top:0,zIndex:-99,borderRadius:'50%'}).append($(this).clone()).find('img').css({verticalAlign: 'middle',
                height: '39px',
                width: '39px',
                    borderRadius:'50%'
                });
                $(this).siblings('a').css({
                    position:'absolute',
                    left:0,
                    top:0,
                    width:'39px',
                    height:'39px',
                    borderRadius:'50%',
                    background:'rgba(0,0,0,0.5)'
                })
                var that=$(this).siblings('div')
                that.animate({top:[-236,'backout']},3000)

            })

        },
        //详情页出错了
        error: function () {
            $('.page').hide();
            $('#zaijiaerror').show();
            $('#update').css('display','block');
            setTimeout(function () {
                $('.mask').hide();
                $('body').css('overflow','auto');
            },500)
        }
    })
}
fc.bijia();
//飘雪花
fc.xuehua= function () {
    var snowflakeURl = [
        'images/o_1.png',
        'images/o_2.png',
        'images/o_3.png',
        'images/o_4.png',
        'images/o_5.png',
        'images/o_6.png'
    ] //js设置数组存储6张花瓣的图片

    var container = $("#content");
    visualWidth = container.width();
    visualHeight = container.height();
    //获取content的宽高
    ///////
    //飘雪花 //
    ///////
    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity = 1,
                endPositionTop = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration = visualHeight * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;
            // 创建一个雪花
            var $flake = createSnowBox();
            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });
            // 加入到容器
            $flakeContainer.append($flake);
            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });

        }, 200);
    }
    snowflake()
    //执行函数
}
fc.xuehua();
//筛选
fc.shaixuan= function () {
    $('nav .collapse .well input').on('click', function () {
        console.log(1);
        var vl=[];
        var str='';
        var biaoqian=[];
        $('nav .collapse .well input').each(function (i, v) {
            if($(this).prop('checked')) {
                vl.push($(this).next('lable').html());
                biaoqian.push($(this))
            }
        })
        $.each(vl, function (i,v) {
            if(v!==''){
                str=str+'&nbsp;&nbsp;<span style="color: dodgerblue">'+v+' <b>%C3%97</b></span>';
            }
        })
        $('nav .collapse .well div').html('');
        $('nav .collapse .well div').html(decodeURI(str));
        $('nav .collapse .well div span b').on('click', function () {
            var that=$(this).parent();
            $('nav .collapse .well div span').each(function (i,v) {
                if($(v)[0]==that[0]){
                    biaoqian[i].prop('checked',false);
                    biaoqian.splice(i,1);
                    that.remove();
                }
            })
        })

    })
    $('nav .collapse .well button').on('click', function () {
        $('nav .collapse .well div').html('');
        $('nav .collapse .well input').each(function (i, v) {
            $(v).prop('checked',false);
        })
    })



}