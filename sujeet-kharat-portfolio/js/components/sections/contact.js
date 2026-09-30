(function (P) {
const {useState}=React;
const {EMAIL,GITHUB,LINKEDIN,html,Scramble}=P;

function Contact(){
  const [name,setName]=useState('');const [msg,setMsg]=useState('');const [copied,setCopied]=useState('');
  const href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Hello from '+(name||'your portfolio'))+'&body='+encodeURIComponent(msg);
  return html`
    <section className="block" id="contact" style=${{paddingBottom:0}}>
      <div className="wrap">
        <div className="contact hud">
          <h2 aria-label="Open to Java full-stack roles."><${Scramble} text="Open to Java full-stack roles."/></h2>
          <p>If you have a backend, full-stack or Java developer opening, I would like to hear about it.</p>
          <div className="contact-grid">
            <div className="links-col">
              <div className="link-row"><a href=${'mailto:'+EMAIL}><small>Email</small><span>${EMAIL}</span></a><button onClick=${()=>copyEmail(setCopied)} aria-label="Copy email address">${copied||'Copy'}</button></div>
              <div className="link-row"><a href="tel:+919967748625"><small>Phone</small><span>+91 99677 48625</span></a></div>
              <div className="link-row"><a href=${GITHUB} target="_blank" rel="noopener noreferrer"><small>GitHub</small><span>github.com/sujeetkharat45</span></a></div>
              <div className="link-row"><a href=${LINKEDIN} target="_blank" rel="noopener noreferrer"><small>LinkedIn</small><span>linkedin.com/in/sujeet-kharat-295834263</span></a></div>
            </div>
            <div className="compose">
              <input placeholder="Your name" value=${name} onInput=${e=>setName(e.target.value)} aria-label="Your name"/>
              <textarea rows="5" placeholder="What would you like to talk about?" value=${msg} onInput=${e=>setMsg(e.target.value)} aria-label="Message"></textarea>
              <a className="btn primary" href=${href} style=${{justifyContent:'center'}}>Open in my email app</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

P.Contact=Contact;
})(window.Portfolio);
