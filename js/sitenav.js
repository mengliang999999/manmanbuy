$(function(){
    // ======方法调用======
    setTimeout(init,500);
    // ======方法定义======
    function init(){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getsitenav",
            dataType:"json",
            success:function(data){
                var html=template("linkTmp",data);
                $(".site-nav .link").html(html);
            },
            error:function(){
                $(".site-nav .error").show();
            }
        });
        $(".site-nav .active").hide();
    }
});