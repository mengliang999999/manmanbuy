//实现页面加载完毕之前loading提示效果
//监听加载状态改变
document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        
        // document.getElementById("fire-container").style.display = "none";
        // document.getElementById("jiazz").style.display = "none";
        document.getElementById("over-fire").style.display = "none";
        // document.getElementById("over").style.display = "none";
        document.getElementById("cover-dis").style.display = "none";
        document.getElementById("mask").style.display = "none";
        
    }
}