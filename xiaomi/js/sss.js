
let menu=document.querySelector('.top div');
let topRight=document.querySelector('.topright ');
topRight.onmouseover=function(){
    topRight.style.background='#fff';
    menu.style.height='98px';
};
topRight.onmouseout=function(){
    topRight.style.background='#424242';
    menu.style.height='0';
};
menu.onmouseover=function(){
    menu.style.height='98px';
};
menu.onmouseout=function(){
    menu.style.height='0';
};




let lis2=document.querySelectorAll('.categoryfirst li');
let divs=document.querySelectorAll('.children');
lis2.forEach(function(value,index){
    value.onmouseover=function(){
        for(let i=0;i<lis2.length;i++){
            lis2[i].style.background='none';
            divs[i].style.display='none';
        }
        this.style.background='#ff6700';
        divs[index].style.display='block';
    };
    value.onmouseout=function(){
        divs[index].style.display='none';
        this.style.background='none';
    };
})
divs.forEach(function(value){
    value.onmouseover=function(){
        value.style.display='block';
    }
    value.onmouseout=function(){
        value.style.display='none';
    }
})



let span=document.querySelectorAll('.containerleft span.one');
let parent=document.querySelector('.site-header .lists');
let xs=document.querySelector('.site-header .containerleft > div');
let lists=document.querySelectorAll('.site-header .lists ul');
let time;
xs.onmouseover=function(){
    parent.style.borderTop='1px solid #ccc';
    animate(parent,{height:230},500);
};
xs.onmouseout=function(){
    clearTimeout(time);
    animate(parent,{height:0},500);
    parent.style.borderTop=0;
};
span.forEach(function(obj,index){
    obj.onmouseover=function(){
        time=setTimeout(function(){
            for(let i=0;i<lists.length;i++) {
                lists[i].classList.remove('first');
            }
            lists[index].classList.add('first');
        },200)
    };
});







function getXxk(parent){
    let lis1=parent.querySelectorAll('div.title a');
    let brick=parent.querySelectorAll(' section');
    lis1.forEach(function(value,index){
        value.onmouseover=function(){
            for(let i=0;i<lis1.length;i++){
                lis1[i].classList.remove('first');
                brick[i].classList.remove('brick-list');
            }
            this.classList.add('first');
            brick[index].classList.add('brick-list');
        }
    })
}

let parent1=document.querySelectorAll('.change');
parent1.forEach(function(value){
    getXxk(value);
});






let box4=document.querySelector('.articlethree section');
let lis4=box4.querySelectorAll('ul');
let btn4=document.querySelectorAll('.articlethree .title a');
let now=0;
let next=0;
let t4;
let t5;
let flagl=false,
    flagr=true;
let width=parseInt(window.getComputedStyle(box4,null).width);
let div4=document.querySelector('.articlethree .title div');
function move4() {
    if(flagr){
        flagr = false;
        next = now + 1;
//				if (next > lis4.length - 1) {
//					next = 0;
//				}
        lis4[next].style.left = '100%';
        animate(lis4[next], {left: 0}, 400);
        animate(lis4[now], {left: -width}, 400, function () {
            flagl = true;
        });
        btn4[now].classList.remove('one');
        btn4[next].classList.add('one');
        now = next;
    }
}
function move5(){
    if(flagl){
        next=now-1;
        flagl=false;
//				if(next<0){
//					next=lis4.length-1;
//				}
        lis4[next].style.left='-100%';
        animate(lis4[next],{left:0},400);
        animate(lis4[now],{left:width},400,function(){
            flagr=true;
        });
    }
    btn4[now].classList.remove('one');
    btn4[next].classList.add('one');
    now=next;
}
t4=setInterval(move4,2500);
t5=setInterval(move5,2500);

div4.onmouseover=function(){
    clearInterval(t4);
    clearInterval(t5);
};
div4.onmouseout=function(){
    t4=setInterval(move4,2500);
    t5=setInterval(move5,2500);
};

div4.querySelector('.left').onclick=function(){
    move5();
};
div4.querySelector('.right').onclick=function(){
    move4();
};




let box8=document.querySelector('#eight section');
let lis8=box8.querySelectorAll('ul');
let btn8=document.querySelectorAll('#eight .title div a');
let now8=0;
let next8=0;
let flag8=false,
    flag9=true;
let width8=parseInt(window.getComputedStyle(box8,null).width);
let div8=document.querySelector('#eight .title div');
div8.querySelector('.right8').onclick=function(){
    next8 = now8 + 1;
    if (next8>lis8.length-1){
        flag9=false;
    }
    if(flag9){
        animate(lis8[next8], {left: 0}, 400);
        animate(lis8[now8], {left: -width8}, 400, function () {
            flag8=true;
        });
        now8 = next8;
    }
    btn8.forEach((val)=>{
        val.classList.remove('one');
    });
    this.classList.add('one');
};
div8.querySelector('.left8').onclick=function(){
    next8=now8-1;
    if(next8<0){
        flag8=false;
    }
    if(flag8){
        animate(lis8[next8],{left:0},400);
        animate(lis8[now8],{left:width8},400,function(){
            flag9=true;
        });
        now8=next8;
    }
    btn8.forEach((val)=>{
        val.classList.remove('one');
    });
    this.classList.add('one');
};



let box9=document.querySelector('.articleten > .first');
let width9=parseInt(window.getComputedStyle(box9,null).width);
function getLbt(parent){
    let sec9=parent.querySelectorAll('section');
    let lis9=parent.querySelectorAll('.pagers li');
    let next9=0,now9=0;
    let fl1=true,fl2=false;
    parent.querySelector('.rightbtn').onclick=function(){
        next9 = now9 + 1;
        if (next9>sec9.length-1){
            fl1=false;
        }
        if(fl1){
            animate(sec9[next9], {left: 0}, 400);
            animate(sec9[now9], {left: -width9}, 400, function () {
                fl2=true;
            });
            lis9[now9].classList.remove('first');
            lis9[next9].classList.add('first');
            now9 = next9;
        }

    };
    parent.querySelector('.leftbtn').onclick=function(){
        next9=now9-1;
        if(next9<0){
            fl2=false;
        }
        if(fl2){
            animate(sec9[next9],{left:0},400);
            animate(sec9[now9],{left:width9},400,function(){
                fl1=true;
            });
            lis9[now9].classList.remove('first');
            lis9[next9].classList.add('first');
            now9=next9;
        }

    }
}
let parent2=document.querySelectorAll('.articleten > div');
parent2.forEach(function(value){
    getLbt(value);
});/**
 * Created by Moonlight on 2017/4/4.
 */
