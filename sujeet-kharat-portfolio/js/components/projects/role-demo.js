(function (P) {
const {useState}=React;
const {html,ACTIONS,ROLES}=P;

function RoleDemo(){
  const [role,setRole]=useState('Manager');
  return html`
    <div>
      <h4>Try the three access levels</h4>
      <p className="hint">Pick a role to see what its token can do.</p>
      <div className="seg" role="tablist" aria-label="Role">
        ${ROLES.map(r=>html`<button key=${r} role="tab" aria-selected=${role===r} onClick=${()=>setRole(r)}>${r}</button>`)}
      </div>
      <div className="perm">
        ${ACTIONS.map(x=>{const ok=x.r.includes(role);return html`
          <div key=${x.a} className=${ok?'yes':'no'}>${x.a}<i>${ok?'200 allowed':'403 blocked'}</i></div>`;})}
      </div>
      <p className="fine">Illustrative example of the Admin / Manager / Employee model. Passwords are hashed with BCrypt and sessions are stateless JWTs.</p>
    </div>`;
}

P.RoleDemo=RoleDemo;
})(window.Portfolio);
