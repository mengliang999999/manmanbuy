/**
 * Created by fanfchun on 2017/3/29.
 */
var fc={};
fc.getUrlParam=function(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //����һ������Ŀ�������������ʽ����
    var r = window.location.search.substr(1).match(reg);  //ƥ��Ŀ�����
    if (r!=null) return r[2]; return null; //���ز���ֵ
}
fc.product= function () {
    var pages=1;
    $('#update').attr('href',window.location.href);
    var id=fc.getUrlParam("categoryid");
    var name=decodeURI(fc.getUrlParam('category'));
    $('title').html(name);
    $('.list-title3').html(name);
    //��һҳ��ȡ����
    $('.btn-group:nth-last-of-type(1)').on('click',function () {
        if(pages==1){
            pages=3;
            $('select').children('option').eq(2).prop('selected',true);
        }else{
            pages--;
            $('select').children('option').eq(pages-1).prop('selected',true);
        }
        var select=$('select').val();
        $.ajax({
            type:'get',
            url:'http://139.199.157.195:9090/api/getproductlist',
            dataType:'json',
            data:{categoryid:id,pageid:select},
            success: function (data) {
                var tem=template('productlist',data);
                $('.foodlist ul').html(tem);
            }
        })
    });
    //��һҳʱ��ȡ����
    $('.btn-group:nth-of-type(2)').on('click',function () {
        if(pages==3){
            pages=1;
            $('select').children('option').eq(pages-1).prop('selected',true);
        }else{
            pages++;
            $('select').children('option').eq(pages-1).prop('selected',true);
        }
        //������
        var select=$('select').val();
        $.ajax({
            type:'get',
            url:'http://139.199.157.195:9090/api/getproductlist',
            dataType:'json',
            data:{categoryid:id,pageid:select},
            success: function (data) {
                var tem=template('productlist',data);
                $('.foodlist ul').html(tem);
            }
        })
    });
    //�ı�ҳ����ʱ�����»�ȡ����
    $('select').on('change', function () {
        var select=$('select').val();
        $.ajax({
            type:'get',
            url:'http://139.199.157.195:9090/api/getproductlist',
            dataType:'json',
            data:{categoryid:id,pageid:select},
            success: function (data) {
                var tem=template('productlist',data);
                $('.foodlist ul').html(tem);
            }
        })
    });
    //�������뱾ҳ��ʱ������������
    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproductlist',
        dataType:'json',
        data:{categoryid:id,pageid:pages},
        success: function (data) {
            //������ȷʱ
            $('.page').show();
            $('#zaijiaerror').hide();
            $('#update').hide();
            var tem=template('productlist',data);
            setTimeout(function () {
                $('.mask').hide();
                $('body').css('overflow','auto')
            },500)
            $('.foodlist ul').html(tem);
        },
        //���ݴ���ʱִ��
        error: function () {
            $('.page').hide();
            $('#zaijiaerror').show();
            $('#update').css('display','block');
            setTimeout(function () {
                $('.mask').hide();
                $('body').css('overflow','auto')
            },500)
        }
    })



}
fc.product();
//Ʈѩ��
fc.xuehua= function () {
    var snowflakeURl = [
        'images/o_1.png',
        'images/o_2.png',
        'images/o_3.png',
        'images/o_4.png',
        'images/o_5.png',
        'images/o_6.png'
    ] //js��������洢6�Ż����ͼƬ
    var container = $("#content");
    visualWidth = container.width();
    visualHeight = container.height();
    //��ȡcontent�Ŀ��
    //Ʈѩ��
    function snowflake() {
        // ѩ������
        var $flakeContainer = $('#snowflake');

        // �������ͼ
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // ����һ��ѩ��Ԫ��
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
        // ��ʼƮ��
        setInterval(function() {
            // �˶��Ĺ켣
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity = 1,
                endPositionTop = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration = visualHeight * 10 + Math.random() * 5000;

            // ���͸���ȣ���С��0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;
            // ����һ��ѩ��
            var $flake = createSnowBox();
            // ������λ��
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });
            // ���뵽����
            $flakeContainer.append($flake);
            // ��ʼִ�ж���
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //������ɾ��
            });

        }, 200);
    }
    snowflake()
    //ִ�к���
}
fc.xuehua();
//ɸѡ
fc.shaixuan= function () {
    $('.productlistnav .collapse .well input').on('click', function () {
        var vl=[];
        var str='';
        var biaoqian=[];
        $('.productlistnav .collapse .well input').each(function (i, v) {
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
        $('.productlistnav .collapse .well div').html('');
        $('.productlistnav .collapse .well div').html(decodeURI(str));
        $('.productlistnav .collapse .well div span b').on('click', function () {
            var that=$(this).parent();
            $('.productlistnav .collapse .well div span').each(function (i,v) {
                if($(v)[0]==that[0]){
                    biaoqian[i].prop('checked',false);
                    biaoqian.splice(i,1);
                    that.remove();
                }
            })
        })

    })
    $('.productlistnav .collapse .well button').on('click', function () {
        $('.productlistnav .collapse .well div').html('');
        $('.productlistnav .collapse .well input').each(function (i, v) {
            $(v).prop('checked',false);
        })
    })



}
fc.shaixuan();