(function (P) {
const {html,Count,STATS,useInView}=P;

function Stats(){
  const [ref,seen]=useInView(.35);
  return html`<div className="stats hud" ref=${ref}>${STATS.map(s=>html`
    <div className="stat" key=${s.l}><div className="n"><${Count} to=${s.n} suffix=${s.s} start=${seen}/></div><p>${s.l}</p></div>`)}</div>`;
}

P.Stats=Stats;
})(window.Portfolio);
