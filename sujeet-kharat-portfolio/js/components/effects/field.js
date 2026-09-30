(function (P) {
const {useEffect,useRef}=React;
const {html,reduce}=P;

/* ---------- 3D point field ---------- */
function Field(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;const ctx=c.getContext('2d');
    let w=0,h=0,dpr=1,raf=0,frame=0,visible=true,pts=[],pairs=[],ay=0,rx=0,ry=0;
    const mouse={x:-9999,y:-9999};let colA='60,240,255',colB='255,92,122';
    const corners=[];[-1.25,1.25].forEach(x=>[-1,1].forEach(y=>[-1,1].forEach(z=>corners.push([x,y,z]))));
    const cedges=[];for(let i=0;i<8;i++)for(let j=i+1;j<8;j++){let d=0;for(let k=0;k<3;k++)if(corners[i][k]!==corners[j][k])d++;if(d===1)cedges.push([i,j]);}
    const readColors=()=>{const s=getComputedStyle(document.documentElement);colA=s.getPropertyValue('--accent-rgb').trim()||colA;colB=s.getPropertyValue('--accent2-rgb').trim()||colB;};
    const proj=(x,y,z)=>{
      const a=ay+ry,ca=Math.cos(a),sa=Math.sin(a),cx=Math.cos(rx),sx=Math.sin(rx);
      const x1=x*ca+z*sa,z1=-x*sa+z*ca,y1=y*cx-z1*sx,z2=y*sx+z1*cx;
      const f=3.2/(3.2-z2);
      return [w*.5+x1*w*.34*f,h*.5+y1*h*.38*f,f];
    };
    const resize=()=>{
      const r=c.parentElement.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);
      w=r.width;h=r.height;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      const n=Math.max(60,Math.min(140,Math.round(w*h/9000)));
      pts=Array.from({length:n},()=>({x:Math.random()*2.5-1.25,y:Math.random()*2-1,z:Math.random()*2-1,r:Math.random()*1.4+.8}));
      pairs=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y,pts[i].z-pts[j].z);if(d<.46)pairs.push([i,j,d]);}
      if(reduce)draw();
    };
    function draw(){
      ctx.clearRect(0,0,w,h);
      if(frame%90===0)readColors();
      if(!reduce){
        ay+=.0014;
        const tx=mouse.x>-9000?(mouse.x/w-.5)*.9:0,ty=mouse.y>-9000?(mouse.y/h-.5)*.5:0;
        ry+=(tx-ry)*.04;rx+=(ty-rx)*.04;
      }
      const P=pts.map(p=>proj(p.x,p.y,p.z));
      ctx.lineWidth=1;ctx.strokeStyle='rgba('+colA+',.16)';
      const C=corners.map(q=>proj(q[0],q[1],q[2]));
      ctx.beginPath();cedges.forEach(e=>{ctx.moveTo(C[e[0]][0],C[e[0]][1]);ctx.lineTo(C[e[1]][0],C[e[1]][1]);});ctx.stroke();
      for(const pr of pairs){
        const a=P[pr[0]],b=P[pr[1]];const depth=Math.max(.2,Math.min(1,((a[2]+b[2])/2-.7)*1.2));
        ctx.strokeStyle='rgba('+colA+','+(.34*(1-pr[2]/.46)*depth)+')';
        ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
      }
      for(let i=0;i<P.length;i++){
        const q=P[i],f=q[2];
        const m=Math.hypot(q[0]-mouse.x,q[1]-mouse.y);
        if(m<170){ctx.strokeStyle='rgba('+colB+','+(.6*(1-m/170))+')';ctx.beginPath();ctx.moveTo(q[0],q[1]);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
        ctx.fillStyle='rgba('+colA+','+Math.max(.25,Math.min(.95,(f-.55)*1.1))+')';
        ctx.beginPath();ctx.arc(q[0],q[1],pts[i].r*f*1.3,0,6.283);ctx.fill();
      }
    }
    function loop(){frame++;if(visible)draw();raf=requestAnimationFrame(loop);}
    const onMove=e=>{const r=c.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;};
    const onLeave=()=>{mouse.x=-9999;mouse.y=-9999;};
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});io.observe(c);
    readColors();resize();
    window.addEventListener('resize',resize);window.addEventListener('mousemove',onMove);document.addEventListener('mouseleave',onLeave);
    if(!reduce)raf=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(raf);io.disconnect();window.removeEventListener('resize',resize);window.removeEventListener('mousemove',onMove);document.removeEventListener('mouseleave',onLeave);};
  },[]);
  return html`<canvas className="field" ref=${ref} aria-hidden="true"></canvas>`;
}

P.Field=Field;
})(window.Portfolio);
