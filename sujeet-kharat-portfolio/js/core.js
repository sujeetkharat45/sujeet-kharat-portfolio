/* Shared helpers used by every component. */
(function (P) {
  // htm lets us write JSX-like templates without a build step
  P.html = htm.bind(React.createElement);
  P.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
})(window.Portfolio);
