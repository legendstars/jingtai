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
            navigationTooltips:["��¼�ٶ�����","���ȣ������ռ��봦��","ȫ�棺��������߼���ܹ�","רҵ��רҵ���ݿ��ӻ�"],
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
            user:  `�û�������Ϊ��`,
            password: {
                required: "���벻��Ϊ��",
                minlength: $.validator.format("���벻��С��{0}���ַ�")
            },
            verify: {
                required: "��֤�벻��Ϊ��",
            },
        },
        errorPlacement: function(error, element) {
            $('<div id="box">').html(error).css({width:'300px',height:'20px',marginLeft:'10px',position:'absolute',left:'10px'}).insertAfter(element);
            error.css({'color':'#dd4545',fontSize:'12px'})
        },
    })
});