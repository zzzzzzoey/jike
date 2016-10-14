/*
建立一个hover实例，
用于执行右侧hover效果的程序
 */

var hover = {};

hover.showRight = function() {
    $(".more-select").show();
}

hover.hideRight = function() {
    $(this).hide();
}
/*
建立一个置顶效果实例，
用于执行鼠标滚轮位置返回顶部的效果程序
 */
var scroll = {};

scroll.toggleTop = function() {
    if ($(window).scrollTop() > 0) {
        $(".to-top").show();
    } else {
        $('.to-top').hide();
    };
}

scroll.animateTop = function() {
    $('html,body').animate({
        scrollTop: "0px"
    }, 800);
}
/*
建立登录和登出实例，
用于执行账户登录和登出及其相关操作的程序
 */
var log = {
    inX: ($(document).width() - $(".login").width()) / 2, //login框的x轴
    inY: ($(document).height() - $(".login").height()) / 2, //login框的y轴
    outX: ($(document).width() - $(".logout").width()) / 2, //logout框的x轴
    outY: ($(document).height() - $(".logout").height()) / 2, //logout框的y轴
    footerTop: $('.footer-box').offset().top
}

var drag = {
    flag: false, //拖拽标志
    mouseX: 0,
    mouseY: 0,
    loginX: log.inX,
    loginY: log.inY,
    deltaX: 0,
    deltaY: 0
}; //记录拖拽前的数据

log.init = function() {
    if (localStorage.logFlag == 1) {
        $(".top-nav.user").show();
        $('.top-left').show();
        $("#login").hide();
        localStorage.loginFlag = 1;
        //console.log($(".top-nav.user"));
    } else {
        $(".top-nav.user").hide();
        $('.top-left').hide();
        $("#login").show();
        $('.channel-wrap').hide();
        localStorage.loginFlag = 0;
    }
}

log.inShow = function() {
    $('.login-box').show();
    log.inX = ($(document).width() - $(".login").width()) / 2;
    log.inY = ($(document).height() - $(".login").height()) / 2;
    $('.login').offset({ //设定弹框位置
        left: log.inX,
        top: log.inY
    });
}

log.inHide = function() {
    $('.login-box').hide(); //隐藏login框
    drag = { //初始化拖拽数据
        mouseX: 0,
        mouseY: 0,
        loginX: log.inX,
        loginY: log.inY,
        deltaX: 0,
        deltaY: 0
    };
}

log.drag = function(e) {
    drag.flag = true; //可拖拽标志
    drag.mouseX = e.pageX; //记录当前准备拖拽的位置数据
    drag.mouseY = e.pageY;
    drag.loginX = log.inX;
    drag.loginY = log.inY;
}

log.cancelDrag = function() {
    drag.flag = false; //取消拖拽
}

log.move = function(e) {
    if (drag.flag == true) { //触发拖拽
        drag.deltaX = e.pageX - drag.mouseX;
        drag.deltaY = e.pageY - drag.mouseY;
        log.inX = drag.loginX + drag.deltaX; //计算拖拽位置坐标
        log.inY = drag.loginY + drag.deltaY;
        $('.login').offset({ //设置位置
            left: log.inX,
            top: log.inY
        });
    };
}

log.in = function() {
    var userName = $('#user').val();
    var password = $('#password').val();
    var errorMessage = $('#info-error');
    if (userName == "") { //提示填用户名
        errorMessage.html('请您填写手机/邮箱/用户名');
    } else if (password == '') { //提示填蜜吗
        errorMessage.html('请您填写密码');
    } else if (userName == "admin" && password == "admin") { //模拟登录成功
        errorMessage.empty();
        $('.login-box').hide();
        localStorage.loginFlag = 1;
        //console.log(localStorage.loginFlag);
        /*
        初始化设定
         */
        if ($('#auto-login').is(":checked")) {
            localStorage.logFlag = 1;
        } else {
            localStorage.logFlag = 0;
        }
        $(".top-nav.user").show();
        $('.top-left').show();
        $("#login").hide();
        if (localStorage.showChannel == 1) {
            $('.channel-wrap').show();
            $('.footer-box').offset({
                top: 100 + $('.channel-wrap').offset().top + $('.channel-wrap').height()
            });
            $('#channel-show').hide();
        } else {
            $('.channel-wrap').hide();
            $('#channel-show').show();
        };
    } else { //输入错误
        errorMessage.html('您输入的帐号不存在或密码错误，请您重新输入');
    };
}

log.userReinput = function() {
    $('#user').val('');
}

log.outShow = function() {
    $('.logout-box').show();
    log.outX = ($(document).width() - $(".logout").width()) / 2;
    log.outY = ($(document).height() - $(".logout").height()) / 2;
    $('.logout').offset({ //设定弹框位置
        left: log.outX,
        top: log.outY
    });
}

log.outHide = function() {
    $('.logout-box').hide();
}

log.switchAccount = function() {
    log.outHide();
    drag = { //初始化拖拽数据
        mouseX: 0,
        mouseY: 0,
        loginX: ($(document).width() - $(".login").width()) / 2,
        loginY: ($(document).height() - $(".login").height()) / 2,
        deltaX: 0,
        deltaY: 0
    };
    log.inShow();
}

log.outConfirm = function() {
    localStorage.logFlag = 0;
    localStorage.loginFlag = 0;
    log.init();
    log.outHide();
    $('.footer-box').offset({
        top: log.footerTop
    });
}
/*
建立一个查询天气的实例，
用于执行天气查询及其相关操作
 */
var weather = {
    info: {},
    today: new Date(),
    date: [$('#today'), $('#tomorrow'), $('#twoDays-later'), $('#threeDays-later'), $('#fourDays-later')],
    hideFlag: true,
    sinaUrl: 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',
    cityUrl: "http://wthrcdn.etouch.cn/weather_mini?city=",
}

weather.todayStr = (weather.today.getMonth() + 1) + "月";
weather.todayStr += weather.today.getDate() + "日";

weather.getCity = function() {
    $('#mycity').val(remote_ip_info.city);
    if (localStorage.citySetFlag != 1) {
        localStorage.theCity = remote_ip_info.city;
    }
}

weather.infoFormat = function(msg) {
    weather.info = jQuery.parseJSON(msg).data;
    $('#weather-info').html(weather.info.city + "  温度：" + weather.info.wendu + "    空气质量：" + weather.info.aqi);
}

weather.infoLayout = function() {
    weather.date[0].html('今天(' + weather.info.forecast[0].date + ')');
    weather.date[1].html('明天(' + weather.info.forecast[1].date + ')');
    weather.date[2].html('后天(' + weather.info.forecast[2].date + ')');
    weather.date[3].html(weather.info.forecast[3].date);
    weather.date[4].html(weather.info.forecast[4].date);
    for (var i = 0; i < 5; i++) {
        $('#temperture' + i).html(weather.info.forecast[i].low + '~<br>' + weather.info.forecast[i].high);
        $('#type' + i).html(weather.info.forecast[i].type);
        $('#wind-level' + i).html('风力：' + weather.info.forecast[i].fengli);
    }
}

weather.init = function() {
    $.getScript(weather.sinaUrl, function(_result) {
        if (remote_ip_info.ret == '1') {
            weather.getCity();
            $.ajax({
                type: "GET",
                // url: "http://wthrcdn.etouch.cn/weather_mini?city=" + '南京',
                url: weather.cityUrl + localStorage.theCity,
                data: "",
                success: function(msg) {
                    weather.infoFormat(msg);
                }
            });
        }
    });
}

weather.show = function() {
    $('.weather-setting').hide();
    $('.weather-forecast>.title').show();
    $('.weather-body').show();
    weather.hideFlag = true;
}

weather.getInfo = function() {
    $('.weather-forecast').show();
    weather.show();
    $.getScript(weather.sinaUrl, function(_result) {
        weather.getCity();
        if (remote_ip_info.ret == '1') {
            $.ajax({
                type: "GET",
                // url: "http://wthrcdn.etouch.cn/weather_mini?city=" + '南京',
                url: weather.cityUrl + localStorage.theCity,
                data: "",
                success: function(msg) { //获取详细信息
                    weather.infoFormat(msg);
                    weather.infoLayout();
                }
            });
        }
        //console.log(theCity);
    });
}

weather.hideInfo = function() {
    if (weather.hideFlag) {
        $(this).hide();
    }
}

weather.settingArea = function() {
    $('.weather-setting').show();
    $('.weather-forecast>.title').hide();
    $('.weather-body').hide();
    weather.hideFlag = false;
}

weather.saveSetting = function() {
    localStorage.citySetFlag = 1;
    localStorage.theCity = $('#area-setting').val();
    weather.show();
    $.getScript(weather.sinaUrl, function(_result) {
        $('#mycity').val(remote_ip_info.city);
        if (remote_ip_info.ret == '1') {
            $.ajax({
                type: "GET",
                // url: "http://wthrcdn.etouch.cn/weather_mini?city=" + '南京',
                url: weather.cityUrl + localStorage.theCity,
                data: "",
                success: function(msg) {
                    weather.infoFormat(msg);
                    weather.infoLayout();
                }
            });
        }
    })
}
/*
建立一个频道实例，
用于执行频道相关操作
 */
var channel = {
    footerTop: $('.footer-box').offset().top,
    left: [],
    _left: JSON.parse(localStorage.getItem('channelLeft')),
    title: ["我的关注", '导航', '推荐', '音乐', '体育', '视频', '购物', '小说'],
}

channel.run = function(para) {
    // console.log(this);
    return channel[para].call(this);
}

channel.init = function() {
    if (localStorage.loginFlag == 1) {
        if (localStorage.showChannel == 1) {
            $('.channel-wrap').show();
            $('.footer-box').offset({
                top: 100 + $('.channel-wrap').offset().top + $('.channel-wrap').height()
            });
            $('#channel-show').hide();
        } else {
            $('.channel-wrap').hide();
            $('#channel-show').show();
        };

    };
    if (channel._left != null) {
        var i = 0;
        while (channel._left[i] != null) {
            var span = $('<span>').appendTo('.titles');
            span.html(channel._left[i]);
            $('.mode-item-right').each(function(index, value) {
                if ($(value).children('.mode-title').html() == channel._left[i]) {
                    $(this).removeClass('mode-item-right').addClass('mode-item-left').appendTo('.my-list');
                }
            })
            i++;
        }
    }
}

channel.show = function() {
    $('.channel-wrap').show();
    localStorage.showChannel = 1;
    $('.footer-box').offset({
        top: 100 + $('.channel-wrap').offset().top + $('.channel-wrap').height()
    });
    $(this).hide();
}

channel.set = function() {
    $('.slide-menu-box').slideToggle(300);
    $('.titles>span').remove();
    $('.channel-body .channel-focus').removeClass('channel-focus');
    $('.my-watchlist').addClass('focus');
    $('#channel0').addClass('channel-focus');
    var i = 0;
    $('.mode-item-left').each(function(index, value) { //显示要显示的东西
        var span = $('<span>').appendTo('.titles');
        channel.left[i] = $(value).children('.mode-title').html();
        span.html(channel.left[i]);
        i++;
        //console.log($(value).children('.mode-title').html());
    });
    while (i < 7) {
        channel.left[i] = null;
        i++;
    }
    localStorage.setItem('channelLeft', JSON.stringify(channel.left));
    channel._left = JSON.parse(localStorage.getItem('channelLeft'));
}

channel.hide = function() {
    $('.channel-wrap').hide();
    localStorage.showChannel = 0;
    $('.footer-box').offset({
        top: channel.footerTop
    });
    $('#channel-show').show();
    $('.slide-menu-box').hide();
    $('.titles>span').remove();
    $('.channel-body .channel-focus').removeClass('channel-focus');
    $('.my-watchlist').addClass('focus');
    $('#channel0').addClass('channel-focus');
    var i = 0;
    $('.mode-item-left').each(function(index, value) { //显示要显示的东西
        var span = $('<span>').appendTo('.titles');
        channel.left[i] = $(value).children('.mode-title').html();
        span.html(channel.left[i]);
        i++;
        //console.log($(value).children('.mode-title').html());
    });
    while (i < 7) {
        channel.left[i] = null;
        i++;
    }
    localStorage.setItem('channelLeft', JSON.stringify(channel.left));
    channel._left = JSON.parse(localStorage.getItem('channelLeft'));
}

channel.moveLeft = function() {
    if ($(this).hasClass('mode-item-right')) { //向左移；
        $(this).removeClass('mode-item-right').addClass('mode-item-left').appendTo('.my-list');
    } else { //向右移
        $(this).removeClass('mode-item-left').addClass('mode-item-right').appendTo('.unsubscribed');
    }
}

channel.moveRight = function() {
    if ($(this).hasClass('mode-item-left')) { //向右移；
        $(this).removeClass('mode-item-left').addClass('mode-item-right').appendTo('.unsubscribed');
    } else { //向右移
        $(this).removeClass('mode-item-right').addClass('mode-item-left').appendTo('.my-list');
    }
}

channel.tab = function() {
    var thisTarget = $(this);
    $('.channel-title .focus').removeClass('focus');
    $('.channel-body .channel-focus').removeClass('channel-focus');
    thisTarget.addClass('focus');
    $.each(channel.title, function(index, value) {
        if (value == thisTarget.html()) {
            $('#channel' + index).addClass('channel-focus');
        }
    })
}
/*
建立换肤实例，
用于执行换肤操作
 */
var skin = {
    skin: $("#skin"),
    colorpick: $("#colorpick"),
    colorSubmit: $("#color-submit"),
    colorCancel: $("#color-cancel"),
    color: $("#color"),
}

skin.init = function() {
    $('#container').css('background-color', "#FFFFFF"); //默认值
    $('body').css('background-color', "#FFFFFF")
        //console.log($('body').css('background-color'));
    if (typeof(localStorage.color) == "undefined") { //强迫症用的，可以无视
        skin.color.val("#FFFFFF");
    } else {
        skin.color.val(localStorage.color);
        $('#container').css('background-color', localStorage.color);
        $('body').css('background-color', localStorage.color);
    }
}

skin.togglePlay = function() {
    skin.colorpick.toggle();
}

skin.submitChange = function() {
    localStorage.color = skin.color.val();
    $('#container').css('background-color', localStorage.color);
    $('body').css('background-color', localStorage.color);
    skin.colorpick.hide();
}

skin.cancelChange = function() {
    skin.colorpick.hide();
    skin.color.val(localStorage.color);
}

