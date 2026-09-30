(function (P) {
const {EMAIL,GITHUB,LINKEDIN}=P;

/* ---------- CLI shell ---------- */
const CLI_CMDS={
  help:'Commands:\n  whoami    who I am\n  skills    technical stack\n  projects  what I have built\n  exp       internship and leadership\n  edu       education\n  contact   how to reach me\n  hire      the short version\n  matrix    a little decoration\n  clear     reset the screen',
  whoami:'Sujeet Kharat\nComputer Engineering graduate and Java full-stack developer\nMumbai, India  |  B.E. Computer Engineering, CGPA 7.30',
  skills:'Languages : Java, JavaScript (ES6+)\nBackend   : Spring Boot, Spring Security, Spring Data JPA / Hibernate, REST APIs, JDBC\nFrontend  : React, HTML5, CSS3\nDatabase  : SQL, PL/SQL, Oracle DB, PostgreSQL, MongoDB\nTools     : Git, GitHub, Maven, Postman',
  projects:'1. ETMS - Spring Boot, Spring Security (JWT), Oracle DB, React\n2. ExpenseSensei - React, Tesseract.js OCR, Regex, Reverse EMI maths',
  exp:'Java Developer Intern, Qspiders, Vashi (Jan 2026 - Jun 2026)\n  Attendance system in Core Java for 100+ employees\nLead Organizer, Code: Automata Ver 2.1 (Feb 2026)\n  91 teams, 350+ participants\nEvent Executive and Editor, CESA & Cultural Committee, CSMIT',
  edu:'B.E. Computer Engineering, CSMIT, 2022 - 2026, CGPA 7.30\nXII (Science), Dr. D.Y. Patil Junior College, 62.83%\nX, St. Joseph\'s High School, 81.40%',
  contact:'Email    : '+EMAIL+'\nPhone    : +91 9967748625\nGitHub   : '+GITHUB+'\nLinkedIn : '+LINKEDIN,
  hire:'Great choice. Email '+EMAIL+' and mention the role.',
  matrix:'01010011 01010101 01001010 01000101 01000101 01010100\n[SPRING BOOT] -> [SECURITY + JWT] -> [ORACLE DB] -> [REACT UI]'
};

P.CLI_CMDS=CLI_CMDS;
})(window.Portfolio);
