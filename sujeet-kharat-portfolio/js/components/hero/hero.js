(function (P) {
const {html,Avatar,Field,Letters,Terminal,useTyper}=P;

function Hero({onCli}){
  const role=useTyper(['secure Spring Boot APIs','role-based web apps','fast SQL and JPA queries','React interfaces']);
  return html`
    <header className="hero" id="top">
      <${Field}/>
      <div className="wrap">
        <div>
          <div className="hero-id"><${Avatar}/><p className="role-line">I build <b>${role}</b><span className="caret"></span></p></div>
          <h1 className="name" aria-label="Sujeet Kharat">
            <span className="row" aria-hidden="true"><${Letters} word="Sujeet" start=${100}/></span>
            <span className="row" aria-hidden="true"><${Letters} word="Kharat" start=${420}/></span>
          </h1>
          <p className="pitch">Computer Engineering graduate from Mumbai, specialised in <strong>Java full-stack development</strong>. I design role-based applications with Spring Boot, Spring Security and React, and tune the Oracle and MongoDB databases behind them.</p>
          <div className="cta">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
          <div className="tags"><span><i className="dot"></i>Open for Software Engineer / Java Full-Stack roles</span><span>Mumbai, India</span><button onClick=${onCli}>${'>_'} Open CLI shell</button></div>
        </div>
        <${Terminal}/>
      </div>
    </header>`;
}

P.Hero=Hero;
})(window.Portfolio);
