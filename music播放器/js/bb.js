/**
 * Created by Moonlight on 2017/4/5.
 */
let current=0;
let lyric=document.querySelector('.lyrics ul');
//let lyric=$('.lyrics ul');
database[current].lyrics.forEach((val,index)=>{
    //$(database[current].lyrics).each((val,index)=>{
    let li=document.createElement('li');
    //let li=$('<li>');
    li.id='c'+index;
    li.innerHTML=val.lyric;
    //$(lyric).append(li);
    lyric.appendChild(li);
    //})
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


    if(audio.ended){
        next.onclick();
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
        database[current].lyrics.forEach((val,index)=>{
            let li=document.createElement('li');
            li.id='l'+index;
            li.innerHTML=val.lyric;
            lyric.appendChild(li);
        });
        current=now;
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
