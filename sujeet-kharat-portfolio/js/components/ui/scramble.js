(function (P) {
const {useState,useEffect}=React;
const {html,reduce,useInView}=P;

/* ---------- scramble / decrypt text ---------- */
const GLYPHS='01<>/{}[]#$%&*+=';
function Scramble({text}){
  const [ref,seen]=useInView(.5);
  const [out,setOut]=useState(text);
  useEffect(()=>{
    if(!seen||reduce)return;
    let raf=0,t0=0;const dur=700+text.length*22;
    const step=t=>{
      t0=t0||t;const p=Math.min((t-t0)/dur,1);const n=Math.floor(p*text.length);
      let s='';for(let i=0;i<text.length;i++){const ch=text[i];s+=(ch===' '||i<n)?ch:GLYPHS[Math.floor(Math.random()*GLYPHS.length)];}
      setOut(s);if(p<1)raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);return()=>cancelAnimationFrame(raf);
  },[seen]);
  return html`<span ref=${ref} aria-hidden="true" style=${{visibility:(seen||reduce)?'visible':'hidden'}}>${out}</span>`;
}

P.GLYPHS=GLYPHS;
P.Scramble=Scramble;
})(window.Portfolio);
