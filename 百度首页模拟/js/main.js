$(".more-container").mouseenter(function() {
    hover.showRight();
});

$(".more-select").mouseleave(function() {
    hover.hideRight.call(this);
});

$(window).scroll(function() { //鼠标滚轮事件
    scroll.toggleTop();
});

$('.to-top').on('click', function() {
    scroll.animateTop();
})

log.init();

$("#login").on('click', function() { //login点击弹出登录框
    log.inShow();
});

$('#login-close').on('click', function() { //关掉login登陆框
    log.inHide();
});

$('.login-title').on('mousedown', function(e) {
    log.drag(e);
});

$('.login-title').on('mousemove', function(e) { //拖拽函数
    log.move(e);
});

$('.login-title').on('mouseup', function() {
    log.cancelDrag(); //取消拖拽
});
$('.login-title').on('mouseleave', function() {
    log.cancelDrag(); //取消拖拽
});

$('#login-btn').on('click', function() { //登录
    log.in();
})

$('.user-cancel').on('click', function() {
    log.userReinput();
})

$('#logout').on('click', function() { //退出
    log.outShow();
})

$('.logout-close').on('click', function() { //关闭退出框
    log.outHide();
})

$('.switch-accunt').on('click', function() { //切换账号，重新登录
    log.switchAccount();
})

$('#logout-confirm').on('click', function() { //退出账户，初始化退出状态
    log.outConfirm();
})

$('#logout-close').on('click', function() { //关闭退出框
    log.outHide();
})

$('#today-date').html(weather.todayStr);

weather.init();

$('.weather-wrap').mouseenter(function() {
    weather.getInfo();
});

$('.weather-forecast').mouseleave(function() {
    weather.hideInfo.call(this);
})

$('.area-setting').on('click', function() {
    weather.settingArea();
});

$('#weather-save').on('click', function() {
    weather.saveSetting();
})

$('#weather-cancel').on('click', function() {
    weather.show();
})

channel.init();
$('#channel-show').on('click', function() { //显示channel频道
    channel.show.call(this);
});

$('.channel-set').on('click', function() { //下拉channel设置
    channel.set();
});

$('#channel-hide').on('click', function() { //隐藏channel频道
    channel.hide();
});

$(".mode-item-right").on('click', function() { //设置移动channel频道
    channel.moveLeft.call(this);
    // console.log(target);
    //    channel.run('moveLeft').call(target);
});
$(".mode-item-left").on('click', function() { //设置移动channel频道
    channel.moveRight.call(this);
});

$(document).on('click', ".channel-title span", function() { //标签切换
    channel.tab.call(this);
})

skin.init();

skin.skin.on("click", function() { //加载换肤界面
    skin.togglePlay();
})

skin.colorSubmit.on("click", function() { //确定修改颜色
    skin.submitChange();
})

skin.colorCancel.on("click", function() { //取消修改颜色
    skin.cancelChange();
})
