(function (P) {
const {useState,useEffect,useRef}=React;
const {html}=P;

/* ---------- command palette ---------- */
function Palette({open,onClose,cmds}){
  const [q,setQ]=useState('');const [i,setI]=useState(0);const inp=useRef(null);
  const list=cmds.filter(c=>c.l.toLowerCase().includes(q.toLowerCase()));
  useEffect(()=>{if(open){setQ('');setI(0);setTimeout(()=>{if(inp.current)inp.current.focus();},30);}},[open]);
  if(!open)return null;
  const run=c=>{onClose();setTimeout(()=>c.f(),80);};
  const onKey=e=>{
    if(e.key==='Escape'){onClose();}
    else if(e.key==='ArrowDown'){e.preventDefault();setI(x=>Math.min(x+1,list.length-1));}
    else if(e.key==='ArrowUp'){e.preventDefault();setI(x=>Math.max(x-1,0));}
    else if(e.key==='Enter'&&list[i]){run(list[i]);}
  };
  return html`
    <div className="pal-back" onClick=${onClose}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette" onClick=${e=>e.stopPropagation()} onKeyDown=${onKey}>
        <input ref=${inp} value=${q} onInput=${e=>{setQ(e.target.value);setI(0);}} placeholder="Type a command or section…" aria-label="Command"/>
        <ul>
          ${list.map((c,n)=>html`<li key=${c.l} className=${n===i?'sel':''} onMouseEnter=${()=>setI(n)} onClick=${()=>run(c)}><span>${c.l}</span><kbd>${c.h||''}</kbd></li>`)}
          ${!list.length&&html`<li className="empty">No matching command</li>`}
        </ul>
      </div>
    </div>`;
}

P.Palette=Palette;
})(window.Portfolio);
