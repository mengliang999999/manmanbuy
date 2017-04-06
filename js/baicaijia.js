var hgl = {};
hgl.baicaijia = function () {
    $(function () {
        var Data = {};
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiatitle',
            type: "get",
            dataType: 'json',
            success: function (data) {
                //延迟隐藏加载
                setTimeout(function () {
                    $('#load').hide();
                }, 400);
                $('body').css('overflow', 'auto');
                var tem = template('title', data);
                $('.nav ul').html(tem);
                hgl.Swipe();
                $('.nav ul li').click(function () {
                    //获取自定义属性
                    var titleid = $(this).attr('titleid');
                    $.ajax({
                        url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
                        type: 'get',
                        dataType: 'json',
                        data: {titleid: titleid},
                        success: function (data) {
                            Data=data;
                            $('.list ul').html("");
                            render();
                        }
                    })
                })

                //初始页面
                $.ajax({
                    url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct',
                    type: 'get',
                    dataType: 'json',
                    data: {titleid: 0},
                    success: function (data) {
                        Data=data;
                        $('.list ul').html("");
                        //var tem = template('product', data);
                        //$('.list ul').html(tem);
                        render();
                    }
                })
            },
            error: function () {
                //访问出错
                $('#load').hide();
                $('#loading').show();
            }
        });

        /*渲染数据*/
        function render() {
            var newData = {result: []};
            var leng = 3;
            if (Data.result.length <= 3) {
                leng = Data.result.length;
            }
            for (var i = 0; i < leng; i++) {
                // 需要加载data.result的第一条数据，并且，加载完了之后 要删除掉第一条数据。然后把剩下的数据都往前面移动一个位
                // shift:从集合中把第一个元素删除，并返回这个元素的值。
                newData.result.push(Data.result.shift());
            }
            var tem = template('product', newData);
            $('.list ul').append(tem);
            flag = false;
        }

        var flag = false;
        window.onscroll = function () {
            if (Data.result.length == 0 || flag) {
                return;
            }
            // 多余的总高度
            var height = $(".list ul").height() + $("#head").height() + $(".footer").height() - $(document.body).height();
            var disBottom = height - $(document.body).scrollTop();
            if (disBottom <50) {
                // console.log("加载数据")
                flag = true;
                render();
            }
        }
    })
}
hgl.baicaijia();
hgl.Swipe = function () {
    /*获取父容器*/
    var parentBox = document.querySelector('.nav');
    var childBox = parentBox.querySelector('ul');
    var parentWeight = parentBox.offsetWidth;
    var childWeight = childBox.offsetWidth;
    /*translateX 初始的定位 其实就是最大定位 0*/
    var maxX = 0;
    /*translateX 滑动到最下面的定位 其实就是最小定位 父容器宽度-子容器宽度*/
    var minX = parentWeight - childWeight;
    /*自己定义缓冲的距离*/
    var distance = 50;
    /*translateY 最大滑动定位*/
    var maxSwipe = maxX + 50;
    /*translateY 最小滑动定位*/
    var minSwipe = minX - 50;

    /*第一步  1.菜单滑动起来*/
    var starX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    var currX = 0;
    /*记录当前的定位 全局  相当于轮播图当中的index*/

    /*定义公用的方法*/
    var addTransition = function () {
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    }
    var removeTransition = function () {
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    }
    var setTranslateX = function (x) {
        childBox.style.webkitTransform = "translateX(" + x + "px)";
        childBox.style.transform = "translateX(" + x + "px)";
    }
    /*绑定事件*/
    childBox.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });
    childBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /*清除过度*/
        removeTransition();
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if ((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe) {
            setTranslateX(currX + distanceX);
        }

    });
    window.addEventListener('touchend', function (e) {
        /*第二步 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去*/
        /*当往下滑的时候 大于 最大定位*/
        if (( currX + distanceX) > maxX) {
            currX = maxX;
            addTransition();
            setTranslateX(currX);
        }
        /*当往上滑的时候 小于 最小定位*/
        else if (( currX + distanceX) < minX) {
            currX = minX;
            addTransition();
            setTranslateX(currX);
        }
        else {
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currX = currX + distanceX;
        }

        /*重置所有的参数  不重置currY */
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = 0;
    });
    /*绑定tap*/
    /*所有的li*/
    var lis = childBox.querySelectorAll('li');
    lis[0].className = 'active';
    hgl.tap(childBox, function (e) {
        /*找到事件触发源 然后找到点击的那个li元素*/
        //console.log(e.target.parentNode);
        var li = e.target.parentNode;
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = " ";
            /*设置索引*/
            lis[i].index = i;
        }
        /*4.点击菜单的时候  改变当前的样式*/
        li.className = "active";
        /*
         * 5.点击菜单的时候  定位到当前的那个菜单到最顶部
         * 如果不满足定位区间就不做定位
         * */
        var w = 0;
        for (var i = 0; i < li.index; i++) {
            w += parseInt(window.getComputedStyle(lis[i]).width);
        }
        /*需要知道  将要定位的位子*/
        var translateX = -w;
        /*通过索引来计算*/
        /*判断当前的定位要大于  定位区间的  最小定位*/
        if (translateX > minX) {
            currX = translateX;
            addTransition();
            setTranslateX(currX);
        }
        else {
            currX = minX;
            addTransition();
            setTranslateX(currX);
        }
    });

};
/*封装tap*/
hgl.tap = function (dom, callback) {
    /*
     * 要求  没有触发 touchmove 事件
     *       并且响应速度要比click快
     */
    if (dom && typeof  dom == 'object') {
        var isMove = false;
        var startTime = 0;
        dom.addEventListener('touchstart', function (e) {
            //console.log('touchstart');
            //console.time('tap');/*记录tap这个参数现在的时间*/
            startTime = Date.now();
        });
        dom.addEventListener('touchmove', function (e) {
            //console.log('touchmove');
            isMove = true;
        });
        dom.addEventListener('touchend', function (e) {
            //console.log('touchend');
            //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
            /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
            if (!isMove && (Date.now() - startTime) < 150) {
                /*调用 callback*/
                callback && callback(e);
            }
            /*重置 参数*/
            isMove = false;
            startTime = 0;
        });
    }
}