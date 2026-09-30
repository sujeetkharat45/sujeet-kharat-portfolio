(function (P) {
const {html,EmiDemo,RoleDemo,SecHead}=P;

function Projects(){
  return html`
    <section className="block" id="projects">
      <div className="wrap">
        <${SecHead} title="Projects" sub="Two full applications, each with something you can try right here."/>
        <article className="proj hud">
          <div className="info">
            <h3>ETMS: Employee & Task Management System</h3>
            <p className="when">2025 – 2026</p>
            <ul>
              <li><strong>Full-stack HR platform</strong> with 10+ REST APIs across 7 connected entities, built on Spring Boot, Spring Security (JWT) and Oracle DB.</li>
              <li><strong>3-tier role-based access</strong> (Admin, Manager, Employee) with stateless JWT auth and BCrypt hashing protecting every endpoint.</li>
              <li><strong>Fixed N+1 query bottlenecks</strong> with @EntityGraph and JOIN FETCH, and solved Oracle-specific issues such as sequence-based IDs and reserved-keyword conflicts.</li>
            </ul>
            <div className="chips">${['Spring Boot','Spring Security','JWT','Oracle DB','JPA / Hibernate','React'].map(t=>html`<span className="chip" key=${t}>${t}</span>`)}</div>
          </div>
          <div className="demo"><${RoleDemo}/></div>
        </article>
        <article className="proj flip hud">
          <div className="info">
            <h3>ExpenseSensei: AI-powered expense manager</h3>
            <p className="when">2025 – 2026</p>
            <div className="pipe" aria-label="Receipt pipeline">
              <span>Receipt</span><s></s><span>Tesseract.js</span><s></s><span>Regex</span><s></s><span>Transaction</span>
            </div>
            <ul>
              <li><strong>Automated receipt ingestion</strong> with Tesseract.js OCR and custom Regex that pulls out totals and filters UPI ID noise, cutting manual entry by 80%.</li>
              <li><strong>Conversational finance chatbot</strong> for live spending questions and plain-language budget insights.</li>
              <li><strong>Client-side Reverse EMI module</strong> that turns a savings goal into a monthly amount. Try it on the left.</li>
            </ul>
            <div className="chips">${['React','Tesseract.js','Regex','OCR','Chatbot'].map(t=>html`<span className="chip" key=${t}>${t}</span>`)}</div>
          </div>
          <div className="demo"><${EmiDemo}/></div>
        </article>
      </div>
    </section>`;
}

P.Projects=Projects;
})(window.Portfolio);
