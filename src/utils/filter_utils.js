import Vue from 'vue'

Vue.filter("formatDate", formatDate);
Vue.prototype.formatDate = formatDate;
Vue.filter("simpleFormatTime", simpleFormatTime);
Vue.filter('commafy',commafy);
Vue.prototype.simpleFormatTime = simpleFormatTime;
Vue.prototype.commafy = commafy;


function formatDate(value) {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}


Vue.filter("formatDateTime", function formatDateTime(value) {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
});


function formatTime(timeValue) {
  var date = new Date(timeValue);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};


//时间戳转换日期 (yyyy-MM-dd HH:mm:ss)
//判断传入日期是否属于今年
function isYear(timeValue) {
  var takeNewYear = formatTime(new Date()).substr(0, 4); //当前时间的年份
  var takeTimeValue = formatTime(timeValue).substr(0, 4); //传入时间的年份
  return takeTimeValue == takeNewYear;
}

//判断传入日期是否为昨天
function isYestday(timeValue) {
  var date = (new Date()); //当前时间
  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
  var yestday = new Date(today - 24 * 3600 * 1000).getTime();
  return timeValue < today && yestday <= timeValue;
};

//判断是否为7天内
function is7day(timeValue) {
  let date = (new Date()); //当前时间
  let today = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); //今天凌晨
  let day7 = new Date(today - 24 * 3600 * 1000).getTime();
  return timeValue < today && yestday <= timeValue;
};

function simpleFormatTime(timeStamp) {
  var dateTime = new Date(timeStamp);
  var no1new = dateTime.valueOf();
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = now.valueOf();
  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - no1new;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    timeSpanStr = year + '-' + month + '-' + day
  } else {
    // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    timeSpanStr = year + '-' + month + '-' + day
  }

  return timeSpanStr;
}

 function commafy(num) {
  if ((num + "").trim() == "") {
          return "";
        }
        if (isNaN(num)) {
          return "";
        }
       let re = /(-?\d+)(\d{3})/
        num = num + "";
        if (/^.*\..*$/.test(num)) {//如果有小数部分
          let pointIndex = num.lastIndexOf(".");
          let intPart = num.substring(0, pointIndex);//小数部分

          let pointPart = num.substring(pointIndex + 1, num.length);//整数部分
          intPart = intPart + "";

          while (re.test(intPart)) {
            intPart = intPart.replace(re, "$1,$2")
          }
          num = intPart + "." + pointPart;
        } else {//无小数部分
          num = num + "";

          while (re.test(num)) {
            num = num.replace(re, "$1,$2")
          }
        }
        return num;
  };

