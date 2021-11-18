let container = new Vue({
    el: "#container",
    data: {
        fontArr: ['白'],//主题名字
        imgArr1: ['./pictures/white1.png'],//背景图片
        imgArr2: ['./pictures/white.gif'],//春夏秋冬顶部导航图片
        fontColors: ['rgb(0,0,0)'],//春夏秋冬字体颜色
        btnColors: ['rgb(0,0,0)'],//切换的按钮的颜色
        index: 0,
    },
})
var treeCanvas = document.getElementById("tree");
treeCanvas.width = window.innerWidth;
treeCanvas.height = window.innerHeight;
var tCxt = treeCanvas.getContext("2d");
var rootTop = 750;//树起始位置
var treeColor2 = "#45340b";//树颜色
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function baiYuLan(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.25 : -0.25;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 0.8;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.3;//以步长来判断枝干长度 Y轴压缩一些

    tCxt.beginPath();
    tCxt.lineWidth = step / 2.2;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#45340b";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#45340b";
        tCxt.arc(x, y, step / 4.5, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 20) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 4 + Math.random() * 3
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.9), "#ccc5bc");
        my_gradient.addColorStop(randomNum(0.2, 0.4), "#ffffff");
        my_gradient.addColorStop(randomNum(0, 0.8), "#d0cabc");
        my_gradient.addColorStop(randomNum(0, 0.8), "#aeab96");
        tCxt.fillStyle = my_gradient;
        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }

    step--;
    if (step > 0) {
        baiYuLan(x1, y1, deg, step);
        if (step % 4 == 1 && step > 0 && step < 27)
            baiYuLan(x1, y1, deg + 0.6 + 0.3 * Math.random(), Math.round(step / 1.1));//右分叉
        if (step % 4 == 0 && step > 0 && step < 25)
            baiYuLan(x1, y1, deg - 0.6 - 0.3 * Math.random(), Math.round(step / 1.1));//左分叉
    }
}
function meiHua(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.25 : -0.25;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 0.8;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.2;//以步长来判断枝干长度 Y轴压缩一些
    tCxt.beginPath();
    tCxt.lineWidth = step / 3;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#45340b";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#45340b";
        tCxt.arc(x, y, step / 6, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 11) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 2 + Math.random() * 2
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.1), "#e18893");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#b6181e");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#de364e");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#79181e");
        my_gradient.addColorStop(randomNum(0.3, 0.6), "#ffbbc8");
        tCxt.fillStyle = my_gradient;
        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }
    step--;
    if (step > 3) {
        meiHua(x1, y1, deg, step);
        if (step % 3 == 1 && step > 0 && step < 30)
            meiHua(x1, y1, deg + 0.1 + 1.5 * Math.random(), Math.round(step / 1.27));//右分叉
        if (step % 3 == 0 && step > 0 && step < 30)
            meiHua(x1, y1, deg - 0.1 - 1.4 * Math.random(), Math.round(step / 1.27));//左分叉
    }
}
function xiaoShu(x, y, deg, step) {
    var x1 = x + Math.cos(deg) * step;//越细的枝干越短，所以以步长来做
    var y1 = y + Math.sin(deg) * step;
    tCxt.beginPath();
    tCxt.lineWidth = step / 3;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#45340b";
    tCxt.stroke();

    if (step < 3) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 2 + Math.random() * 2
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.1), "#dac60f");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#fdf801");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#e0d717");
        my_gradient.addColorStop(randomNum(0.3, 0.6), "#8f9402");

        tCxt.fillStyle = my_gradient;
        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }
    step--;
    if (step > 0) {
        xiaoShu(x1, y1, deg, step);
        if (step % 3 == 1 && step > 0 && step < 30)
            xiaoShu(x1, y1, deg + 0.2 + 0.3 * Math.random(), Math.round(step / 1.13));//右分叉
        if (step % 3 == 0 && step > 0 && step < 30)
            xiaoShu(x1, y1, deg - 0.2 - 0.3 * Math.random(), Math.round(step / 1.13));//左分叉
    }
}
function lanHuaYing(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.25 : -0.25;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 0.8;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.3;//以步长来判断枝干长度 Y轴压缩一些

    tCxt.beginPath();
    tCxt.lineWidth = step / 1.6;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#45340b";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#45340b";
        tCxt.arc(x, y, step / 3, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 20) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 4 + Math.random() * 3
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.9), "#634aa5");
        my_gradient.addColorStop(randomNum(0.2, 0.4), "#b69ad6");
        my_gradient.addColorStop(randomNum(0, 0.8), "#9c6dd4");
        my_gradient.addColorStop(randomNum(0, 0.8), "#5c328d");


        tCxt.fillStyle = my_gradient;

        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }



    step--;
    if (step > 0) {
        lanHuaYing(x1, y1, deg, step);
        if (step % 4 == 1 && step > 0 && step < 27)
            lanHuaYing(x1, y1, deg + 0.6 + 0.3 * Math.random(), Math.round(step / 1.1));//右分叉
        if (step % 4 == 0 && step > 0 && step < 25)
            lanHuaYing(x1, y1, deg - 0.6 - 0.3 * Math.random(), Math.round(step / 1.1));//左分叉
    }
}
function lvMei(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.25 : -0.25;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 0.8;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.2;//以步长来判断枝干长度 Y轴压缩一些
    tCxt.beginPath();
    tCxt.lineWidth = step / 3;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#2f382f";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#2f382f";
        tCxt.arc(x, y, step / 6, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 11) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 2 + Math.random() * 2
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.1), "#b1c096");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#acb579");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#87ab46");
        my_gradient.addColorStop(randomNum(0.1, 0.3), "#f2f6f0");
        my_gradient.addColorStop(randomNum(0.3, 0.6), "#e0e59e");
        tCxt.fillStyle = my_gradient;
        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }
    step--;
    if (step > 3) {
        lvMei(x1, y1, deg, step);
        if (step % 3 == 1 && step > 0 && step < 30)
            lvMei(x1, y1, deg + 0.1 + 1.5 * Math.random(), Math.round(step / 1.27));//右分叉
        if (step % 3 == 0 && step > 0 && step < 30)
            lvMei(x1, y1, deg - 0.1 - 1.4 * Math.random(), Math.round(step / 1.27));//左分叉
    }
}
function hongYe(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.05 : -0.05;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 1.0;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.8;//以步长来判断枝干长度 Y轴压缩一些

    tCxt.beginPath();
    tCxt.lineWidth = step / 0.8;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#45340b";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#45340b";
        tCxt.arc(x, y, step / 1.6, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 20) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 5 + Math.random() * 5
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.9), "#e9924e");
        my_gradient.addColorStop(randomNum(0.2, 0.4), "#66210a");
        my_gradient.addColorStop(randomNum(0, 0.8), "#e55c39");
        my_gradient.addColorStop(randomNum(0, 0.8), "#d81101");


        tCxt.fillStyle = my_gradient;

        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }
    step--;
    if (step > 0) {
        hongYe(x1, y1, deg, step);
        if (step % 4 == 1 && step > 0 && step < 27)
            hongYe(x1, y1, deg + 0.2 + 0.7 * Math.random(), Math.round(step / 1.1));//右分叉
        if (step % 4 == 0 && step > 0 && step < 25)
            hongYe(x1, y1, deg - 0.2 - 0.7 * Math.random(), Math.round(step / 1.1));//左分叉
    }
}
function caiHongAn(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.05 : -0.05;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 1.0;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.8;//以步长来判断枝干长度 Y轴压缩一些

    tCxt.beginPath();
    tCxt.lineWidth = step / 0.8;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    var my_gradient2 = tCxt.createLinearGradient(0, 0, 0, 170);
    my_gradient2.addColorStop(randomNum(0, 0.9), "#7b1d04");
    my_gradient2.addColorStop(randomNum(0.2, 0.4), "#3a6d03");
    my_gradient2.addColorStop(randomNum(0, 0.8), "#212b12");
    my_gradient2.addColorStop(randomNum(0, 0.8), "#59431b");
    tCxt.strokeStyle = my_gradient2;
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        var my_gradient3 = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient3.addColorStop(randomNum(0, 0.9), "#7b1d04");
        my_gradient3.addColorStop(randomNum(0.2, 0.4), "#3a6d03");
        my_gradient3.addColorStop(randomNum(0, 0.8), "#212b12");
        my_gradient3.addColorStop(randomNum(0, 0.8), "#59431b");

        tCxt.arc(x, y, step / 1.6, 0, Math.PI * 2);
        tCxt.strokeStyle = my_gradient3;
        tCxt.fill();
    }
    if (step < 20) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 3 + Math.random() * 3
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.9), "#5b8b52");
        my_gradient.addColorStop(randomNum(0.2, 0.4), "#528745");
        my_gradient.addColorStop(randomNum(0, 0.8), "#699b48");
        my_gradient.addColorStop(randomNum(0, 0.8), "#4bad31");


        tCxt.fillStyle = my_gradient;

        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }



    step--;
    if (step > 0) {
        caiHongAn(x1, y1, deg, step);
        if (step % 4 == 1 && step > 0 && step < 27)
            caiHongAn(x1, y1, deg + 0.2 + 0.7 * Math.random(), Math.round(step / 1.1));//右分叉
        if (step % 4 == 0 && step > 0 && step < 25)
            caiHongAn(x1, y1, deg - 0.2 - 0.7 * Math.random(), Math.round(step / 1.1));//左分叉
    }
}
function taoShu(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.25 : -0.25;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 0.8;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.3;//以步长来判断枝干长度 Y轴压缩一些

    tCxt.beginPath();
    tCxt.lineWidth = step / 2.2;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#280b12";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#280b12";
        tCxt.arc(x, y, step / 4.5, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 20) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 4 + Math.random() * 3
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.9), "#efb8f1");
        my_gradient.addColorStop(randomNum(0.2, 0.4), "#ed9dd1");
        my_gradient.addColorStop(randomNum(0, 0.8), "#e73765");
        my_gradient.addColorStop(randomNum(0, 0.8), "#cd4e5d");


        tCxt.fillStyle = my_gradient;

        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }



    step--;
    if (step > 0) {
        taoShu(x1, y1, deg, step);
        if (step % 4 == 1 && step > 0 && step < 27)
            taoShu(x1, y1, deg + 0.6 + 0.3 * Math.random(), Math.round(step / 1.1));//右分叉
        if (step % 4 == 0 && step > 0 && step < 25)
            taoShu(x1, y1, deg - 0.6 - 0.3 * Math.random(), Math.round(step / 1.1));//左分叉
    }
}
function yinXin(x, y, deg, step) {
    var deg1 = step % 2 == 0 ? 0.25 : -0.25;
    var x1 = x + Math.cos(deg + deg1) * (step + 4) * 0.8;//以步长来判断枝干长度 x轴偏移大一些
    var y1 = y + Math.sin(deg + deg1) * (step - 1) * 1.3;//以步长来判断枝干长度 Y轴压缩一些

    tCxt.beginPath();
    tCxt.lineWidth = step / 2.2;//树干越来越细
    tCxt.moveTo(x, y);
    tCxt.lineTo(x1, y1);
    tCxt.strokeStyle = "#39160d";
    tCxt.stroke();
    if (step > 20) {//树干相交的位置有间隙，以一个圆填充
        tCxt.fillStyle = "#39160d";
        tCxt.arc(x, y, step / 4.5, 0, Math.PI * 2);
        tCxt.fill();
    }
    if (step < 20) {//在末端五个节点，画一个半圆，作为樱花效果
        var r = 4 + Math.random() * 3
        var my_gradient = tCxt.createLinearGradient(0, 0, 0, 170);
        my_gradient.addColorStop(randomNum(0, 0.9), "#d49a1b");
        my_gradient.addColorStop(randomNum(0.2, 0.4), "#fada40");
        my_gradient.addColorStop(randomNum(0, 0.8), "#bb6314");
        my_gradient.addColorStop(randomNum(0, 0.8), "#b45a00");


        tCxt.fillStyle = my_gradient;

        tCxt.arc(x1 + Math.random() * 3, y1 + Math.random() * 3, r, 0, Math.PI)
        tCxt.fill();
    }



    step--;
    if (step > 0) {
        yinXin(x1, y1, deg, step);
        if (step % 4 == 1 && step > 0 && step < 27)
            yinXin(x1, y1, deg + 0.6 + 0.3 * Math.random(), Math.round(step / 1.1));//右分叉
        if (step % 4 == 0 && step > 0 && step < 25)
            yinXin(x1, y1, deg - 0.6 - 0.3 * Math.random(), Math.round(step / 1.1));//左分叉
    }
}
yinXin(treeCanvas.width / 1.5, rootTop, -Math.PI / 2, 30); (treeCanvas.width / 2.9, rootTop, -Math.PI / 2, 30);
taoShu(treeCanvas.width / 2.9, rootTop, -Math.PI / 2, 30);
caiHongAn(treeCanvas.width / 1, rootTop, -Math.PI / 2, 30);
hongYe(treeCanvas.width / 130, rootTop, -Math.PI / 2, 30);
lvMei(treeCanvas.width / 1.05, rootTop, -Math.PI / 2, 23);
lanHuaYing(treeCanvas.width / 1.2, rootTop, -Math.PI / 2, 30);
xiaoShu(treeCanvas.width / 2, rootTop, -Math.PI / 2, 30);
baiYuLan(treeCanvas.width / 6, rootTop, -Math.PI / 1.98, 30);
meiHua(treeCanvas.width / 15, rootTop, -Math.PI / 2, 23);
