/**
 * Created by Administrator on 2015/4/13.
 */

var isflag_;
$(document).ready(function(){
        $("#success").hide();
    var data = window.location.search;
    var val = data.split("=");
    isflag_ = val[1];
    //alert(" 111 = "+isflag_);
    $('#submit').click(function(){
//        $("#success").show();
        consol("addressSubmit  点击了");
        var user_name = $('.user_name').val();
        var span_nativeplace = $('#hidden_nativeplace').val();
        var span_nativeplace_son = $('#exampleInputEmail2').val();
        var span_nativeplace_sec = $('#sec_nativeplace').val();
        consol("  === "+span_nativeplace+" === "+span_nativeplace_son+"   =   "+span_nativeplace_sec);
        var mobile = $('.mobile').val();
        var address = $('.address').val();
        
        var postcode = $('.postcode').val();
        consol(" address = "+address);
        var QQ = $('.QQ').val();
           if(user_name == null || user_name == "" || mobile == null || mobile == ""|| address == null || address == ""|| postcode == null || postcode == ""||
               span_nativeplace == null || span_nativeplace == ""||span_nativeplace_son == null || span_nativeplace_son == ""||
               QQ == null || QQ == "" )
           {
               //consolp("  has null");
               alert("请填写完整信息！");
            return;
        
           }
        /**
         * 姓名的判断
         * @type {RegExp}
         */
        var chineseReg = /^[\u4E00-\u9FA5]{2,4}$/;
        if (!chineseReg.test(user_name)) {
            alert("请填写正确的名字！")
            return;
        }
        /**
         * 电话的判断
         * @type {RegExp}
         */
        var phoneNumReg =  /(^[0-9]{3,4}\-[0-9]{7}$)|(^[0-9]{7}$)|(^[0-9]{3,4}[0-9]{7}$)|(^0{0,1}13[0-9]{9}$)/;
        
        if (!phoneNumReg.test(mobile)) {
            alert("请重新输入手机号！")
            return;
        }
            consol("addressSubmit url = "+getAddressUrl(address,QQ,postcode,mobile,span_nativeplace_sec,span_nativeplace_son,span_nativeplace,user_name));
        
        $.ajax(
            {
                url:getAddressUrl(address,QQ,postcode,mobile,span_nativeplace_sec,span_nativeplace_son,span_nativeplace,user_name),
                type: 'GET',
                cache: false,
                dataType: 'jsonp',//here
                success: function (response) {
                    var temp = eval(response);
                    consol(" addressSubmit 20 i = "+temp.i+"  s = "+temp.s+" r =  "+temp.r);
                    if(temp.s == true){
                        $("#success").show();
                    }
                },
                complete : function(XMLHttpRequest, textStatus){
                    consol('complete '+ textStatus);
                },
        
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    alert('填写信息失败请重写提交(客服电话:0571-85395298-857)');
                }
        
            }
        );
    });
    $('#determine').click(
        function(){
//                        alert('xxx');
            window.location.href='action.return';
        }
    );
    /**
     * 再一次抽奖
     */
    $('#gree').click(
        function(){
            window.location.href='./index.html';
        }
    );
});




function getAddressUrl(address,QQ,postcode,mobile,span_nativeplace_sec,span_nativeplace_son,span_nativeplace,user_name){
    return getUrl('activity','winner_info')+"&activity_id="+activity_id+"&user_name="+user_name+"&address="+span_nativeplace
        +span_nativeplace_son+span_nativeplace_sec+address+"&QQ="+QQ+"&postcode="+postcode+"&mobile="+mobile+"&user_id="
        +user_id+"&isflag="+isflag_;
}

