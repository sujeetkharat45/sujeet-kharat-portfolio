(function (P) {
const {useState}=React;
const {PHOTO,html,reduce}=P;

function Portrait(){
  const [t,setT]=useState({x:0,y:0});
  const onMove=e=>{if(reduce)return;const r=e.currentTarget.getBoundingClientRect();setT({x:((e.clientY-r.top)/r.height-.5)*-10,y:((e.clientX-r.left)/r.width-.5)*12});};
  return html`
    <div className="portrait hud" onMouseMove=${onMove} onMouseLeave=${()=>setT({x:0,y:0})} style=${{transform:'perspective(800px) rotateX('+t.x+'deg) rotateY('+t.y+'deg)'}}>
      ${PHOTO?html`<img src=${PHOTO} alt="Portrait of Sujeet Kharat"/>`:html`<div className="mono" aria-hidden="true">SK</div>`}
      <i className="shade"></i><i className="scan"></i>
      <div className="cap"><span>SUJEET KHARAT</span><i>● ONLINE</i></div>
    </div>`;
}

P.Portrait=Portrait;
})(window.Portfolio);
