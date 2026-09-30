(function (P) {
const {useState,useEffect,useRef}=React;
const {EMAIL,GITHUB,LINKEDIN,html,reduce,About,Boot,Cli,Contact,Hero,Journey,NAV,Palette,Projects,Skills,Status}=P;

function App(){
  const [theme,setTheme]=useState(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  const [active,setActive]=useState('');
  const [phase,setPhase]=useState(reduce?'ready':'boot');
  const [pal,setPal]=useState(false);
  const [cli,setCli]=useState(false);const [toast,setToast]=useState('');const tt=useRef(null);
  const notify=m=>{setToast(m);clearTimeout(tt.current);tt.current=setTimeout(()=>setToast(''),2200);};
  const bar=useRef(null);const pct=useRef(null);const ret=useRef(null);const coord=useRef(null);
  useEffect(()=>{document.documentElement.setAttribute('data-theme',theme);},[theme]);
  useEffect(()=>{document.body.style.overflow=phase==='boot'?'hidden':'';},[phase]);
  useEffect(()=>{
    const onScroll=()=>{const d=document.documentElement;const p=Math.min(1,d.scrollTop/((d.scrollHeight-d.clientHeight)||1));
      if(bar.current)bar.current.style.transform='scaleX('+p+')';if(pct.current)pct.current.textContent=Math.round(p*100);};
    const onMove=e=>{const s=document.documentElement.style;s.setProperty('--mx',e.clientX+'px');s.setProperty('--my',e.clientY+'px');
      if(ret.current)ret.current.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)';
      if(coord.current)coord.current.textContent='x'+Math.round(e.clientX)+' y'+Math.round(e.clientY);};
    const onKey=e=>{
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPal(p=>!p);}
      else if(e.key==='/'&&!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||'')){e.preventDefault();setPal(true);}
      else if(e.key==='`'&&!/INPUT|TEXTAREA/.test((document.activeElement||{}).tagName||'')){e.preventDefault();setCli(c=>!c);}
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('keydown',onKey);
    if(window.matchMedia('(hover: hover)').matches)window.addEventListener('mousemove',onMove);
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:'-40% 0px -55% 0px'});
    NAV.forEach(([id])=>{const el=document.getElementById(id);if(el)io.observe(el);});
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('mousemove',onMove);window.removeEventListener('keydown',onKey);io.disconnect();};
  },[]);
  const go=id=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:reduce?'auto':'smooth'});};
  const cmds=[
    {l:'Go to top',f:()=>go('top')},
    {l:'Open CLI shell',h:'>_',f:()=>setCli(true)},
    ...NAV.map(([id,l])=>({l:'Go to '+l,f:()=>go(id)})),
    {l:'Toggle light / dark theme',h:'theme',f:()=>setTheme(t=>t==='dark'?'light':'dark')},
    {l:'Copy email address',h:'copy',f:()=>{try{navigator.clipboard.writeText(EMAIL).then(()=>notify('Email copied'),()=>notify('Copy failed'));}catch(err){notify('Copy failed');}}},
    {l:'Open GitHub profile',h:'link',f:()=>window.open(GITHUB,'_blank','noopener')},
    {l:'Open LinkedIn profile',h:'link',f:()=>window.open(LINKEDIN,'_blank','noopener')},
    {l:'Send an email',h:'mail',f:()=>{window.location.href='mailto:'+EMAIL;}}
  ];
  return html`
    <div>
      <div className="glow" aria-hidden="true"></div>
      <div className="progress" ref=${bar} aria-hidden="true"></div>
      <div className="reticle" ref=${ret} aria-hidden="true"><i></i><b ref=${coord}></b></div>
      ${phase==='boot'||!reduce?html`<${Boot} onDone=${()=>setPhase('ready')}/>`:null}
      <nav className="nav" aria-label="Primary">
        <div className="wrap">
          <a className="brand" href="#top">Sujeet<i>.</i>dev</a>
          <div className="links">${NAV.map(([id,l])=>html`<a key=${id} href=${'#'+id} className=${active===id?'on':''}>${l}</a>`)}</div>
          <button className="kbd-btn cli-btn" onClick=${()=>setCli(c=>!c)} aria-label="Toggle CLI shell"><b className="ic">${'>_'}</b><span>CLI</span></button>
          <button className="kbd-btn" onClick=${()=>setPal(true)} aria-label="Open command palette"><b className="ic">⌕</b><span>Search</span><kbd>Ctrl K</kbd></button>
          <button className="icon-btn" onClick=${()=>setTheme(theme==='dark'?'light':'dark')} aria-label=${'Switch to '+(theme==='dark'?'light':'dark')+' theme'}>${theme==='dark'?'☀':'☾'}</button>
        </div>
      </nav>
      <main>
        ${phase==='ready'?html`<${Hero} onCli=${()=>setCli(true)}/>`:html`<div style=${{minHeight:'100svh'}}></div>`}
        <${About}/><${Projects}/><${Skills}/><${Journey}/><${Contact}/>
      </main>
      <footer><div className="wrap"><span>© 2026 Sujeet Kharat</span><span>Built with React, HTML, CSS and JavaScript</span></div></footer>
      <${Status} active=${active} pctRef=${pct}/>
      <${Palette} open=${pal} onClose=${()=>setPal(false)} cmds=${cmds}/>
      <${Cli} open=${cli} onClose=${()=>setCli(false)}/>
      ${toast&&html`<div className="toast" role="status">${toast}</div>`}
    </div>`;
}

P.App=App;
})(window.Portfolio);
