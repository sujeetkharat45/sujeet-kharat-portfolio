(function (P) {
const {useState,useEffect}=React;
const {reduce}=P;

function useTyper(words){
  const [text,setText]=useState(reduce?words[0]:'');
  useEffect(()=>{
    if(reduce)return;
    let dead=false;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    (async()=>{
      await sleep(1100);let i=0;
      while(!dead){
        const w=words[i%words.length];
        for(let k=1;k<=w.length&&!dead;k++){setText(w.slice(0,k));await sleep(55);}
        await sleep(1700);
        for(let k=w.length;k>=0&&!dead;k--){setText(w.slice(0,k));await sleep(28);}
        await sleep(280);i++;
      }
    })();
    return()=>{dead=true;};
  },[]);
  return text;
}

P.useTyper=useTyper;
})(window.Portfolio);
