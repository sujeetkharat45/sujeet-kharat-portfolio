(function (P) {
const {useState,useEffect,useRef}=React;
const {html,reduce,SCENES}=P;

function Terminal(){
  const [lines,setLines]=useState([]);const [typing,setTyping]=useState('');
  const wrap=useRef(null);const [tilt,setTilt]=useState({x:0,y:0});
  useEffect(()=>{
    if(reduce){const all=[];SCENES.slice(0,3).forEach(s=>{all.push({t:'cmd',s:s.cmd});s.out.forEach(o=>all.push(o));});setLines(all);return;}
    let dead=false;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    (async()=>{
      await sleep(900);
      while(!dead){
        for(let i=0;i<SCENES.length&&!dead;i++){
          const sc=SCENES[i];
          if(i===0||i===2)setLines([]);
          for(let k=1;k<=sc.cmd.length&&!dead;k++){setTyping(sc.cmd.slice(0,k));await sleep(24+Math.random()*30);}
          setTyping('');setLines(l=>[...l,{t:'cmd',s:sc.cmd}]);await sleep(420);
          for(const o of sc.out){if(dead)break;setLines(l=>[...l,o]);await sleep(380);}
          await sleep(1800);
        }
      }
    })();
    return()=>{dead=true;};
  },[]);
  const onMove=e=>{if(reduce)return;const r=wrap.current.getBoundingClientRect();
    setTilt({x:((e.clientY-r.top)/r.height-.5)*-8,y:((e.clientX-r.left)/r.width-.5)*10});};
  return html`
    <div className="term-wrap" ref=${wrap} onMouseMove=${onMove} onMouseLeave=${()=>setTilt({x:0,y:0})}>
      <div className="term hud" style=${{transform:'rotateX('+tilt.x+'deg) rotateY('+tilt.y+'deg)'}} role="img" aria-label="Animated sample of ETMS API requests showing role-based access control">
        <div className="term-bar"><span></span><span></span><span></span><em>etms-api · sample session</em><u>JWT · BCRYPT</u></div>
        <div className="term-body">
          ${lines.map((l,i)=>html`<div key=${i} className=${'t-'+l.t}>${l.t==='cmd'?'▸ ':'  '}${l.s}</div>`)}
          ${(typing||!lines.length)&&html`<div className="t-cmd">▸ ${typing}<span className="caret"></span></div>`}
        </div>
      </div>
    </div>`;
}

P.Terminal=Terminal;
})(window.Portfolio);
