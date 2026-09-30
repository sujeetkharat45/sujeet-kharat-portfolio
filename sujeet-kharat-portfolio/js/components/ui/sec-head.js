(function (P) {
const {html,Scramble}=P;

function SecHead({title,sub,flat}){
  return html`<div className=${'sec-head'+(flat?' flat':'')}><h2 aria-label=${title}><${Scramble} text=${title}/></h2>${sub&&html`<p>${sub}</p>`}</div>`;
}

P.SecHead=SecHead;
})(window.Portfolio);
