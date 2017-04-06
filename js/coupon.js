$(function(){
    //=====方法调用=====
    setTimeout(init,500);
    //=====方法定义=====
    function init(){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getcoupon",
            dataType:"json",
            success:function(data){
                var html=template("couponTmp",data);
                $(".coupon-title ul").html(html);
                $(".coupon-title li").on("click",function(i,v){
                    //存储标题  下一个页面可以用到
                    window.localStorage.setItem('couponTit',data.result[$(this).index()].couponTitle);
                })
            },
            error:function(){
                $(".coupon-title li.error").show();
            }
        });
        $(".coupon-title li.active").hide();
    }
})