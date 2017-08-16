/**
 * Created by Moonlight on 2017/4/9.
 */
$(function(){
    $('.rightnav > a:nth-of-type(2)').hover(function(){
        $(this).find('.hide').show();
    },function(){
        $(this).find('.hide').hide();
    });
    $('#dowebok').fullpage(
        {
            navigation:true,
            verticalCentered:false,
            navigationTooltips:["登录百度舆情","领先：数据收集与处理","全面：舆情分析逻辑与架构","专业：专业数据可视化"],
            afterLoad:function(val,index){
                switch(index){
                    case 1:$('.bottom1 > .boat').addClass('active');
                        break;
                    case 2: $('.title2').addClass('active');
                        $('.right2').addClass('active');
                        $('.rightnav > a:nth-of-type(1)').addClass('active');
                        break;
                    case 3:$('.title3').addClass('active');
                        $('.right3').addClass('active');
                        break;
                    case 4: $('.title4').addClass('active');
                        $('.right4').addClass('active');
                        break;
                }
            },
            onLeave:function(val,index){
                switch(index){
                    case 1:$('.bottom1 > .boat').removeClass('active');
                        $('.rightnav > a:nth-of-type(1)').removeClass('active');
                        break;
                    case 2:$('.title2').removeClass('active');
                        $('.right2').removeClass('active');
                        break;
                    case 3:$('.title3').removeClass('active');
                        $('.right3').removeClass('active');
                        break;
                    case 4:$('.title4').removeClass('active');
                        $('.right4').removeClass('active');
                        break;
                }
            }
        }

    );
    $('.next').click(function(){
        $.fn.fullpage.moveSectionDown();
    });
    $('#login').validate({
        rules: {
            user: "required",

            password: {
                required: true,
                minlength: 6
            },
            verify: {
                required: true,
            },
        },
        messages: {
            user:  `用户名不能为空`,
            password: {
                required: "密码不能为空",
                minlength: $.validator.format("密码不能小于{0}个字符")
            },
            verify: {
                required: "验证码不能为空",
            },
        },
        errorPlacement: function(error, element) {
            $('<div id="box">').html(error).css({width:'300px',height:'20px',marginLeft:'10px',position:'absolute',left:'10px'}).insertAfter(element);
            error.css({'color':'#dd4545',fontSize:'12px'})
        },
    })
});