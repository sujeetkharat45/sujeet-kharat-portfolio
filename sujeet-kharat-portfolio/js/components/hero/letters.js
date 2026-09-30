(function (P) {
const {html}=P;

/* ---------- hero ---------- */
function Letters({word,start}){
  return html`${word.split('').map((ch,i)=>html`<span key=${i} className="ch" style=${{animationDelay:(start+i*55)+'ms'}}>${ch}</span>`)}`;
}

P.Letters=Letters;
})(window.Portfolio);
