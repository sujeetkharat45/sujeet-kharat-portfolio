(function (P) {
const {useState,useEffect,useRef}=React;

/* ---------- hooks ---------- */
function useInView(threshold){
  const ref=useRef(null);const [seen,setSeen]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setSeen(true);io.disconnect();}},{threshold:threshold||0.3});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return [ref,seen];
}

P.useInView=useInView;
})(window.Portfolio);
