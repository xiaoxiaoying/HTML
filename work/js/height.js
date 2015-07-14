/**
 * Created by Administrator on 2015/4/12.
 */

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
        var xy = winWidth -40;
        document.getElementById("main").style.width = winWidth+"px";
        document.getElementById("main").style.height = winHeight+"px";

        document.getElementById("btn").style.width = xy + "px";
        document.getElementById("btn").style.height = xy / 600 * 70 + "px";
        document.getElementById("pop").style.width = winWidth + "px";
        document.getElementById("pop").style.height = winHeight + "px";

        document.getElementById("btn").style.lineHeight = xy / 600 * 70 + "px";
        document.getElementById("back").style.width = xy-40+"px";
        document.getElementById("back").style.height = (xy-40)/5*2+"px";
        document.getElementById("back").style.marginTop = winHeight/2-(xy-40)/4+"px";
        var backTop = (xy-40)/5*2 - 40;
        document.getElementById("dv").style.marginTop = backTop/4+"px";
        document.getElementById("txt").style.marginTop = backTop/4+"px";

        document.getElementById("sure").style.width = xy-80+"px";
        document.getElementById("sure").style.paddingTop = backTop/4+"px";
        document.getElementById("sure").style.paddingBottom = backTop/4-10+"px";
        $("#pop").hide();
        $("#btn").click(
            function () {


                var name = $("#name").val();
                var phone = $("#phone").val();
                var extra1 = $("#extra1").val();
                //alert("点击了 = " + name);
                var chineseReg = /^[\u4E00-\u9FA5]{2,4}$/;
                if (!chineseReg.test(name)) {
                    alert("请填写正确的名字！")
                    return;
                }
                var phoneNumReg =  /(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/;
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
                        url:getUrl(name, phone, extra1),
                        type:"get",
                        cache:false,
                        dataType:"jsonp",
                        success:function(data,status){
                            var temp = eval(data);
                            //alert("data = "+temp+"  90 = "+temp.i+ " s "+temp.s+""+temp.r+"  status = "+status);
                            setPop(temp.s);
                        },
                        complete:function(xhr,ts){
                            //alert(" xhr == "+xhr.toString()+" ts = "+ts);
                        },
                        error:function(error){
                            setPop(false);
                        }
                    }
                );
            }
        );

        function setPop(isreturn){
            $("#pop").show();
            if(isreturn == true){
                $("#txt").text("信息提交成功");
                $("#sure").click(
                    function(){
                        $("#pop").hide();
                        window.location.href='action.return';
                    }
                );
            }else{
                $("#txt").text("信息提交失败，请重新填写信息");
                $("#sure").click(
                    function(){
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

        return "http://192.168.0.12/app/logic/activity.php?a=winner_info&user_id=" + user_id +"&activity_id="+activity_id+ "&user_name=" + user_name + "&mobile=" + mobile + "&extra1=" + extra1;
    } else {
        return "http://192.168.0.12/app/logic/activity.php?a=winner_info&user_id=" + user_id+"&activity_id="+activity_id+ "&user_name=" + user_name + "&mobile=" + mobile;
    }
}
var user_id;
var activity_id;
function setParameter(id, count, uId) {
    user_id = id;
    activity_id = uId;
}