(function (P) {
const {useState,useEffect}=React;
const {html,reduce}=P;

/* ---------- stats / about ---------- */
function Count({to,suffix,start}){
  const [n,setN]=useState(0);
  useEffect(()=>{
    if(!start)return;if(reduce){setN(to);return;}
    let t0=0,raf=0;
    const step=t=>{t0=t0||t;const p=Math.min((t-t0)/1500,1);setN(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)raf=requestAnimationFrame(step);};
    raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf);
  },[start]);
  return html`<span>${n}${suffix}</span>`;
}

P.Count=Count;
})(window.Portfolio);
