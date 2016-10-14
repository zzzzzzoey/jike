(function() {
    /*
这里是参照别人的获取天气信息的模版改的
 */

    var weatherInfo;
    var today = new Date();
    var todayStr = (today.getMonth() + 1) + "月";
    todayStr += today.getDate() + "日";
    $('#today-date').html(todayStr);
    var theDate = [$('#today'), $('#tomorrow'), $('#twoDays-later'), $('#threeDays-later'), $('#fourDays-later')];
    // var theCity = '';
    var hideFlag = true;
    /*
    初始化
     */
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {
            $('#mycity').val(remote_ip_info.city);
            if (localStorage.citySetFlag != 1) {
                localStorage.theCity = remote_ip_info.city;
                //theCity = $('#area-setting').val();
            }
            $.ajax({
                type: "GET",
                // url: "http://wthrcdn.etouch.cn/weather_mini?city=" + '南京',
                url: "http://wthrcdn.etouch.cn/weather_mini?city=" + localStorage.theCity,
                data: "",
                success: function(msg) {
                    weatherInfo = jQuery.parseJSON(msg).data;
                    $('#weather-info').html(weatherInfo.city + "  温度：" + weatherInfo.wendu + "    空气质量：" + weatherInfo.aqi);
                }
            });
        }
    });


    /*
    鼠标指向对应位置，显示天气详细信息
     */
    $('.weather-wrap').mouseenter(function() {
        $('.weather-forecast').show();
        weatherShow();
        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
            $('#mycity').val(remote_ip_info.city);
            //console.log(localStorage.citySetFlag);
            if (localStorage.citySetFlag != 1) {
                localStorage.theCity = remote_ip_info.city;
                //theCity = $('#area-setting').val();
            }
            if (remote_ip_info.ret == '1') {
                $.ajax({
                    type: "GET",
                    // url: "http://wthrcdn.etouch.cn/weather_mini?city=" + '南京',
                    url: "http://wthrcdn.etouch.cn/weather_mini?city=" + localStorage.theCity,
                    data: "",
                    success: function(msg) { //获取详细信息
                        weatherInfo = jQuery.parseJSON(msg).data;
                        $('#weather-info').html(weatherInfo.city + "  温度：" + weatherInfo.wendu + "    空气质量：" + weatherInfo.aqi);
                        theDate[0].html('今天(' + weatherInfo.forecast[0].date + ')');
                        theDate[1].html('明天(' + weatherInfo.forecast[1].date + ')');
                        theDate[2].html('后天(' + weatherInfo.forecast[2].date + ')');
                        theDate[3].html(weatherInfo.forecast[3].date);
                        theDate[4].html(weatherInfo.forecast[4].date);
                        for (var i = 0; i < 5; i++) {
                            $('#temperture' + i).html(weatherInfo.forecast[i].low + '~<br>' + weatherInfo.forecast[i].high);
                            $('#type' + i).html(weatherInfo.forecast[i].type);
                            $('#wind-level' + i).html('风力：' + weatherInfo.forecast[i].fengli);
                        }
                        // console.log(weatherInfo);
                        // console.log(weatherInfo.forecast[0].high);
                    }
                });
            }
            //console.log(theCity);
        });
    });

    /*
    隐藏详细信息
     */
    $('.weather-forecast').mouseleave(function() {
            if (hideFlag) {
                $(this).hide();
            }
        })
        /*
        设置地区，这里只有几个城市模拟测试
         */
    $('.area-setting').on('click', function() {
        $('.weather-setting').show();
        $('.weather-forecast>.title').hide();
        $('.weather-body').hide();
        hideFlag = false;
    });


    /*
    保存设置重新获取天气信息
     */
    $('#weather-save').on('click', function() {
        localStorage.citySetFlag = 1;
        localStorage.theCity = $('#area-setting').val();
        weatherShow();
        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
            $('#mycity').val(remote_ip_info.city);
            if (remote_ip_info.ret == '1') {
                $.ajax({
                    type: "GET",
                    // url: "http://wthrcdn.etouch.cn/weather_mini?city=" + '南京',
                    url: "http://wthrcdn.etouch.cn/weather_mini?city=" + localStorage.theCity,
                    data: "",
                    success: function(msg) {
                        weatherInfo = jQuery.parseJSON(msg).data;
                        $('#weather-info').html(weatherInfo.city + "  温度：" + weatherInfo.wendu + "    空气质量：" + weatherInfo.aqi);
                        theDate[0].html('今天(' + weatherInfo.forecast[0].date + ')');
                        theDate[1].html('明天(' + weatherInfo.forecast[1].date + ')');
                        theDate[2].html('后天(' + weatherInfo.forecast[2].date + ')');
                        theDate[3].html(weatherInfo.forecast[3].date);
                        theDate[4].html(weatherInfo.forecast[4].date);
                        for (var i = 0; i < 5; i++) {
                            $('#temperture' + i).html(weatherInfo.forecast[i].low + '~<br>' + weatherInfo.forecast[i].high);
                            $('#type' + i).html(weatherInfo.forecast[i].type);
                            $('#wind-level' + i).html('风力：' + weatherInfo.forecast[i].fengli);
                        }
                    }
                });
            }
        })
    })

    /*
    取消设置
     */
    $('#weather-cancel').on('click', function() {
            weatherShow();
        })
        /*
        详细信息展现
         */
    function weatherShow() {
        $('.weather-setting').hide();
        $('.weather-forecast>.title').show();
        $('.weather-body').show();
        hideFlag = true;
    }
})()
