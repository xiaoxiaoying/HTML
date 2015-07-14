/**
 * Created by Administrator on 2015/4/12.
 */
var school = new Array(
    "浙江大学", "杭州电子科技大学", "浙江工业大学", "浙江理工大学", "浙江林学院", "浙江中医学院",
    "杭州师范学院", "浙江工商大学", "中国美术学院", "中国计量学院", "浙江科技学院", "浙江财经学院",
    "浙江传媒学院", "浙江交通职业技术学院", "浙江工商职业技术学院", "浙江机电职业技术学院", "浙江建设职业技术学院",
    "浙江艺术职业学院", "浙江经贸职业技术学院", "浙江商业职业技术学院", "浙江经济职业技术学院", "浙江旅游职业学院",
    "浙江警官职业学院", "浙江金融职业学院", "杭州职业技术学院", "浙江工业大学之江学院", "杭州电子科技大学信息工程学院",
    "浙江理工大学科技与艺术学院", "浙江中医学院滨江学院", "杭州师范学院钱江学院", "中国计量学院现代科技学院", "浙江科技学院理工学院",
    "浙江财经学院东方学院", "浙江大学城市学院", "浙江树人学院", "浙江育英职业技术学院", "浙江长征职业技术学院", "杭州万向职业技术学院",
    "浙江特殊职业教育学院", "台州学院", "其他");
$(document).ready(function () {


        //function findDimensions() { //函数：获取尺寸

        //获取窗口宽度

        if (window.innerWidth) {

            winWidth = window.innerWidth;

        }
        else if
        ((document.body) && (document.body.clientWidth)) {

            winWidth = document.body.clientWidth;

        }

        //获取窗口高度

        if (window.innerHeight) {

            winHeight = window.innerHeight;

        }

        else if ((document.body) && (document.body.clientHeight)) {

            winHeight = document.body.clientHeight;

        }

        //通过深入Document内部对body进行检测，获取窗口大小

        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {

            winHeight = document.documentElement.clientHeight;

            winWidth = document.documentElement.clientWidth;

        }

        //}
        var xy = winWidth - 40;
        document.getElementById("main").style.width = winWidth + "px";
        document.getElementById("main").style.height = winHeight + "px";

        document.getElementById("btn").style.width = xy + "px";
        document.getElementById("btn").style.height = xy / 600 * 70 + "px";
        document.getElementById("pop").style.width = winWidth + "px";
        document.getElementById("pop").style.height = winHeight + "px";

        document.getElementById("btn").style.lineHeight = xy / 600 * 70 + "px";
        document.getElementById("back").style.width = xy - 40 + "px";
        document.getElementById("back").style.height = (xy - 40) / 5 * 2 + "px";
        document.getElementById("back").style.marginTop = winHeight / 2 - (xy - 40) / 4 + "px";
        var backTop = (xy - 40) / 5 * 2 - 40;
        document.getElementById("dv").style.marginTop = backTop / 4 + "px";
        document.getElementById("txt").style.marginTop = backTop / 4 + "px";

        document.getElementById("sure").style.width = xy - 80 + "px";
        document.getElementById("sure").style.paddingTop = backTop / 4 + "px";
        document.getElementById("sure").style.paddingBottom = backTop / 4 - 10 + "px";
        $("#pop").hide();
        $("#btn").click(
            function () {


                var name = $("#name").val();
                var phone = $("#phone").val();
                var extra1 = $("#select_id").val();
                //alert("点击了 = " + extra1);
                var chineseReg = /^[\u4E00-\u9FA5]{2,4}$/;
                if (!chineseReg.test(name)) {
                    alert("请填写正确的名字！")
                    return;
                }
                var phoneNumReg = /(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/;
                if (phone.length == 0) {
                    alert("请输入手机号！")
                    return;
                }
                if (!phoneNumReg.test(phone)) {
                    alert("请重新输入手机号！")
                    return;
                }
                //alert(getUrl(name, phone, extra1));
                $.ajax(
                    {
                        url: getUrl(name, phone, extra1),
                        type: "get",
                        cache: false,
                        dataType: "jsonp",
                        success: function (data, status) {
                            var temp = eval(data);
                            //alert("data = "+temp+"  90 = "+temp.i+ " s "+temp.s+""+temp.r+"  status = "+status);
                            setPop(temp.s);
                        },
                        complete: function (xhr, ts) {
                            //alert(" xhr == "+xhr.toString()+" ts = "+ts);
                        },
                        error: function (error) {
                            setPop(false);
                        }
                    }
                );
            }
        );

        function setPop(isreturn) {
            $("#pop").show();
            if (isreturn == true) {
                $("#txt").text("信息提交成功");
                $("#sure").click(
                    function () {
                        $("#pop").hide();
                        window.location.href = 'action.return';
                    }
                );
            } else {
                $("#txt").text("信息提交失败，请重新填写信息");
                $("#sure").click(
                    function () {
                        $("#pop").hide();
                        window.location.reload();
                    }
                );
            }
        }
    }
);
function getUrl(user_name, mobile, extra1) {
    if (extra1.length != 0) {

        return "http://app.yiyouapp.com/logic/activity.php?a=winner_info&user_id=" + user_id + "&activity_id=" + activity_id + "&user_name=" + user_name + "&mobile=" + mobile + "&extra1=" + extra1;
    } else {
        return "http://app.yiyouapp.com/logic/activity.php?a=winner_info&user_id=" + user_id + "&activity_id=" + activity_id + "&user_name=" + user_name + "&mobile=" + mobile;
    }
}
var user_id;
var activity_id;
function setParameter(id, count, uId) {
    user_id = uId;
    activity_id = id;
}