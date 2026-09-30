/* Entry point: mounts the App into #root. */
(function (P) {
  const { html, App } = P;
  ReactDOM.createRoot(document.getElementById('root')).render(html`<${App}/>`);
})(window.Portfolio);
