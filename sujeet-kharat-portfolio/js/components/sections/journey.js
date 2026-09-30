(function (P) {
const {EMAIL,html,JOURNEY,SecHead}=P;

function Journey(){
  return html`
    <section className="block" id="journey">
      <div className="wrap">
        <${SecHead} title="Experience & leadership" sub="Internship work and the events I have led, most recent first."/>
        <div className="tl">
          ${JOURNEY.map(j=>html`<article key=${j.t}><p className="when">${j.w}</p><h3>${j.t}</h3><p className="org">${j.o}</p><p className="d">${j.d}</p></article>`)}
        </div>
        <div className="edu">
          <div className="card hud">
            <h3>Education</h3>
            <div className="edu-row"><div><b>B.E. in Computer Engineering</b><small>Chhatrapati Shivaji Maharaj Institute of Technology · 2022 – 2026</small></div><span className="score">CGPA 7.30</span></div>
            <div className="edu-row"><div><b>XII (Science)</b><small>Dr. D.Y. Patil Junior College, CBD Belapur</small></div><span className="score">62.83%</span></div>
            <div className="edu-row"><div><b>X</b><small>St. Joseph's High School, Kalamboli</small></div><span className="score">81.40%</span></div>
          </div>
          <div className="card hud">
            <h3>Achievements</h3>
            <ul className="ach">
              <li><span><b>NPTEL Big Data Computing</b> certification (2025)</span></li>
              <li><span>Participant, <b>Internal Hackathon for Smart India Hackathon</b> (SIH 2025), Oct 2025</span></li>
              <li><span>Participant, 6-hour <b>"Dev With AI" Hackathon</b>, Apr 2025</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- contact ---------- */
async function copyEmail(setMsg){
  try{await navigator.clipboard.writeText(EMAIL);setMsg('Copied');}catch(err){setMsg('Copy failed');}
  setTimeout(()=>setMsg(''),1800);
}

P.Journey=Journey;
})(window.Portfolio);
