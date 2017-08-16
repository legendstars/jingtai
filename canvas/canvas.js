/**
 * Created by Moonlight on 2017/3/28.
 */
window.onload=function(){
    class Canvas{
        constructor(context){
            this.con=context;
            this.way='fill';
            this.lineWidth=4;
            this.fillColor='red';
            this.strokeColor='green';
            this.color=ArrColor['red','blue'];
            this.radialR=10;
            this.n=3;
            this.delSize=20;
        }
        paintLine(ox,oy,nx,ny){
            this.con.beginPath();
            this.con.moveTo(ox,oy);
            this.con.lineTo(nx,ny);
            this.con.closePath();
            this.con.color=this.strokeColor;
            this.con.lineWidth=this.lineWidth;
            this.con.stroke();
        }
        paintRect(ox,oy,nx,ny){
            this.con.beginPath();
            if(this.way=='fill'){
                this.con.color=this.fillColor;
                this.con.fillRect(ox,oy,nx-ox,ny-oy);
            }else{
                this.con.lineWidth=this.lineWidth;
                this.con.color=this.strokeColor;
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
                this.con.color=this.fillColor;
                this.con.fill();
            }else{
                this.con.color=this.strokeColor;
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
                this.con.color=this.fillColor;
                this.con.fill();
            }else{
                this.con.color=this.strokeColor;
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
                this.con.color=this.fillColor;
                this.con.fill();
            }else{
                this.con.color=this.strokeColor;
                this.con.stroke();
            }
        }
        delPaint(nx,ny){
            this.con.clearRect(nx-this.delSize/2,ny-this.delSize/2,this.delSize,this.delSize);
        }
    }



}
