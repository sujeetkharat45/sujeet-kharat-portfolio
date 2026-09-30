(function (P) {

/* ---------- terminal (sample ETMS session) ---------- */
const SCENES=[
  {cmd:'POST /api/auth/login',out:[{t:'ok',s:'200 OK'},{t:'json',s:'{ "token": "eyJhbGciOiJIUzI1NiJ9…", "role": "MANAGER" }'}]},
  {cmd:'GET /api/tasks?status=OPEN  [Bearer token]',out:[{t:'ok',s:'200 OK'},{t:'json',s:'[ { "id": 41, "title": "Onboard new hire", "assignee": "emp_07" } ]'}]},
  {cmd:'DELETE /api/employees/12  [role: EMPLOYEE]',out:[{t:'err',s:'403 Forbidden'},{t:'json',s:'{ "error": "ADMIN authority required" }'}]},
  {cmd:'GET /api/tasks/mine  [role: EMPLOYEE]',out:[{t:'ok',s:'200 OK'},{t:'json',s:'[ { "id": 44, "title": "Update sprint status", "done": false } ]'}]}
];

P.SCENES=SCENES;
})(window.Portfolio);
