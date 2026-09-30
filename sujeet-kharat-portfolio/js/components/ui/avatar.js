(function (P) {
const {PHOTO_SM,html}=P;

function Avatar(){
  return html`<div className="avatar">${PHOTO_SM?html`<img src=${PHOTO_SM} alt="Sujeet Kharat"/>`:html`<span aria-hidden="true">SK</span>`}</div>`;
}

P.Avatar=Avatar;
})(window.Portfolio);
