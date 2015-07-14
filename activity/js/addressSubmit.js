/**
 * Created by Administrator on 2015/4/13.
 */

$(document).ready(function(){
        //$("#success").hide();
    $('#submit').click(function(){
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

    $('#return').click(
        function(){
            alert('xxx');
            window.location.href='action.return';
        }
    );
});

var isflag_;
function setIsflag(isflag){
    isflag_ = isflag;
    consol(' 67 = '+ isflag);
    alert(isflag);

}

function getAddressUrl(address,QQ,postcode,mobile,span_nativeplace_sec,span_nativeplace_son,span_nativeplace,user_name){
    return getUrl('activity','winner_info')+"&activity_id="+activity_id+"&user_name="+user_name+"&address="+span_nativeplace
        +span_nativeplace_son+span_nativeplace_sec+address+"&QQ="+QQ+"&postcode="+postcode+"&mobile="+mobile+"&user_id="
        +user_id+"&isflag="+isflag_;
}

