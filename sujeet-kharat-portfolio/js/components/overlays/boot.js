(function (P) {
const {useState,useEffect,useRef}=React;
const {html,BOOT}=P;

function Boot({onDone}){
  const [n,setN]=useState(0);const [gone,setGone]=useState(false);const fin=useRef(false);
  const total=BOOT.length;
  useEffect(()=>{const id=setInterval(()=>setN(x=>x+1),340);return()=>clearInterval(id);},[]);
  const finish=()=>{if(fin.current)return;fin.current=true;setN(total+1);onDone();setTimeout(()=>setGone(true),800);};
  useEffect(()=>{if(n>total)finish();},[n]);
  useEffect(()=>{const k=e=>{if(e.key==='Escape'||e.key==='Enter')finish();};window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k);},[]);
  if(gone)return null;
  const done=n>total;
  return html`
    <div className=${'boot'+(done?' done':'')} onClick=${finish} role="status" aria-label="Loading portfolio">
      <div className="boot-box">
        ${BOOT.slice(0,Math.min(n,total)).map((l,i)=>html`<div key=${l} className=${i===total-1?'hi':''}>> ${l} ${i<n-1||done?html`<b>[ OK ]</b>`:'…'}</div>`)}
        <div className="boot-bar"><i style=${{width:Math.min(100,(n/(total+1))*100)+'%'}}></i></div>
        <div className="boot-skip">click or press Enter to skip</div>
      </div>
    </div>`;
}

P.Boot=Boot;
})(window.Portfolio);
