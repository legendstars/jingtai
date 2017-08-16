

$(function(){


    let database=[
        {id:'c1',name:"Somebody Else's Lover",src:"music/Somebody Else's Lover.mp3",img:'img/3.jpg',bigimg:'bigimg/7.jpg',author:'Juliette Claire',zhuanji:"Somebody Else's Lover",
            lyrics:[
                {time:'00:00',lyric:"Somebody Else's Lover"},
                {time:'00:04',lyric:'Juliette Claire'},
                {time:'00:09',lyric:'Somebody help me'},
                {time:'00:12',lyric:'Somebody teach me'},
                {time:'00:14',lyric:'Somebody tell me what to do'},
                {time:'00:17',lyric:'How should I handle you'},
                {time:'00:19',lyric:'I may be heartless'},
                {time:'00:22',lyric:'To feel so injurious'},
                {time:'00:24',lyric:"I've given the matter due consideration"},
                {time:'00:26',lyric:'And know for sure that'},
                {time:'00:28',lyric:"I will never dedicate my love to somebody else's lover"},
                {time:'00:33',lyric:"Just didn't wanna hear your lies, but first I had to discover"},
                {time:'00:37',lyric:'I forgot to look in your eyes and now I have to suffer'},
                {time:'00:40',lyric:"No, I will never ever fall in love with somebody else's lover"},
                {time:'01:07',lyric:'Why did you deceive me'},
                {time:'01:09',lyric:"You say you didn't want to hurt me" },
                {time:'01:12',lyric:'But why then did you hold me tight '},
                {time:'01:15',lyric:'You knew it would break me'},
                {time:'01:17',lyric:"Why is it that I've chosen the wrong way"},
                {time:'01:19',lyric:"Which then brought me to you "},
                {time:'01:22',lyric:"But now that I've been there"},
                {time:'01:25',lyric:"I should have know better and "},
                {time:'01:27',lyric:"I will never ever give my soul to somebody else's lover"},
                {time:'01:29',lyric:"Just didn't wanna hear your lies, but first I had to discover"},
                {time:'01:36',lyric:"I forgot to look in your eyes and now I have to suffer  "},
                {time:'01:40',lyric:"No, I will never ever fall in love with somebody else's lover   "},
                {time:'02:03',lyric:"I should have know better andI will never ever give my soul to somebody else's lover  "},
                {time:'02:08',lyric:"How could I believe it, fallen for your lies"},
                {time:'02:11',lyric:"I know for sure that I will look in your eyes"},
                {time:'02:15',lyric:"More than a moment"},
                {time:'02:18',lyric:"I will ignore my deepest feelings inside"},
                {time:'02:23',lyric:"I will never ever give my soul to somebody else's lover"},
                {time:'02:30',lyric:"Just didn't wanna hear your lies, but first I had to discover"},
                {time:'02:35',lyric:"I forgot to look in your eyes and now I have to suffer"},
                {time:'02:39',lyric:"No, I will never ever fall in love with somebody else's lover"},
                {time:'02:56',lyric:"(My love to somebody else's lover)"},
                {time:'03:03',lyric:"(Whoaoaoa)"},
                {time:'03:06',lyric:"(Somebody else's lover)"}
            ]},
        {id:'c2',name:'A Moving Legend',src:'music/A Moving Legend.mp3',img:'img/1.jpg',bigimg:'bigimg/5.jpg',author:'Andemund Orchestra',zhuanji:"A Moving Legend"},
        {id:'c3',name:'When You Wish Upon a Star',src:'music/When You Wish Upon a Star.mp3',img:'img/2.png',bigimg:'bigimg/6.jpg',author:'Bronn Journey',zhuanji:'Harp For Baby'},
        {id:'c4',name:'Lifeline',src:'music/Lifeline.mp3',img:'img/4.jpg',bigimg:'bigimg/8.jpg',author:'You Are Free',zhuanji:'Lifeline'}
    ];




    let liebiao=$('.list section');
    let list=$('ul:nth-of-type(2)',liebiao);
    $(database).each((index,obj)=>{
        let li=$('<li>');
        li.attr('id',obj.id).html(`<span class="iconfont"></span>
        <span>${obj.name}</span>
        <span>${obj.author}</span>
        <span>${obj.zhuanji}</span>
        <span class="iconfont icon-shanchu"></span>`);
        if(index==0){
            li.addClass('active');
        }
        $(list).append(li);
    });




    let current=0;
    let lyric=$('.lyrics ul');
    $(database[current].lyrics).each((index,val)=>{
        let li=$('<li>');
        li.attr('id','c'+index).html(val.lyric);
        $(lyric).append(li);
    });


    $('.menu span').on('click',function(){
        $(liebiao).toggleClass('liebiao');
    });



    let audio=$('audio');
    let load=$('.load');
    audio.on('canplay',function(){
        load[0].style.width='100%';
    });



    //点击播放开关让音乐播放或暂停
    let play=$('.play span');
    play.on('click',function(){
        if(audio[0].paused){
            audio[0].play();
            list.children().eq(current).children().eq(0).addClass('icon-yinle');
            play.removeClass('icon-bofang');
            play.addClass('icon-weibiaoti1');
        }else{
            audio[0].pause();
            play.addClass('icon-bofang');
            play.removeClass('icon-weibiaoti1');
            list.children().eq(current).children().eq(0).removeClass('icon-yinle');
        }
    });




//格式化时间
    function getTime(t){
        let m=Math.trunc(t/60)>=10?Math.trunc(t/60):'0'+Math.trunc(t/60);
        let s=Math.trunc(t)%60>=10?Math.trunc(t%60):'0'+Math.trunc(t%60);
        return m+':'+s;
    }
    let tiao=$('.status .progress .tiao');
//让进度条动起来
    audio.on('timeupdate',function(){
        let newtime=getTime(audio[0].currentTime);
        let totletime=getTime(audio[0].duration);
        let time=$('.time');
        let circle=$('.circle');
        let played=$('.played');
        circle[0].style.left=audio[0].currentTime/audio[0].duration*tiao[0].offsetWidth-10+'px';
        played[0].style.width=audio[0].currentTime/audio[0].duration*tiao[0].offsetWidth-10+'px';
        time.children().eq(0).html(newtime);
        time.children().eq(2).html(totletime);

        if(database[current].lyrics){
            $(database[current].lyrics).each((index,val)=>{
                if(val.time==getTime(audio[0].currentTime)){
                    let i=index;
                    if(index<=5){
                        index=0;
                    }else{
                        index=index-5;
                        i=i-index;
                    }
                    lyric[0].innerHTML='';
                    for(let j=index;j<database[current].lyrics.length;j++){
                        $('<li>').attr('id','l'+j).html(database[current].lyrics[j].lyric).appendTo(lyric);
                    }
                    lyric.children().eq(i).addClass('active');
                }
            });

        }

    });




    //点击进度条
//    audio.oncanplaythrough=function(){
    tiao.on('click',(e)=>{
        audio[0].currentTime=e.offsetX/tiao[0].offsetWidth*audio[0].duration;
        audio[0].play();
    });

//};



    //点击音量
    let yinliang=$('.yinliang span');
    let currentvolume;
    yinliang.on('click',function(){
        if(audio[0].volume){
            currentvolume=audio[0].volume;
            audio[0].volume=0;
            $(this).removeClass('icon-yinliang1');
            $(this).addClass('icon-jingyin');
        }else{
            audio[0].volume=currentvolume;
            $(this).addClass('icon-yinliang1');
            $(this).removeClass('icon-jingyin');
        }
    });


    let sheng=$('.yinliang .progress .tiao');
    let yuan=$('.yinliang .progress .tiao .circle');
    let jindu=$('.yinliang .progress .tiao .played');
    jindu[0].style.width='100%';
    yuan[0].style.left='100%';
    sheng.on('click',function(e){
        audio[0].volume=e.offsetX/sheng[0].offsetWidth;
        audio.on('volumechange',function(){
            jindu[0].style.width=e.offsetX+'px';
            yuan[0].style.left=e.offsetX+'px';
        });

    });






    let img=$('.img');

        list.on('dblclick',function(e){
            let obj=e.target;

            let now,idname;
            if(obj.nodeName=='SPAN'){
                idname=obj.parentNode.id;
                now=database.findIndex(function(val){
                    return val.id==idname;
                })
            }

            audio.attr('src',database[now].src);
            play.removeClass('icon-bofang');
            play.addClass('icon-weibiaoti1');
            $(obj).parent().parent().children().each(function(index,val){
                $(val).removeClass('active');
                $(val).children().eq(0).removeClass('icon-yinle');
            });
            document.body.style.background=`url(${database[now].bigimg})`;
            img[0].style.background=`url(${database[now].img})`;
            $(obj).parent().addClass('active');
            $(obj).parent().children().eq(0).addClass('icon-yinle');
            $('.xinxi span:nth-child(1)').html(database[now].author);
            $('.xinxi span:nth-child(3)').html(database[now].name);
            lyric[0].innerHTML='';
            $(database[current].lyrics).each((index,val)=>{
                $('<li>').attr('id','l'+index).html(val.lyric).appendTo(lyric);
            });
            current=now;
            audio[0].play();
        });


//删除
        let del=$('.list ul:nth-of-type(2) li span:last-child');
    del.each((index,val)=>{
        $(val).on('click',function(e){
            e.stopPropagation();
            if(this.parentNode.className=='active'){
                return;
            }
            let id=this.parentNode.id;
            database.forEach((val,index,arr)=>{
                if(val.id===id){
                    arr.splice(index,1);
                    if(index<current){
                        current--;
                    }
                }
            });
            list[0].removeChild(val.parentNode);
        });
    });



//上一首

    let previous=$('.previous span');
    let next=$('.next span');

    previous.click(function(){
        list.children().eq(current).removeClass('active');
        list.children().eq(current).children().eq(0).removeClass('icon-yinle');
        current--;
        if(current<0){
            current=database.length-1;
        }
        list.children().eq(current).addClass('active');
        list.children().eq(current).children().eq(0).addClass('icon-yinle');
        audio[0].src=database[current].src;
        play.removeClass('icon-bofang');
        play.addClass('icon-weibiaoti1');
        document.body.style.background=`url(${database[current].bigimg})`;
        img[0].style.background=`url(${database[current].img})`;
        $('.xinxi span:nth-child(1)').html(database[current].author);
        $('.xinxi span:nth-child(3)').html(database[current].name);
        lyric.innerHTML='';
        if(database[current].lyrics){
            $(database[current].lyrics).each((index,val)=>{
                $('<li>').attr('id','l'+index).html(val.lyric).appendTo(lyric);

            });
        }

        audio[0].play();
    });



//下一首


    next.click(function(){
        list.children().eq(current).removeClass('active');
        list.children().eq(current).children().eq(0).removeClass('icon-yinle');
        current++;
        if(current>database.length-1){
            current=0;
        }
        list.children().eq(current).addClass('active');
        list.children().eq(current).children().eq(0).addClass('icon-yinle');
        audio[0].src=database[current].src;
        play.removeClass('icon-bofang');
        play.addClass('icon-weibiaoti1');
        document.body.style.background=`url(${database[current].bigimg})`;
        img[0].style.background=`url(${database[current].img})`;
        $('.xinxi span:nth-child(1)').html(database[current].author);
        $('.xinxi span:nth-child(3)').html(database[current].name);
        lyric.innerHTML='';
        if(database[current].lyrics){
            $(database[current].lyrics).each((index,val)=>{
                $('<li>').attr('id','l'+index).html(val.lyric).appendTo(lyric);

            });
        }

        audio[0].play();
    });


    audio.on('ended',function(){
        next.click();
    })

})
