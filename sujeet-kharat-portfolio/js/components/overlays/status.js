(function (P) {
const {useState,useEffect}=React;
const {html}=P;

/* ---------- status bar ---------- */
function Status({active,pctRef}){
  const [t,setT]=useState(new Date());
  useEffect(()=>{const id=setInterval(()=>setT(new Date()),1000);return()=>clearInterval(id);},[]);
  return html`
    <div className="status" aria-hidden="true">
      <span className="live">ONLINE</span>
      <span>SECTION <b>${(active||'top').toUpperCase()}</b></span>
      <span>SCROLL <b ref=${pctRef}>0</b>%</span>
      <span className="sp"></span>
      <span className="hide-s">LOCAL <b>${t.toLocaleTimeString('en-GB')}</b></span>
      <span className="hide-s">SUJEET.KHARAT / 2026</span>
    </div>`;
}

P.Status=Status;
})(window.Portfolio);
