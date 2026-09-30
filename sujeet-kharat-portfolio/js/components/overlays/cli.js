(function (P) {
const {useState,useEffect,useRef}=React;
const {html,CLI_CMDS}=P;

function Cli({open,onClose}){
  const [hist,setHist]=useState([{k:'o',t:'Sujeet Kharat CLI. Type "help" to list commands.'}]);
  const [v,setV]=useState('');const out=useRef(null);const inp=useRef(null);
  useEffect(()=>{if(open)setTimeout(()=>{if(inp.current)inp.current.focus();},40);},[open]);
  useEffect(()=>{if(out.current)out.current.scrollTop=out.current.scrollHeight;},[hist,open]);
  if(!open)return null;
  const run=raw=>{
    const cmd=raw.trim().toLowerCase();
    if(cmd==='clear'){setHist([]);return;}
    const res=CLI_CMDS[cmd];
    setHist(h=>[...h,{k:'i',t:'$ '+raw},{k:'o',t:res!==undefined?res:(cmd?'Command not found: '+cmd+'. Type "help".':'')}]);
  };
  const onKey=e=>{
    if(e.key==='Enter'){run(v);setV('');}
    else if(e.key==='Escape'){onClose();}
  };
  return html`
    <div className="cli" role="dialog" aria-label="CLI shell">
      <div className="cli-bar"><span>sujeet@portfolio:~</span><button onClick=${onClose} aria-label="Close CLI shell">×</button></div>
      <div className="cli-out" ref=${out}>${hist.map((h,i)=>html`<div key=${i} className=${h.k==='i'?'in':''}>${h.t}</div>`)}</div>
      <div className="cli-row"><span>$</span><input ref=${inp} value=${v} onInput=${e=>setV(e.target.value)} onKeyDown=${onKey} placeholder="type help" aria-label="CLI command" autoCapitalize="off" autoCorrect="off" spellCheck="false"/></div>
    </div>`;
}

P.Cli=Cli;
})(window.Portfolio);
