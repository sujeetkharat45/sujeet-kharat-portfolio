(function (P) {

/* ---------- projects ---------- */
const ROLES=['Admin','Manager','Employee'];
const ACTIONS=[
  {a:'Create and remove employee accounts',r:['Admin']},
  {a:'Assign tasks across a team',r:['Admin','Manager']},
  {a:'Review team task progress',r:['Admin','Manager']},
  {a:'Update progress on my own tasks',r:['Admin','Manager','Employee']}
];

P.ROLES=ROLES;
P.ACTIONS=ACTIONS;
})(window.Portfolio);
