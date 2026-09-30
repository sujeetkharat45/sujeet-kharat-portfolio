(function (P) {
const {useState,useEffect,useRef}=React;
const {html,reduce,G_ANCHOR,G_COLORS,G_PROJECTS,G_SKILLS,G_SUB}=P;

function SkillGraph(){
  const ref=useRef(null);const [info,setInfo]=useState(null);
  useEffect(()=>{
    const c=ref.current;const ctx=c.getContext('2d');
    let w=0,h=0,dpr=1,raf=0,frame=0,visible=true,hover=null,drag=null;
    const cols={};
    const readCols=()=>{const s=getComputedStyle(document.documentElement);
      ['accent','accent2','ok','warn','violet','text','muted'].forEach(k=>{cols[k]=s.getPropertyValue('--'+k+'-rgb').trim();});};
    const nodes=[];const byId={};
    Object.keys(G_PROJECTS).forEach(id=>{const n={id,type:'project',cat:'project',x:0,y:0,vx:0,vy:0,r:11};nodes.push(n);byId[id]=n;});
    G_SKILLS.forEach(([id,cat])=>{const n={id,type:'skill',cat,x:0,y:0,vx:0,vy:0,r:5};nodes.push(n);byId[id]=n;});
    const edges=[];
    Object.keys(G_PROJECTS).forEach(p=>G_PROJECTS[p].forEach(s=>edges.push({a:byId[p],b:byId[s],len:105,kind:'use'})));
    G_SUB.forEach(([a,b])=>edges.push({a:byId[a],b:byId[b],len:48,kind:'sub'}));
    const nbrs={};nodes.forEach(n=>{nbrs[n.id]=new Set();});
    edges.forEach(e=>{nbrs[e.a.id].add(e.b.id);nbrs[e.b.id].add(e.a.id);});
    const anchor=n=>{const a=G_ANCHOR[n.type==='project'?n.id:n.cat];return [a[0]*w,a[1]*h];};
    function init(){
      nodes.forEach(n=>{const a=anchor(n);n.x=a[0]+(Math.random()-.5)*120;n.y=a[1]+(Math.random()-.5)*120;});
    }
    function resize(){
      const r=c.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);
      const first=!w;w=r.width;h=r.height;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
      if(first)init();
      if(reduce){for(let i=0;i<300;i++)tick();draw();}
    }
    function tick(){
      const small=w<560;const rep=small?900:1700;
      for(let i=0;i<nodes.length;i++){
        const a=nodes[i];
        for(let j=i+1;j<nodes.length;j++){
          const b=nodes[j];let dx=a.x-b.x,dy=a.y-b.y;let d2=dx*dx+dy*dy;
          if(d2<1)d2=1;if(d2>26000)continue;const d=Math.sqrt(d2);const f=rep/d2;
          dx/=d;dy/=d;a.vx+=dx*f;a.vy+=dy*f;b.vx-=dx*f;b.vy-=dy*f;
        }
      }
      edges.forEach(e=>{
        const dx=e.b.x-e.a.x,dy=e.b.y-e.a.y,d=Math.hypot(dx,dy)||1;const k=.02*(d-e.len*(small?.7:1))/d;
        e.a.vx+=dx*k;e.a.vy+=dy*k;e.b.vx-=dx*k;e.b.vy-=dy*k;
      });
      nodes.forEach(n=>{
        const a=anchor(n);const s=n.type==='project'?.012:.0045;
        n.vx+=(a[0]-n.x)*s;n.vy+=(a[1]-n.y)*s;
        if(n===drag)return;
        n.vx*=.82;n.vy*=.82;n.x+=n.vx;n.y+=n.vy;
        n.x=Math.max(14,Math.min(w-14,n.x));n.y=Math.max(14,Math.min(h-14,n.y));
      });
    }
    const rgba=(k,a)=>'rgba('+cols[k]+','+a+')';
    function draw(){
      ctx.clearRect(0,0,w,h);
      if(frame%120===0)readCols();
      const hi=hover?nbrs[hover.id]:null;
      edges.forEach(e=>{
        const on=hover&&(e.a===hover||e.b===hover);
        const sk=e.a.type==='skill'?e.a:e.b;
        const col=e.kind==='sub'?'muted':G_COLORS[sk.cat];
        ctx.strokeStyle=rgba(col,hover?(on?.9:.05):(e.kind==='sub'?.3:.28));
        ctx.lineWidth=on?1.8:1;ctx.beginPath();ctx.moveTo(e.a.x,e.a.y);ctx.lineTo(e.b.x,e.b.y);ctx.stroke();
      });
      const small=w<560;
      nodes.forEach(n=>{
        const lit=!hover||n===hover||hi.has(n.id);
        const al=lit?1:.14;
        const k=n.type==='project'?'text':G_COLORS[n.cat];
        ctx.save();
        ctx.shadowColor=rgba(k,.9);ctx.shadowBlur=lit?(n===hover?22:11):0;
        ctx.fillStyle=rgba(k,al);
        ctx.beginPath();ctx.arc(n.x,n.y,n===hover?n.r+2:n.r,0,6.283);ctx.fill();
        ctx.restore();
        if(n.type==='project'){ctx.strokeStyle=rgba('text',al*.6);ctx.lineWidth=1;ctx.beginPath();ctx.arc(n.x,n.y,n.r+5,0,6.283);ctx.stroke();}
        const showLabel=n.type==='project'||!small||lit&&hover;
        if(showLabel){
          ctx.font=(n.type==='project'?'600 13px ':'500 11px ')+(n.type==='project'?"Sora,":"'JetBrains Mono',")+'sans-serif';
          ctx.textBaseline='middle';
          const right=n.x>w-110;ctx.textAlign=right?'right':'left';
          ctx.fillStyle=rgba('text',n.type==='project'?al:al*(lit&&hover?1:.72));
          const off=n.r+(n.type==='project'?9:6);
          ctx.fillText(n.id,n.x+(right?-off:off),n.y+(n.type==='project'?-1:0));
        }
      });
    }
    function loop(){frame++;if(visible){tick();draw();}raf=requestAnimationFrame(loop);}
    function nearest(e){
      const r=c.getBoundingClientRect();const mx=e.clientX-r.left,my=e.clientY-r.top;
      let best=null,bd=26;nodes.forEach(n=>{const d=Math.hypot(n.x-mx,n.y-my)-n.r;if(d<bd){bd=d;best=n;}});
      return {best,mx,my};
    }
    function setHover(n){
      if(n===hover)return;hover=n;
      if(!n){setInfo(null);c.style.cursor='crosshair';return;}
      c.style.cursor=drag?'grabbing':'grab';
      const rel=[...nbrs[n.id]];
      setInfo({id:n.id,type:n.type,cat:n.cat,rel});
    }
    const onMove=e=>{
      const {best,mx,my}=nearest(e);
      if(drag){drag.x=mx;drag.y=my;drag.vx=0;drag.vy=0;return;}
      if(e.pointerType==='mouse')setHover(best);
    };
    const onDown=e=>{
      const {best}=nearest(e);
      if(e.pointerType==='mouse'){if(best){drag=best;setHover(best);c.setPointerCapture(e.pointerId);c.style.cursor='grabbing';}}
      else setHover(best);
    };
    const onUp=e=>{drag=null;if(e.pointerType==='mouse')c.style.cursor=hover?'grab':'crosshair';};
    const onLeave=e=>{if(!drag&&e.pointerType==='mouse')setHover(null);};
    const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});io.observe(c);
    readCols();resize();
    window.addEventListener('resize',resize);
    c.addEventListener('pointermove',onMove);c.addEventListener('pointerdown',onDown);c.addEventListener('pointerup',onUp);c.addEventListener('pointerleave',onLeave);
    if(!reduce)raf=requestAnimationFrame(loop);
    return()=>{cancelAnimationFrame(raf);io.disconnect();window.removeEventListener('resize',resize);
      c.removeEventListener('pointermove',onMove);c.removeEventListener('pointerdown',onDown);c.removeEventListener('pointerup',onUp);c.removeEventListener('pointerleave',onLeave);};
  },[]);
  const relText=info&&(info.type==='project'?'Built with: ':'Used in / linked to: ')+info.rel.join(', ');
  return html`
    <div className="graph-card hud">
      <div className="graph-stage">
        <canvas ref=${ref} role="img" aria-label="Interactive graph linking my skills to the projects where I used them"></canvas>
        <div className="g-info">${info?html`<b>${info.id}</b><span>${info.type==='project'?'Project':info.cat}</span><span>${info.rel.length?relText:'Core skill'}</span>`:html`<b>Skill graph</b><span>Hover a node to trace where it was used.</span>`}</div>
      </div>
      <div className="g-legend">
        ${Object.keys(G_COLORS).map(k=>html`<span key=${k}><i style=${{'--c':'var(--'+G_COLORS[k]+')'}}></i>${k}</span>`)}
        <span><i style=${{'--c':'var(--text)'}}></i>Project</span>
        <span className="hint">drag nodes to rearrange · tap on touch screens</span>
      </div>
      <p className="sr">Backend: Java, Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate, REST APIs, JDBC. Frontend: React, JavaScript, HTML5, CSS3, Tesseract.js, Regex. Database: SQL, PL/SQL, Oracle DB, PostgreSQL, MongoDB. Tools: Git, GitHub, Maven, Postman. Core CS: OOP, Collections, Exception handling, Data structures, DBMS, Operating systems, Networks.</p>
    </div>`;
}

P.SkillGraph=SkillGraph;
})(window.Portfolio);
