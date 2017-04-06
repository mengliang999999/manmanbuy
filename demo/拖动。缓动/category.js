window.onload = function(){
    leftSwipe();
    //rightSwipe();
}
/*左菜单*/
function leftSwipe(){
    /*
     * 1.菜单滑动起来
     * 2.当滑动到一定的距离的时候不能滑动  滑动区间
     * 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去
     * */

    /*获取父容器*/
    var parentBox = document.querySelector('.jd_category_left');
    var childBox = parentBox.querySelector('ul');
    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;

    /*translateY 初始的定位 其实就是最大定位 0*/
    var maxY = 0;
    /*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-子容器高度*/
    var minY = parentHeight-childHeight;
    /*自己定义缓冲的距离*/
    var distance = 100;
    /*translateY 最大滑动定位*/
    var maxSwipe = maxY + 100;
    /*translateY 最小滑动定位*/
    var minSwipe = minY - 100;

    /*第一步  1.菜单滑动起来*/
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove  = false;

    var currY = 0;/*记录当前的定位 全局  相当于轮播图当中的index*/

    /*定义公用的方法*/
    var addTransition = function(){
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    }
    var removeTransition = function(){
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    }
    var setTranslateY = function(y){
        childBox.style.webkitTransform = "translateY("+y+"px)";
        childBox.style.transform = "translateY("+y+"px)";
    }

    /*绑定事件*/
    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY-startY;
        console.log(distanceY);
        /*清除过度*/
        removeTransition();
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if((currY + distanceY) < maxSwipe &&　(currY + distanceY) > minSwipe){
            setTranslateY(currY + distanceY);
        }

    });
    window.addEventListener('touchend',function(e){
        /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        /*当往下滑的时候 大于 最大定位*/
        if(( currY + distanceY)>maxY){
            currY = maxY;
            addTransition();
            setTranslateY(currY);
        }
        /*当往上滑的时候 小于 最小定位*/
        else if(( currY + distanceY)<minY){
            currY = minY;
            addTransition();
            setTranslateY(currY);
        }
        else{
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currY = currY + distanceY;
        }

        /*重置所有的参数  不重置currY */
        startY = 0;
        moveY =0;
        distanceY = 0;
        isMove = 0;
    });
}
