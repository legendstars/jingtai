/**
 * Created by Moonlight on 2017/4/10.
 */
$(function(){
    let arr=[];
    let huasearr=['h','c','d','s'];
    let sign={};
    while(arr.length<52){
        let shuzi=Math.ceil(Math.random()*13);
        let huase=huasearr[Math.floor(Math.random()*huasearr.length)];
        if(!(sign[shuzi+'_'+huase])){
            sign[shuzi+'_'+huase]=true;
            arr.push({shuzi,huase});
        }
    }
    let n=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<i+1;j++){
            $('<li class=pai>').attr('id',i+'_'+j).attr('value',arr[n].shuzi).css('background-image',`url(img/${arr[n].shuzi}${arr[n].huase}.png)`).appendTo($('ul')).delay(n*50).animate({
                left:300-50*i+100*j,
                top:i*50,
                opacity:1
            },400);
            n++;
        }
    }
    for(n;n<52;n++){
        $('<li class="pai zuo">').attr('id','7_'+n).attr('value',arr[n].shuzi).css('background-image',`url(img/${arr[n].shuzi}${arr[n].huase}.png)`).appendTo($('ul')).delay(n*50).animate({
            left:100,
            top:470,
            opacity:1
        },400)
    }

    let currentobj=null;
    $('.pai').click(function(){
        let x=$(this).attr('id').split('_')[0];
        let y=$(this).attr('id').split('_')[1];
        if(x<6){
            if($(`#${parseInt(x)+1}_${y}`).length==1||$(`#${parseInt(x)+1}_${parseInt(y)+1}`).length==1){
                return;
            }
        }
        $(this).toggleClass('active');
        console.log(this);

        if(!currentobj){
            if($(this).attr('value')==13){
                $(this).animate({left:600,top:0,opacity:0},function(){
                    $(this).remove();
                });
            }else{
                currentobj=$(this);
                console.log(currentobj.attr('value'));
            }
        }else{
            if(parseInt(currentobj.attr('value'))+parseInt($(this).attr('value'))===13){
                $('.active').animate({left:600,top:0,opacity:0},function(){
                    $('.active').remove();
                });
                currentobj=null;
            }else{
                setTimeout(function(){
                    $('.active').removeClass('active');
                },400);

                currentobj=null;
            }
        }
    });

    let index=1;
    $('.right').click(function(){
        $('.zuo').last().addClass('you').removeClass('zuo').css('z-index',++index).animate({
            left:500,
            top:470
        }).removeClass('active');
        currentobj=null;
    });
    $('.left').click(function(){
        $('.you').css('z-index',++index).addClass('zuo').removeClass('you').each(function(index){
            $(this).delay(50*index).animate({
                left:100,
                top:470
            }).removeClass('active');
        });
        currentobj=null;
    });
})
