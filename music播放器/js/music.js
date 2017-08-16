/**
 * Created by Moonlight on 2017/3/21.
 */
window.onload=function(){
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



    let liebiao=document.querySelector('.list section');
    let list=liebiao.querySelector('ul:nth-of-type(2)');
    database.forEach((obj,index)=>{
        let li=document.createElement('li');
        li.id=obj.id;
        li.innerHTML=`  <span class="iconfont"></span>
                    <span>${obj.name}</span>
                    <span>${obj.author}</span>
                    <span>${obj.zhuanji}</span>
                    <span class="iconfont icon-shanchu"></span>`;
        if(index==0){
            li.classList.add('active');
        }
        list.appendChild(li);

    });


    let current=0;
    let lyric=document.querySelector('.lyrics ul');
    database[current].lyrics.forEach((val,index)=>{
        let li=document.createElement('li');
        li.id='c'+index;
        li.innerHTML=val.lyric;
        lyric.appendChild(li);
    });

    let menu=document.querySelector('.menu span');
    menu.onclick=function(){
        liebiao.classList.toggle('liebiao');
    };


    let audio=document.querySelector('audio');
    let load=document.querySelector('.load');
    audio.oncanplay=function(){
        load.style.width='100%';
    };

//点击播放开关让音乐播放或暂停
    let play=document.querySelector('.play span');

    play.onclick=function(){
        if(audio.paused){
            audio.play();
            list.children[current].children[0].classList.add('icon-yinle');
            play.classList.remove('icon-bofang');
            play.classList.add('icon-weibiaoti1');
        }else{
            audio.pause();
            play.classList.add('icon-bofang');
            play.classList.remove('icon-weibiaoti1');
            list.children[current].children[0].classList.remove('icon-yinle');
        }
    };

//格式化时间
    function getTime(t){
        let m=Math.trunc(t/60)>=10?Math.trunc(t/60):'0'+Math.trunc(t/60);
        let s=Math.trunc(t)%60>=10?Math.trunc(t%60):'0'+Math.trunc(t%60);
        return m+':'+s;
    }
    let tiao=document.querySelector('.tiao');
//让进度条动起来
    audio.ontimeupdate=function(){
        let newtime=getTime(audio.currentTime);
        //console.log(newtime);
        let totletime=getTime(audio.duration);
        let time=document.querySelector('.time');
        let circle=document.querySelector('.circle');
        let played=document.querySelector('.played');
        circle.style.left=audio.currentTime/audio.duration*tiao.offsetWidth-10+'px';
        played.style.width=audio.currentTime/audio.duration*tiao.offsetWidth-10+'px';
        time.children[0].innerHTML=newtime;
        time.children[2].innerHTML=totletime;

        if(database[current].lyrics){
            database[current].lyrics.forEach((val,index)=>{
                if(val.time==getTime(audio.currentTime)){
                    let i=index;
                    if(index<=5){
                        index=0;
                    }else{
                        index=index-5;
                        i=i-index;
                    }
                    lyric.innerHTML='';
                    for(let j=index;j<database[current].lyrics.length;j++){
                        let li=document.createElement('li');
                        li.id='l'+j;
                        li.innerHTML=database[current].lyrics[j].lyric;
                        lyric.appendChild(li);
                    }
                    lyric.children[i].classList.add('active');
                }
            });
        }




    };
//点击进度条
//    audio.oncanplaythrough=function(){
        tiao.onclick=(e)=>{
            console.log(1);
            audio.currentTime=e.offsetX/tiao.offsetWidth*audio.duration;
            audio.play();
        };
    //};

//点击音量
    let yinliang=document.querySelector('.yinliang span');
    let currentvolume;
    yinliang.onclick=function(){
        if(audio.volume){
            currentvolume=audio.volume;
            audio.volume=0;
            this.classList.remove('icon-yinliang1');
            this.classList.add('icon-jingyin');
        }else{
            audio.volume=currentvolume;
            this.classList.add('icon-yinliang1');
            this.classList.remove('icon-jingyin');
        }
    };

    let sheng=document.querySelector('.yinliang .progress .tiao') ;
    let yuan=document.querySelector('.yinliang .progress .tiao .circle');
    let jindu=document.querySelector('.yinliang .progress .tiao .played');
    jindu.style.width='100%';
    yuan.style.left='100%';
    sheng.onclick=function(e){
        audio.volume=e.offsetX/sheng.offsetWidth;
        audio.onvolumechange=function(){
            jindu.style.width=e.offsetX+'px';
            yuan.style.left=e.offsetX+'px';
        }
    };


    let img=document.querySelector('.img');
    let geshou,gequ;


 [...list.children].forEach((val,index)=>{
     list.ondblclick=function(e){
         let obj=e.target;
         let now,idname;
         if(obj.nodeName=='SPAN'){
             idname=obj.parentNode.id;
             now=database.findIndex(function(val){
                 return val.id==idname;
             })
         }
         current=now;
         audio.src=database[now].src;
         play.classList.remove('icon-bofang');
         play.classList.add('icon-weibiaoti1');
         [...obj.parentNode.parentNode.children].forEach(function(val){
             val.classList.remove('active');
             val.children[0].classList.remove('icon-yinle');
         });
         document.body.style.background=`url(${database[now].bigimg})`;
         img.style.background=`url(${database[now].img})`;
         obj.parentNode.classList.add('active');
         obj.parentNode.children[0].classList.add('icon-yinle');
         geshou=document.querySelector('.xinxi span:nth-child(1)');
         gequ=document.querySelector('.xinxi span:nth-child(3)');
         geshou.innerHTML=database[now].author;
         gequ.innerHTML=database[now].name;

         lyric.innerHTML='';
         if(database[current].lyrics) {
             database[current].lyrics.forEach((val, index)=> {
                 let li = document.createElement('li');
                 li.id = 'l' + index;
                 li.innerHTML = val.lyric;
                 lyric.appendChild(li);
             });
         }
         audio.play();
     };

//删除
     val.children[val.children.length-1].onclick=function (e) {
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
         list.removeChild(this.parentNode);
     }

 });




//上一首
    let previous=document.querySelector('.previous span');
    let next=document.querySelector('.next span');

    previous.onclick=function(){
        list.children[current].classList.remove('active');
        list.children[current].children[0].classList.remove('icon-yinle');
        current--;
        if(current<0){
            current=database.length-1;
        }
        list.children[current].classList.add('active');
        list.children[current].children[0].classList.add('icon-yinle');
        audio.src=database[current].src;
        play.classList.remove('icon-bofang');
        play.classList.add('icon-weibiaoti1');
        document.body.style.background=`url(${database[current].bigimg})`;
        img.style.background=`url(${database[current].img})`;
        geshou=document.querySelector('.xinxi span:nth-child(1)');
        gequ=document.querySelector('.xinxi span:nth-child(3)');
        geshou.innerHTML=database[current].author;
        gequ.innerHTML=database[current].name;

        lyric.innerHTML='';
        if(database[current].lyrics){
            database[current].lyrics.forEach((val,index)=>{
                let li=document.createElement('li');
                li.id='l'+index;
                li.innerHTML=val.lyric;
                lyric.appendChild(li);
            });
        }

        audio.play();
    };
//下一首
    next.onclick=function(){
        list.children[current].classList.remove('active');
        list.children[current].children[0].classList.remove('icon-yinle');
        current++;
        if(current>database.length-1){
            current=0;
        }
        list.children[current].classList.add('active');
        list.children[current].children[0].classList.add('icon-yinle');
        audio.src=database[current].src;
        play.classList.remove('icon-bofang');
        play.classList.add('icon-weibiaoti1');
        document.body.style.background=`url(${database[current].bigimg})`;
        img.style.background=`url(${database[current].img})`;
        geshou=document.querySelector('.xinxi span:nth-child(1)');
        gequ=document.querySelector('.xinxi span:nth-child(3)');
        geshou.innerHTML=database[current].author;
        gequ.innerHTML=database[current].name;
        lyric.innerHTML='';
        if(database[current].lyrics){
            database[current].lyrics.forEach((val,index)=>{
                let li=document.createElement('li');
                li.id='l'+index;
                li.innerHTML=val.lyric;
                lyric.appendChild(li);
            });
        }

        audio.play();
    };

    audio.onended=function{
        next.onclick();
    }
}