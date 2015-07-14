/**
 * Created by xiaoxiaoyin on 2015/6/18.
 */

/**
 * activity_type 1代表绘画租   2代表设计租
 * order  排序方式：0（时间） 1（赞赏数）
 * activity_type 活动类型 1(绘画) 2（设计）
 * name 搜索内容
 * page 页数
 *
 */
var activity_id = 52;
var mNumber;
var user_id = 278;
function setParameter(activityId, number, userId) {
    activity_id = activityId;
    mNumber = number;
    user_id = userId;
}

function setRefresh(){
    pagecount = 1;
    document.getElementById("footer").innerHTML = "";
    addData(pagecount);
}

function getUrl(activityId, activity_type, order, name, page) {
    return getHttp("activity", "query_activityWork") + "&activity_id=" + activityId + "&activity_type="
        + activity_type + "&order=" + order + "&name=" + name + "&page=" + page + "&callback=?";
}

var pagecount = 1;
var ordercount = 0;
var content = "";
var photoType = 1;
$(document).ready(
    function () {
        //activity_id = TempCache.getItem("activity_id");
        //user_id = TempCache.getItem("user_id");
        var emParams = "";
        var data = window.location.search;
        var val = data.split("=");
        photoType = val[1];
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var pullDownGeneratedCount = 0,
            pullUpGeneratedCount = 0,
            listSelector = "div.short-pull-demo-page ul.ui-listview",
            lastItemSelector = listSelector + " > li:last-child";
        //alert(getUrl(activity_id,1,0,"",1));
        $('#target').hide();
        $('#target1').hide();
        $('#larger_version').hide();
        $('#more').hide();
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        $("#larger_version").css({"width": winWidth + "px", "height": winHeight + "px"});
        /**
         * 默认按时间排序
         */
        $('#time_sort').css('color', "#1d9eee");

        $(".photo").css("width", "40px");
        $("#countent").css("width",(winWidth - 80)+"px");
        /**
         * 一开始加载
         */

        addData = function (page) {
            $.getJSON(getUrl(activity_id, photoType, ordercount, content, page), function (data) {
                //alert(window.JSON.stringify(data));
                var json = eval(data);
                //var json = window.JSON.parse(data);
                console.log(" addressSubmit 35 id = " + window.JSON.stringify(data));
                if (json.s == true) {
                    $('#target1').hide();
                    $('#target').hide();

                    if (content.length > 0) {
                        if (page == 1)
                            if (json.i.length != 0)
                                $("#footer").html("");
                        else
                            Toast("亲！无此用户",2000);
                    }

                    for (var i = 0; i < json.i.length; i++) {
                        createChilde(json.i[i], i);
                    }
                    if (json.i.length == 10) {
                        $('#more').show();
                    }
                    else if (json.i.length == 0) {
                        if (content.length == 0);
                            //window.location.href = "march1.html?activity_type=" + photoType;
                    } else {
                        $("#more").hide();
                    }
                }

            });
        }

        function createChilde(obj, position) {
            //obj.i[]
            var workurl = getImageUrl(obj.work_path.replace("*", "t1"));

            var winWidth = (window.innerWidth - 30) / 2;
            var parend = $('<div></div>');
            parend.attr("id", "box");
            parend.appendTo($("#footer"));
            //边框
            var content = $('<div></div>');
            content.attr("id", "content");
            content.attr("class", "con" + obj.id);
            content.appendTo(parend);

            $('.con' + obj.id).css("height", winWidth + 72 + "px");
                var hh = winWidth - 25 + "px";
            var p = $('<p style="position: absolute; "></p>');
            p.attr("width","50px");
            p.attr("height","50px");
            p.attr("id","p"+obj.id);
            p.appendTo(content);
            $("#p"+obj.id).css({"margin-top":(winWidth - 25)+"px"});
            //作品区
            var child = $('<img />'); //显示的图片
            child.attr("src", workurl);
            child.attr("width", winWidth);
            child.attr("height", winWidth);
            child.attr("class", "work_path" + obj.id);
            child.appendTo(content);

            $("." + "work_path" + obj.id).click(
                function () {
                    var path = this.src.replace("t1", "1");
                    ImagesZoom.init(event, path);

                }
            );

            //赞区
            var praise = $('<div></div>');
            praise.attr("id", "praise");
            praise.attr("class", "praise"+obj.id);
            praise.attr("width", winWidth);
            praise.appendTo(p);
            var praiseBtn = $('<div></div>');
            praiseBtn.attr("id", "praise_" + obj.id);
            praiseBtn.attr("width", winWidth);
            praiseBtn.attr("align", "center");
            praiseBtn.appendTo(praise);
            $(".praise"+obj.id).css({"width":winWidth});

            var imgPra = $('<img />');
            imgPra.attr("src", "./image/unchecked_approve.png");
            imgPra.attr("class", "imgPra" + obj.id);
            imgPra.appendTo(praiseBtn);
            $(".imgPra" + obj.id).css({"float": "left", "margin-top": "2.5px","margin-left":"2px"});

            var praisecount = $('<h6></h6>');
            praisecount.attr("class", obj.id);
            praisecount.attr("id", "praisH" + obj.id);
            praisecount.appendTo(praiseBtn);
            var priseCount;
            var wi ;
            if (obj.prise_count == 0){
                priseCount = "赞";
                wi = 25 + priseCount.length*25  + "px";
            }

            else{
                priseCount = obj.prise_count;
               wi = 25 + priseCount.length*17  + "px"
            }

            $('.' + obj.id).text(priseCount);

            $("#praise_" + obj.id).css({
                "background-color": "#3caaf9",
                "float": "right",
                "width": wi,
                "height": "25px"
            });

            $("#praise_" + obj.id).click(function () {
                var work_id = this.id.split("_");
                //var back = praiseGet(work_id[1]);

                $.getJSON(getPraseUrl(work_id[1], photoType), function (data) {
                    //alert("march.js 292 = " + window.JSON.stringify(data));
                    console.log("march.js 292 = " + window.JSON.stringify(data));
                    var json = eval(data);
                    emParams = json.r;
                    if (json.s == true) {
                        //()
                        $("#praise_" + obj.id).addOne({
                            style: 'font-weight:bold;',
                            endSize: "60px",
                            interval: 800
                        });
                        if (priseCount != "赞")
                            $('.' + obj.id).text(priseCount++);
                        else {
                            priseCount = 1;
                            $('.' + obj.id).text(priseCount);
                        }

                            setTimeout(function () {

                                alert("187 = "+encodeURI("http://wap.5etou.com.cn/item/yiyou/?params=" + emParams));
                                window.location.href = "http://wap.5etou.com.cn/item/yiyou/?params=" + encodeURIComponent(emParams);
                            }, 1000);
                    } else {
                        //已赞过
                        Toast("您已赞过", 2000);
                            setTimeout(function () {
                                alert("196 = "+"http://wap.5etou.com.cn/item/yiyou/?params=" + encodeURIComponent(emParams)+"  == "+
                                    ("http://wap.5etou.com.cn/item/yiyou/?params=" + emParams));
                                //window.location.href = encodeURI("http://wap.5etou.com.cn/item/yiyou/?params=" + emParams);
                                window.location.href = "http://wap.5etou.com.cn/item/yiyou/?params=" + encodeURIComponent(emParams);
                            }, 1000);

                    }
                });

            });

            var account = $('<div></div>');
            account.attr("id", "account");
            account.attr("width", winWidth);
            account.attr("height", "50px");
            //account.attr("z-index", "1000");
            account.appendTo(content);
            var ava_path = obj.avatar_path;
            var avaPath;
            if (ava_path != "")
                avaPath = getImageUrl(obj.avatar_path.replace("*", "64"));
            else
                avaPath = "./image/event_back1_1.png";
            //头像
            var childAva = $('<img />'); //显示的图片
            childAva.attr("src", avaPath);
            childAva.attr("id", obj.user_id);
            childAva.attr("width", "40px");
            childAva.attr("height", "40px");
            childAva.appendTo(account);

            $("#" + obj.user_id).click(function () {
                //alert(this.id);
                window.location.href = "action.person#" + this.id;
            });
            $("#" + obj.user_id).css({"float": "left","border-radius":"45px"});

            var userOther = $('<div></div>');
            userOther.attr("height", "50px");
            userOther.appendTo(account);
            //name
            var name = $('<h3></h3>');
            var reg = //s/g;
            var nameText = obj.name.replace(reg,"");
            name.attr("id", nameText.replace("/", ""));
            name.attr("width", "10px");
            name.appendTo(userOther);
            $("#" + nameText.replace("/", "")).text(nameText.length > 4 ? (nameText.substr(0, 3) + "···") : nameText);
            $("#" + nameText.replace("/", "")).css({
                "color": "#444444",
                "font-size": "14px",
                "margin-left": "10px",
                "float": "left"
            });

            var hr = $('<br/>');
            hr.appendTo(userOther);
            //用户性别
            var sexImg = $('<img />');
            if (obj.sex == "M") {
                sexImg.attr("src", "./image/icon_male.png");
            }
            else {
                sexImg.attr("src", "./image/icon_female.png");
            }
            sexImg.attr("width", "15px");
            sexImg.attr("height", "15px");
            sexImg.attr("id", obj.type + obj.id);
            sexImg.appendTo(userOther);


            var userType = $('<h3></h3>');
            userType.attr("id", obj.id);
            userType.appendTo(userOther);
            var str = getUserType(obj.type);

            $("#" + obj.id).text(str);
            $("#" + obj.id).css({"color": "#999999", "font-size": "8px", "float": "left"});


            $("#" + obj.type + obj.id).css({"float": "left", "margin-left": "10px"});
        }

        /**
         * 时间排序点击
         */
        $('#time_sort').click(
            function () {
                $('#time_sort').css('color', "#1d9eee");
                $('#praise_sort').css('color', "#444444");
                $('#target').show();
                pagecount = 1;
                ordercount = 0;
                content = ""
                $("#footer").html("");
                addData(pagecount);
            }
        );
        /**
         * 点赞排序点击
         */
        $('#praise_sort').click(
            function () {
                $('#praise_sort').css('color', "#1d9eee");
                $('#time_sort').css('color', "#444444");
                $('#target').show();
                pagecount = 1;
                ordercount = 1;
                content = ""
                $("#footer").html("");
                addData(pagecount);
            }
        );
        /**
         * 点击加载更多
         */
        $('#more').click(function () {
            $(this).hide();
            $('#target1').show();
            pagecount++;
            addData(pagecount);
            //new ajaxLoader(this, {classOveride: 'blue-loader'});
        });

        /**
         * 点击放大图的空白地方关闭大图
         */
        $("#larger_version").click(
            function () {
                $(this).hide();
                $(document.body).css({
                    "overflow-x": "auto",
                    "overflow-y": "auto"
                });
            }
        );
        /**
         * 搜索内容
         */
        $('#submit').click(function () {
            content = $("#countent").val();
            pagecount = 1;
            if (content.length == 0) return;
            else {
                addData(pagecount);
            }
        });
        /**
         * 点击相机上传作品
         */
        $(".photo").click(function () {
            window.location.href = "action.photo#upload#upload_activityWork#" + photoType;
        });

        function praiseGet(workId) {
            console.log("343 workId = " + workId);
            $.getJSON(getPraseUrl(workId, photoType), function (data) {
                //alert("march.js 292 = " + window.JSON.stringify(data));
                console.log("march.js 292 = " + window.JSON.stringify(data));
                var json = eval(data);
                emParams = json.r;
                alert("373 r = " + json.r + " 373 s = " + json.s);
                return json.s;
            });
        }

        /**
         * 自定义弹框
         */

        function Toast(msg, duration) {
            duration = isNaN(duration) ? 3000 : duration;
            var m = document.createElement('div');
            m.innerHTML = msg;
            m.style.cssText = "width:150px; min-width:100px;opacity:0.5; height:40px; color:#fff; line-height:40px; " +
                "text-align:center; border-radius:5px; position:fixed; top:40%; left:35%;  z-index:999999; " +
                "font-weight:100; filter: alpha(opacity=80); background-image:url(./image/toast_back.png);";
            document.body.appendChild(m);
            setTimeout(function () {
                var d = 0.5;
                m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                m.style.opacity = '0';
                setTimeout(function () {
                    document.body.removeChild(m)
                }, d * 1000);
            }, duration);
        }

        addData(pagecount);
    }
);
function getPraseUrl(work_id, activity_type) {
    return getHttp("activity", "prise_activityWork") + "&work_id=" + work_id + "&user_id=" + user_id + "&activity_id="
        + activity_id + "&activity_type=" + activity_type + "&callback=?";
}
function getUserType(index) {
    var str = "";
    switch (index) {

        case '010101':
            str = "大学生";
            break;
        case '010102':
            str = "高中生";
            console.log("164 = " + str);
            break;
        case '010103':
            str = "初中生";
            break;
        case '010200':
            str = "画室";
            break;
        case '010300':
            str = "职业画家";
            break;
        case '010400':
            str = "爱好者";
            break;
        case '010501':
            str = "大学老师";
            break;
        case '010502':
            str = "高中老师";
            break;
        case '010503':
            str = "初中老师";
            break;
        case '010504':
            str = "小学老师";
            break;
        case '010104':
            str = "小学生";
            break;
        case '010401':
            str = "摄影师";
            break;
        case '010402':
            str = "设计师";
            break;

        default :
            str = '其他';
            console.log("202 = " + str);
            break;
    }

    return str;
}

