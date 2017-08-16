/**
 * Created by Moonlight on 2017/4/4.
 */
$(function(){
    let n=0;
    let box=$('.banner');
    let lis=$('.banner > ul > li');
    let as=$('.circle ul li');
    let flag=true;
    let m;
    let move=function(way='right'){
        if(way=='right'){
            n++;
            if(n>lis.length-1){
                n=0;
            }
        }
        if(way=='left'){
            n--;
            if(n<0){
                n=lis.length-1;
            }
        }
        lis.each(function(i){
            lis.eq(i).removeClass('first');
            as.eq(i).removeClass('circleone');
        });
        lis.eq(n).addClass('first');
        as.eq(n).addClass('circleone');
    };


    let t=setInterval(move,1500);
    box.hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,1500);
    });
    as.each(function(index){
        $(this).hover(function(){
            m=setTimeout(function(){
                as.each(function(i){
                    as.eq(i).removeClass('circleone');
                    lis.eq(i).removeClass('first');
                });
                as.eq(index).addClass('circleone');
                lis.eq(index).addClass('first');
                n=index;
            },200)
        },function(){
            clearTimeout(m);
        });
    });

    $('#prev-left').click(function(){
        if(flag){
            flag=false;
            move('left');
        }
    });

    $('#prev-right').click(function(){
        if(flag){
            flag=false;
            move('right');
        }
    });

    lis.each(function(){
        this.addEventListener('transitionend',function(){
            flag=true;
        });
    });






    //let menu=document.querySelector('.top div');
    //let topRight=document.querySelector('.topright ');
    let menu=$('.top div');
    let topRight=$('.topright');
    topRight.on('mouseover',function(){
        topRight[0].style.background='#fff';
        menu[0].style.height='98px';
    });
    topRight.on('mouseout',function(){
        topRight[0].style.background='#424242';
        menu[0].style.height='0';
    });
    menu.on('mouseover',function(){
        menu[0].style.height='98px';
    });
    menu.on('mouseout',function(){
        menu[0].style.height='0';
    });



    //let lis2=document.querySelectorAll('.categoryfirst li');
    //let divs=document.querySelectorAll('.children');
    let lis2=$('.categoryfirst li');
    let divs=$('.children');
    lis2.each(function(index){
        $(this).on('mouseover',function(){
            lis2.each(function(i){
                lis2[i].style.background='none';
                divs[i].style.display='none';
            });

            this.style.background='#ff6700';
            divs[index].style.display='block';
        });

        $(this).on('mouseout',function(){
            divs[index].style.display='none';
            this.style.background='none';
        });
    });


    divs.each(function(){
        $(this).on('mouseover',function(){
            this.style.display='block';
        });
        $(this).on('mouseout',function(){
            this.style.display='none';
        })
    });




    let span=$('.containerleft span.one');
    let parent=$('.site-header .lists');
    let xs=$('.site-header .containerleft > div');
    let lists=$('.site-header .lists ul');
    let time;
    xs.on('mouseover',function(){
        parent.get(0).style.borderTop='1px solid #ccc';
        animate(parent.get(0),{height:230},500);
    });
    xs.on('mouseout',function(){
        clearTimeout(time);
        animate(parent.get(0),{height:0},500);
        parent.get(0).style.borderTop=0;
    });


    span.each(function(index){
        $(this).on('mouseover',function(){
            time=setTimeout(function(){
                lists.each(function(i){
                    lists.eq(i).removeClass('first');
                });
                lists.eq(index).addClass('first');
            },200)
        });
    });




    function getXxk(parent){
        let lis1=$('div.title a',parent);
        let brick=$('section',parent);
        lis1.each(function(index){
            $(this).on('mouseover',function(){
                lis1.each(function(i){
                    lis1.eq(i).removeClass('first');
                    brick.eq(i).removeClass('brick-list');
                });
                lis1.eq(index).addClass('first');
                brick.eq(index).addClass('brick-list');
            });
        })
    }

    let parent1=$('.change');
    parent1.each(function(){
        getXxk(this);
    });





    let box4=$('.articlethree section');
    let lis4=$('ul',box4);
    let btn4=$('.articlethree .title a');
    let now=0;
    let next=0;
    let t4;
    let t5;
    let flagl=false,
        flagr=true;
    let width=parseInt(window.getComputedStyle(box4.get(0),null).width);
    let div4=$('.articlethree .title div');
    function move4() {
        if(flagr){
            flagr = false;
            next = now + 1;
            lis4[next].style.left = '100%';
            animate(lis4[next], {left: 0}, 400);
            animate(lis4[now], {left: -width}, 400, function () {
                flagl = true;
            });
            btn4.eq(now).removeClass('one');
            btn4.eq(next).addClass('one');
            now = next;
        }
    }
    function move5(){
        if(flagl){
            next=now-1;
            flagl=false;
            lis4[next].style.left='-100%';
            animate(lis4[next],{left:0},400);
            animate(lis4[now],{left:width},400,function(){
                flagr=true;
            });
        }
        btn4.eq(now).removeClass('one');
        btn4.eq(next).addClass('one');
        now=next;
    }
    t4=setInterval(move4,2500);
    t5=setInterval(move5,2500);


    $(div4).on('mouseover',function(){
        clearInterval(t4);
        clearInterval(t5);
    });

    $(div4).on('mouseout',function(){
        t4=setInterval(move4,2500);
        t5=setInterval(move5,2500);
    });


    $('.left',div4).on('click',function(){
        move5();
    });
    $('.right',div4).on('click',function(){
        move4();
    });




    let box8=$('#eight section');
    let lis8=$('ul',box8);
    let btn8=$('#eight .title div a');
    let now8=0;
    let next8=0;
    let flag8=false,
        flag9=true;
    let width8=parseInt(window.getComputedStyle(box8.get(0),null).width);

    let div8=$('#eight .title div');
        $('.right8',div8).on('click',function(){
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
            btn8.each((index,val)=>{
                $(val).removeClass('one');
            });

            $(this).addClass('one');
        });


    $('.left8',div8).on('click',function(){
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
        btn8.each((index,val)=>{
            $(val).removeClass('one');
        });
        $(this).addClass('one');
    });




    let box9=$('.articleten > .first');
    let width9=parseInt(window.getComputedStyle(box9.get(0),null).width);
    function getLbt(parent){
        let sec9=$('section',parent);
        let lis9=$('.pagers li',parent);
        let next9=0,now9=0;
        let fl1=true,fl2=false;
        $('.rightbtn',parent).on('click',function(){
            next9 = now9 + 1;
            if (next9>sec9.length-1){
                fl1=false;
            }
            if(fl1){
                animate(sec9[next9], {left: 0}, 400);
                animate(sec9[now9], {left: -width9}, 400, function () {
                    fl2=true;
                });
                lis9.eq(now9).removeClass('first');
                lis9.eq(next9).addClass('first');
                now9 = next9;
            }
        });


        $('.leftbtn',parent).on('click',function(){
            next9=now9-1;
            if(next9<0){
                fl2=false;
            }
            if(fl2){
                animate(sec9[next9],{left:0},400);
                animate(sec9[now9],{left:width9},400,function(){
                    fl1=true;
                });
                lis9.eq(now9).removeClass('first');
                lis9.eq(next9).addClass('first');
                now9=next9;
            }
        })
    }
    let parent2=$('.articleten > div');
    parent2.each(function(){
        getLbt(this);
    });
})
