
$(document).ready(function(){
    class Game{
        constructor(obj){
            this.obj=obj;
            this.she=[
                {x:0,y:0},
                {x:1,y:0},
                {x:2,y:0}
            ];
            this.way='right';
            this.food={a:0,b:0};
            this.t=0;
        }
        drawscreen(){
            for(let i=0;i<20;i++){
                for(let j=0;j<20;j++){
                    //let div=document.createElement('div');
                    $('<div>',{id:'c'+j+'-'+i}).appendTo(this.obj);
                    //div.id='c'+j+'-'+i;
                    //this.obj.appendChild(div);
                }
            }
        }
        drawshe(){
            //this.she.forEach(function(obj){
            $(this.she).each(function(obj){
                let idname=obj.x+'-'+obj.y;
                $('#c'+idname).addClass('she');
            })

                //let domObj=document.querySelector('#c'+idname);

                //domObj.className='she';
            //});

        }
        //��麯�����������ʳ���Ƿ������������
        check(a,b,arr){
            let result=arr.some(function(value){
                return value.x==a&&value.y==b;
            });
            return result;
        }
        //�������һ��ʳ��
        getFood(){
            let a,b;
            do{
                a=Math.floor(Math.random()*20);
                b=Math.floor(Math.random()*20);

            }while(this.check(a,b,this.she));
            //let food=document.querySelector('#c'+a+'-'+b);
            $('#c'+a+'-'+b).addClass('food');
            //food.className='food';
            this.food={a,b};
        }

        move(){
            this.t=setInterval(()=>{
                let newhead;
                let oldhead=this.she[this.she.length-1];
                switch(this.way){
                    case 'right':
                        newhead={x:oldhead.x+1,y:oldhead.y};
                        break;
                    case 'left':
                        newhead={x:oldhead.x-1,y:oldhead.y};
                        break;
                    case 'top':
                        newhead={x:oldhead.x,y:oldhead.y-1};
                        break;
                    case 'bottom':
                        newhead={x:oldhead.x,y:oldhead.y+1};
                        break;
                }
                //let domObj=document.querySelector('#c'+newhead.x+'-'+newhead.y);
                let domObj=$('#c'+newhead.x+'-'+newhead.y).get(0);
                //���û����ͷ������ͷ�������ϣ�������Ϸ����
                if(!domObj||this.check(newhead.x,newhead.y,this.she)){
                    alert('Game Over');
                    clearInterval(this.t);
                    return;
                }
                //����ͷ���������������ʾ����
                domObj.className='she';
                //�������ߵ����������ͷ������
                this.she.push(newhead);
                //�����ͷ�������ʳ�������һ�������߳Ե���ʳ����³���һ��ʳ��
                if(newhead.x==this.food.a&&newhead.y==this.food.b){
                    this.getFood();
                }else{
                    //let oldend=this.she[0];
                    //��þ�β
                    //let oldendobj=document.querySelector('#c'+this.she[0].x+'-'+this.she[0].y);
                    //�þ�β������Ϊ�գ�����������ʾ
                    $('#c'+this.she[0].x+'-'+this.she[0].y).removeClass();
                    //oldendobj.className='';
                    //�ڱ����ߵ�������ɾ����һ�����ݣ�����β������
                    this.she.shift();
                }

            },200)

        }
        keydown(){
            //document.onkeydown=(e)=>{
            $(document).on("keydown",(e)=>{
                let code=e.keyCode;
                switch (code){
                    case 37:
                        if(this.way=='right'){
                            return;
                        }
                        this.way='left';
                        break;
                    case 38:
                        if(this.way=='bottom'){
                            return;
                        }
                        this.way='top';
                        break;
                    case 39:
                        if(this.way=='left'){
                            return;
                        }
                        this.way='right';
                        break;
                    case 40:
                        if(this.way=='top'){
                            return;
                        }
                        this.way='bottom';
                        break;
                }
            })

            //}
        }
        play(){
            this.drawscreen() ;
            this.drawshe();
            this.getFood();
            this.move();
            this.keydown();
        }

    }
    //let box=document.querySelector('.box');
    let box=$('.box');
    let obj=new Game(box);
    obj.play();
})