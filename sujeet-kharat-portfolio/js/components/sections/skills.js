(function (P) {
const {html,SecHead,SkillGraph}=P;

function Skills(){
  return html`
    <section className="block" id="skills">
      <div className="wrap">
        <${SecHead} title="Skills" sub="Every technology is linked to the project where I used it."/>
        <${SkillGraph}/>
      </div>
    </section>`;
}

P.Skills=Skills;
})(window.Portfolio);
