/**
 * Created by Moonlight on 2017/4/5.
 */
$(function(){
    class Canvas{
        constructor(context){
            this.con=context;
            this.way='fill';
            this.lineWidth=4;
            this.fillColor='red';
            this.strokeColor='green';
            this.color=['red','blue'];
            this.radialR=10;
            this.n=3;
            this.delSize=20;
        }
        paintLine(ox,oy,nx,ny){
            this.con.beginPath();
            this.con.moveTo(ox,oy);
            this.con.lineTo(nx,ny);
            this.con.closePath();
            this.con.strokeStyle=this.strokeColor;
            this.con.lineWidth=this.lineWidth;
            this.con.stroke();
        }
        paintRect(ox,oy,nx,ny){
            this.con.beginPath();
            if(this.way=='fill'){
                this.con.fillStyle=this.fillColor;
                this.con.fillRect(ox,oy,nx-ox,ny-oy);
            }else{
                this.con.lineWidth=this.lineWidth;
                this.con.strokeStyle=this.strokeColor;
                this.con.strokeRect(ox,oy,nx-ox,ny-oy);
            }
            this.con.closePath();
        }
        paintCircle(ox,oy,nx,ny){
            this.con.beginPath();
            let r=Math.sqrt(Math.pow(ox-nx,2)+Math.pow(oy-ny,2));
            this.con.arc(ox,oy,r,0,Math.PI*2);
            this.con.closePath();
            if(this.way=='fill'){
                this.con.fillStyle=this.fillColor;
                this.con.fill();
            }else{
                this.con.strokeStyle=this.strokeColor;
                this.con.stroke();
            }
        }
        paintRadialCircle(ox,oy,nx,ny){
            this.con.beginPath();
            let r=Math.sqrt(Math.pow(ox-nx,2)+Math.pow(oy-ny,2));
            this.con.arc(ox,oy,r,0,Math.PI*2);
            this.con.closePath();
            let radial=this.con.createRadialGradient(ox,oy,0,ox,oy,r);
            radial.addColorStop(0,this.color[0]);
            radial.addColorStop(1,this.color[1]);
            this.con.fillStyle=radial;
            this.con.fill();
        }
        paintRadialRect(ox,oy,nx,ny){
            this.con.beginPath();
            this.con.moveTo(ox+this.radialR,oy);
            this.con.arcTo(nx,oy,nx,oy+this.radialR,this.radialR);
            this.con.arcTo(nx,ny,nx-this.radialR,ny,this.radialR);
            this.con.arcTo(ox,ny,ox,ny-this.radialR,this.radialR);
            this.con.arcTo(ox,oy,ox+this.radialR,oy,this.radialR);
            this.con.closePath();
            if(this.way=='fill'){
                this.con.fillStyle=this.fillColor;
                this.con.fill();
            }else{
                this.con.strokeStyle=this.strokeColor;
                this.con.stroke();
            }
        }
        paintLinearRadialRect(ox,oy,nx,ny){
            this.con.beginPath();
            this.con.moveTo(ox+this.radialR,oy);
            this.con.arcTo(nx,oy,nx,oy+this.radialR,this.radialR);
            this.con.arcTo(nx,ny,nx-this.radialR,ny,this.radialR);
            this.con.arcTo(ox,ny,ox,ny-this.radialR,this.radialR);
            this.con.arcTo(ox,oy,ox+this.radialR,oy,this.radialR);
            this.con.closePath();
            let linear=this.con.createLinearGradient(ox,oy,nx,oy);
            linear.addColorStop(0,this.color[0]);
            linear.addColorStop(1,this.color[1]);
            this.con.fillStyle=linear;
            this.con.fill();
        }
        paintPoly(ox,oy,nx,ny){
            this.con.beginPath();
            let r=Math.sqrt(Math.pow(ox-nx,2)+Math.pow(oy-ny,2));
            let ran=360/this.n;
            for(let i=0;i<this.n;i++){
                this.con.lineTo(ox+Math.sin((i*ran+45)*Math.PI/180)*r,oy+Math.cos((i*ran+45)*Math.PI/180)*r)
            }
            this.con.closePath();
            if(this.way=='fill'){
                this.con.fillStyle=this.fillColor;
                this.con.fill();
            }else{
                this.con.strokeStyle=this.strokeColor;
                this.con.stroke();
            }
        }
        delPaint(nx,ny){
            this.con.clearRect(nx-this.delSize/2,ny-this.delSize/2,this.delSize,this.delSize);
        }
    }




    let divs=$('.gongju div[type]');
    divs.each((index,val)=>{
        $(val).on('click',function(){
            divs.each((index,val)=>{
                $(val).removeClass('active');
            });
            current=val.getAttribute('type');
            $(this).addClass('active');
        })
    });



    let xin=$('div[type=new]');
    let save=$('div[type=save]');
    let returns=$('div[type=return]');
    let newobj;
    let arr=[];
    let context;
    let newcanvas;
    let current='line';
    xin.on('click',function(){
        let canvas=$('canvas');
        if(canvas.length){
            let result=window.confirm('确定保存？');
            if(result){
                let data=canvas[0].toDataURL('image/png');
                location.href=data.replace('data:image/png','data:stream/octet');
            }
            document.body.removeChild(canvas[0]);
        }

        let newcanvas=$('<canvas>').appendTo(document.body);
        newcanvas[0].width=1000;
        newcanvas[0].height=500;
        newcanvas[0].style.border='1px solid #000';
        context=newcanvas[0].getContext('2d');
        newobj=new Canvas(context);
        newcanvas.on('mousedown',function(e){
            let ox=e.offsetX;
            let oy=e.offsetY;
            newcanvas.on('mousemove.aa',function(e){
                let nx=e.offsetX;
                let ny=e.offsetY;
                if(current=='del'){
                    newobj.delPaint(nx,ny);
                }else{
                    context.clearRect(0,0,newcanvas[0].width,newcanvas[0].height);
                    if(arr.length>0){
                        context.putImageData(arr[arr.length-1],0,0)
                    }
                    switch(current){
                        case 'line': newobj.paintLine(ox,oy,nx,ny);
                            break;
                        case 'rect': newobj.paintRect(ox,oy,nx,ny);
                            break;
                        case 'circle': newobj.paintCircle(ox,oy,nx,ny);
                            break;
                        case 'gradientCircle': newobj.paintRadialCircle(ox,oy,nx,ny);
                            break;
                        case 'radialRect': newobj.paintRadialRect(ox,oy,nx,ny);
                            break;
                        case 'gradientRadialRect': newobj.paintLinearRadialRect(ox,oy,nx,ny);
                            break;
                        case 'poly': newobj.paintPoly(ox,oy,nx,ny);
                            break;
                    }
                }
            })

        })

        newcanvas.on('mouseup',function(){
            arr.push(context.getImageData(0,0,newcanvas[0].width,newcanvas[0].height));
            newcanvas.off('.aa');
        })
    });


    save.on('click',function(){
        let canvas=$('canvas');
        if(canvas.length){
            let result=window.confirm('确定保存？');
            if(result){
                let data=canvas[0].toDataURL('image/png');
                location.href=data.replace('data:image/png','data:stream/octet');
            }

        }
    });


    returns.on('click',function(){
        arr.pop();
        if(arr.length<1){
            alert('stop');
            context.clearRect(0,0,newcanvas[0].width,newcanvas[0].height);
        }else{
            context.putImageData(arr[arr.length-1],0,0);
        }
    });


    let fill=$('div.fill');
    let stroke=$('div.stroke');
    let ways=$('.way div');
    fill.on('click',function(){
        newobj.way='fill';
        ways.each(function(i){
            ways.eq(i).removeClass('active');
        });
        $(this).addClass('active');
    });


    stroke.on('click',function(){
        newobj.way='stroke';
        ways.each(function(i){
            ways.eq(i).removeClass('active');
        });
        $(this).addClass('active');
    });



    let color1=$('.color input[type=color]');
    color1.each(function(index,val){
        $(this).on('change',function(){
            if(index==0){
                newobj.fillColor=val.value;
            }else{
                newobj.strokeColor=val.value;
            }
        });
    });


    let color2=$('.gradient input[type=color]');
    color2.each(function(index,val){
        $(this).on('change',function(){
            switch(index){
                case 0:newobj.color[0]=val.value;break;
                case 1:newobj.color[1]=val.value;break;
            }
        });
    });




    let shu=$('input[type=number]');
    shu.each((index,val)=>{
        $(this).on('change',function(){
            let aa=val.getAttribute('tian');
            newobj[aa]=parseInt(val.value);
        });
    });

})
