$(function(){
    setTimeout(init,500);
    function init(){
        //改变网页标题和h1标题以及面包屑导航标题   localStorage所有的ie都不兼容  只适合移动端
        var couponTit=window.localStorage.getItem("couponTit");
        $("title").html(couponTit+"优惠券--慢慢买");
        $("#header h1").html(couponTit+"优惠券");
        $(".navBar a:last").html(couponTit+"优惠券");
        //获取url里面的参数
        var hqStr=getQueryString("couponid");
        //获取字符串中的数字
        template.helper("getNum",getNum);
        //获取img标签中的src,作为a的href的参数
        template.helper("getHref",getHref);
        //获取img标签中的alt,作为a的title参数
        template.helper("getTitle",getTitle);
        $(".quan-list li.active").hide();
        $.ajax({
            url:"http://139.199.157.195:9090/api/getcouponproduct",
            data:{couponid:hqStr},
            success:function(data){
                var html=template("quanTmp",data);
                var listHtml=template("picTmp",data);
                $(".quan-list ul").html(html);
                $(".pic-list").html(listHtml);
                var $lis=$(".pic-list li");
                var len=$lis.size();
                var width=$(".mask").width();
                $(".quan-list li").each(function(i,v){
                    $(v).children('a').on("click",function(){
                        var num=$(this).parent().index();
                        $(".mask").fadeIn(500);
                        if(len>2){
                            var center=num;
                            var left=(num==len-1)?num-1:len-1;
                            var right=(num==len-1)?0:center+1;
                            setTranslate($lis,left,right,center,width);
                            $("#nextArrow").on("click",function(){
                                left=center;
                                center=right;
                                right++;
                                if(right>len-1){
                                    right=0;
                                }
                                setTransition($lis,right,left,center);
                                setTranslate($lis,left,right,center,width);
                            })
                            $("#prevArrow").on("click",function(){
                                right=center;
                                center=left;
                                left--;
                                if(left<0){
                                    left=len-1;
                                }
                                setTransition($lis,left,right,center);
                                setTranslate($lis,left,right,center,width);
                            })
                        }else{
                            $lis.eq(num).get(0).style.transform="translateX("+0+"px)";
                        }
                        $(".pic-list").on("click",function(){
                            $(this).parent().hide();
                        });
                        return false;
                    })
                })
            },
            error:function(){
                $(".quan-list li.error").show();
            }
        });
    }
    //设置translate 偏移
    function setTranslate(dom,left,right,center,width){
        dom.eq(left).get(0).style.transform="translateX("+(-width)+"px)";
        dom.eq(right).get(0).style.transform="translateX("+width+"px)";
        dom.eq(center).get(0).style.transform="translateX("+0+"px)"; 
    }
    //设置过渡
    function setTransition(dom,left,right,center){
        dom.eq(left).get(0).style.transition="none";
        dom.eq(right).get(0).style.transition="all 0.4s";
        dom.eq(center).get(0).style.transition="all 0.4s";
    }
    //获取url中的参数
    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg);
        //如果有汉字需要encodeURI 替换掉unescape 
        if (r != null) return unescape(r[2]); return null; 
    }
    //获取字符串中的数字
    function getNum(name){
        return name.replace(/[^0-9]/gi,"");
    }
    //获取img标签中的src,作为a的href的参数
    function getHref(name){
        return name.match(/src.*((\.jpg)|(\.png))/ig)[0].replace(/src="/g,"");
    }
    //获取img标签中的alt,作为a的title参数
    function getTitle(name){
        return name.match(/alt=.*">/ig)[0].replace(/alt="/g,"").replace(/">/,"");
    }
});