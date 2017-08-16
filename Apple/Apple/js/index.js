
$(function(){
    $(document).ready(function(){
        $(window).resize(function(){
            let width=$(window).width();
            if(width<=735){
                $('.small_nav .ul span:nth-of-type(1)').off().click(function(){
                    $('body,html').toggleClass('hidden');
                    $('.small_nav ul').stop().slideToggle(600).find('li').toggleClass('active');
                });
                $('.foot > div > div > h4').each(function(index){
                    $(this).unbind();
                    $(this).click(function(){
                        $('.foot > div > div').eq(index).find('ul').stop().slideToggle('fast').end().find('span').toggleClass('active');
                    })
                })
            }else{
                $('.foot > div > div > h4').unbind();
                $('.foot > div > div > ul').show();
            }
        });
        $(window).triggerHandler('resize');



        let lis=$('.img-box li');
        let now= 0,next=0;
        let divs=$('header section .box .par div');
        divs.eq(now).addClass('active');
        divs.on('animationend.end',function(){
            next=now+1;
            if(next>=divs.length){
                next=0;
            }
            lis.removeClass();
            lis.eq(now).addClass('one');
            lis.eq(next).addClass('three zIndex');
            divs.removeClass('active').eq(next).addClass('active');
            now=next;
        });


        function movel(){
            next=now+1;
            if(next>lis.length-1){
                next=0;
            }
            lis.removeClass();
            lis.eq(now).addClass('one ');
            lis.eq(next).addClass('three zIndex');
            divs.removeClass().eq(next).addClass('visible');
            now=next;
        }


        function mover(){
            next=now-1;
            if(next<0){
                next=lis.length-1;
            }
            lis.removeClass();
            lis.eq(now).addClass('four zIndex');
            lis.eq(next).addClass('two ');
            divs.removeClass().eq(next).addClass('visible');
            now=next;
        }

        $('header section .box .par').click(function(){
            divs.off('animationend.end');
            let index=$(this).index();
            if(index>now){
                lis.removeClass();
                lis.eq(now).addClass('one ');
                lis.eq(index).addClass('three zIndex');
                divs.removeClass().eq(index).addClass('visible');
            }else if(index<now){
                lis.removeClass();
                lis.eq(now).addClass('four zIndex');
                lis.eq(index).addClass('two ');
                divs.removeClass().eq(index).addClass('visible');
            }
            now=index;
        });

        $('#leftbtn').click(function(){
            divs.off('animationend.end');
            movel();
        });
        $('#rightbtn').click(function(){
            divs.off('animationend.end');
            mover();
        });

    });



})