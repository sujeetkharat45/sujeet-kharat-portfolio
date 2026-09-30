(function (P) {
const {useState}=React;
const {html}=P;

const inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
function EmiDemo(){
  const [goal,setGoal]=useState(500000);const [months,setMonths]=useState(24);const [rate,setRate]=useState(7);
  const r=rate/1200;
  const pmt=r===0?goal/months:goal*r/(Math.pow(1+r,months)-1);
  const bal=k=>r===0?pmt*k:pmt*(Math.pow(1+r,k)-1)/r;
  const W=300,H=110,pad=6;
  const pts=[];for(let k=0;k<=months;k++)pts.push([pad+(W-2*pad)*k/months,H-pad-(H-2*pad)*bal(k)/goal]);
  const line=pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const area=line+' '+(W-pad)+','+(H-pad)+' '+pad+','+(H-pad);
  const dep=pmt*months;
  return html`
    <div className="calc">
      <h4>Reverse EMI: plan a savings goal</h4>
      <p className="hint">Enter a target and get the monthly amount to save, using amortisation maths.</p>
      <label><div><span>Goal</span><b>${inr(goal)}</b></div><input type="range" min="50000" max="2000000" step="10000" value=${goal} onInput=${e=>setGoal(+e.target.value)} aria-label="Savings goal"/></label>
      <label><div><span>Time</span><b>${months} months</b></div><input type="range" min="6" max="60" step="1" value=${months} onInput=${e=>setMonths(+e.target.value)} aria-label="Months"/></label>
      <label><div><span>Expected return</span><b>${rate.toFixed(1)}% a year</b></div><input type="range" min="0" max="14" step="0.5" value=${rate} onInput=${e=>setRate(+e.target.value)} aria-label="Yearly return"/></label>
      <div className="result"><strong>${inr(pmt)}</strong><span>to save each month</span></div>
      <div className="result" style=${{margin:0}}><span>You deposit ${inr(dep)} and earn about ${inr(goal-dep)}.</span></div>
      <svg className="spark" viewBox=${'0 0 '+W+' '+H} role="img" aria-label="Projected savings growth">
        <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--accent)" stopOpacity=".35"/><stop offset="1" stopColor="var(--accent)" stopOpacity="0"/></linearGradient></defs>
        <line x1=${pad} y1=${H-pad} x2=${W-pad} y2=${pad} stroke="var(--muted)" strokeDasharray="3 4" strokeOpacity=".6"/>
        <polygon points=${area} fill="url(#g1)"/>
        <polyline points=${line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    </div>`;
}

P.inr=inr;
P.EmiDemo=EmiDemo;
})(window.Portfolio);
