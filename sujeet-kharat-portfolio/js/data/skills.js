(function (P) {

/* ---------- skill graph ---------- */
const G_COLORS={Backend:'accent',Frontend:'accent2',Database:'ok',Tools:'warn','Core CS':'violet'};
const G_SKILLS=[
  ['Java','Backend'],['Spring Boot','Backend'],['Spring Security','Backend'],['JWT','Backend'],['Spring Data JPA','Backend'],['Hibernate','Backend'],['REST APIs','Backend'],['JDBC','Backend'],
  ['React','Frontend'],['JavaScript','Frontend'],['HTML5','Frontend'],['CSS3','Frontend'],['Tesseract.js','Frontend'],['Regex','Frontend'],
  ['SQL','Database'],['PL/SQL','Database'],['Oracle DB','Database'],['PostgreSQL','Database'],['MongoDB','Database'],
  ['Git','Tools'],['GitHub','Tools'],['Maven','Tools'],['Postman','Tools'],
  ['OOP','Core CS'],['Collections','Core CS'],['Exception handling','Core CS'],['Data structures','Core CS'],['DBMS','Core CS'],['Operating systems','Core CS'],['Networks','Core CS']
];
const G_PROJECTS={
  'ETMS':['Java','Spring Boot','Spring Security','JWT','Spring Data JPA','Hibernate','REST APIs','Oracle DB','React'],
  'ExpenseSensei':['React','JavaScript','Tesseract.js','Regex'],
  'Attendance system':['Java','SQL','Git','GitHub']
};
const G_SUB=[['Java','OOP'],['Java','Collections'],['Java','Exception handling']];
const G_ANCHOR={Backend:[.22,.32],Frontend:[.78,.26],Database:[.8,.74],Tools:[.46,.9],'Core CS':[.14,.76],
  'ETMS':[.42,.42],'ExpenseSensei':[.64,.4],'Attendance system':[.44,.66]};

/* Portrait layout used on narrow screens (fractions of canvas width/height) */
const G_ANCHOR_SM={Backend:[.28,.14],Frontend:[.76,.24],Database:[.8,.72],Tools:[.55,.94],'Core CS':[.18,.82],
  'ETMS':[.32,.36],'ExpenseSensei':[.7,.46],'Attendance system':[.55,.62]};
P.G_COLORS=G_COLORS;
P.G_SKILLS=G_SKILLS;
P.G_PROJECTS=G_PROJECTS;
P.G_SUB=G_SUB;
P.G_ANCHOR=G_ANCHOR;
P.G_ANCHOR_SM=G_ANCHOR_SM;
})(window.Portfolio);
