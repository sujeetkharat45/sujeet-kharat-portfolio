(function (P) {
const {html,Portrait,SecHead,Stats}=P;

function About(){
  return html`
    <section className="block" id="about">
      <div className="wrap">
        <${Stats}/>
        <div className="about">
          <div style=${{display:'grid',gap:28}}><${SecHead} flat=${true} title="Backend-minded, with an eye for the whole product."/><${Portrait}/></div>
          <div>
            <p>I like the parts of software that have to be <strong>correct and secure</strong>: authentication, permissions, data models and the queries behind them. My main project, ETMS, taught me to debug real persistence problems, from N+1 query bottlenecks to Oracle-specific schema quirks.</p>
            <p>I also enjoy shipping things people use. I led a <strong>24-hour national hackathon</strong> for 350+ participants and built ExpenseSensei, a receipt-scanning expense app, to solve my own manual-entry pain.</p>
            <div className="facts" style=${{marginTop:24}}>
              <div><span>location</span><b>Mumbai, India</b></div>
              <div><span>degree</span><b>B.E. Computer Engineering, 2026</b></div>
              <div><span>focus</span><b>Java, Spring Boot, React</b></div>
              <div><span>databases</span><b>Oracle, PostgreSQL, MongoDB</b></div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

P.About=About;
})(window.Portfolio);
