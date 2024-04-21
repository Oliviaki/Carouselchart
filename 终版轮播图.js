window.addEventListener('load', function () {
    /* 显示隐藏箭头按钮 */
    let outer = document.querySelector('.outer');
    outer.addEventListener('mouseenter', function () {
        outer.children[0].style.display = 'block';
        outer.children[2].style.display = 'block';
        //关闭定时器
        clearInterval(timer);
        timer = null;
    });
    outer.addEventListener('mouseleave', function () {
        outer.children[0].style.display = 'none';
        outer.children[2].style.display = 'none';
        //开始定时器
        timer = setInterval(function () {
            outer.children[2].click();
        }, 2000);
    });
    let num = 0;
    let circle = 0;
    /* 动态生成底部小圆圈，并绑定点击事件小圆圈排他思想 */
    let numberOfImages = outer.children[1].children[0].children.length;
    outer.children[3].style.width = 20 * numberOfImages + 'px';
    outer.children[1].style.width = 604 * (numberOfImages + 1) + 'px';
    for (i = 0; i < numberOfImages; i++) {
        let li = document.createElement('li');
        /* 增加小圆圈自定义属性 */
        li.setAttribute('data-index', i);
        outer.children[3].children[0].appendChild(li);
        /* 绑定点击事件小圆圈排他思想 */
        li.addEventListener('click', function () {
            for (i = 0; i < numberOfImages; i++) {
                outer.children[3].children[0].children[i].className = '';
            }
            this.className = 'current';
            /*  点击小圆圈移动inner */
            let index = this.getAttribute('data-index');
            num = circle = index;
            animate(outer.children[1], index * (-604));
        });
    }
    outer.children[3].children[0].children[0].className = 'current';
    /* 克隆第一张图片放到ul最后面 */
    let firstLi = outer.children[1].children[0].children[0].cloneNode(true);
    outer.children[1].children[0].appendChild(firstLi);
    /* 右侧按钮点击事件 */
    let flag = true;
    outer.children[2].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == numberOfImages) {
                outer.children[1].style.left = 0;
                num = 0;
            }
            num++;
            animate(outer.children[1], -num * 604, function () {
                flag = true;
            });
            /* 让小圆圈跟着箭头动 */
            circle++;
            /* circle %= 5; 取余也可实现循环队列 */
            if (circle == numberOfImages) {
                circle = 0;
            }
            circleChange();
        }
    });
    /* 左侧按钮点击事件 */
    outer.children[0].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                outer.children[1].style.left = -numberOfImages * 604 + 'px';
                num = numberOfImages;
            }
            num--;
            animate(outer.children[1], -num * 604, function () {
                flag = true;
            });
            /* 让小圆圈跟着箭头动 */
            circle--;
            /* circle %= 5; 取余也可实现循环队列 */
            // if (circle < 0) {
            //     circle = numberOfImages - 1;
            // }
            circle = circle < 0 ? numberOfImages - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        for (i = 0; i < numberOfImages; i++) {
            outer.children[3].children[0].children[i].className = '';
        }
        outer.children[3].children[0].children[circle].className = 'current';
    }
    //自动调用右侧按钮点击事件
    let timer = setInterval(function () {
        outer.children[2].click();
    }, 2000);
});