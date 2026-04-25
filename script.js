import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


window.showTab = function(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}

// AI SIMULATION (BETTER)
window.generateAI = function() {
  let role = document.getElementById("role").value;

  let objective = `Results-driven ${role} skilled in analytics and problem solving. Passionate about building impactful solutions.`;

  let enhancedSkills = "Analytical Thinking, Problem Solving, Team Collaboration, Communication";

  localStorage.setItem("objective", objective);
  localStorage.setItem("enhancedSkills", enhancedSkills);

  alert("AI Content Generated!");
}

// RESUME GENERATION (IMAGE FORMAT)
window.generateResume = function() {

let name = document.getElementById("name").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let github = document.getElementById("github").value;
let linkedin = document.getElementById("linkedin").value;

let education = document.getElementById("education").value;
let skills = document.getElementById("skills").value;
let projects = document.getElementById("projects").value;
let experience = document.getElementById("experience").value;
let certifications = document.getElementById("certifications").value;

let objective = localStorage.getItem("objective");

let resume = `
<h2>${name}</h2>
<p>${email} | ${phone}</p>
<p>${github} | ${linkedin}</p>

<div class="resume-section">
<h3>OBJECTIVE</h3>
<p>${objective}</p>
</div>

<div class="resume-section">
<h3>EDUCATION</h3>
<p>${education}</p>
</div>

<div class="resume-section">
<h3>SKILLS</h3>
<p>${skills}</p>
</div>

<div class="resume-section">
<h3>EXPERIENCE</h3>
<p>${experience}</p>
</div>

<div class="resume-section">
<h3>PROJECTS</h3>
<p>${projects}</p>
</div>

<div class="resume-section">
<h3>CERTIFICATIONS</h3>
<p>${certifications}</p>
</div>
`;
let resumeData = {
  name,
  email,
  phone,
  github,
  linkedin,
  education,
  skills,
  projects,
  experience,
  certifications,
  objective,
  createdAt: new Date().toISOString()
};

saveToFirebase(resumeData);
document.getElementById("resumeOutput").innerHTML = resume;
window.downloadPDF = function() {
  const { jsPDF } = window.jspdf;

  let doc = new jsPDF();

  let content = document.getElementById("resumeOutput").innerText;

  doc.setFont("Times", "Normal");
  doc.setFontSize(12);

  let lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 10);

  doc.save("Resume.pdf");
}
async function saveToFirebase(data) {
  try {
    await addDoc(collection(window.db, "resumes"), data);
    alert("✅ Data Saved Successfully!");
  } catch (error) {
    console.error(error);
    alert("❌ Error saving data");
  }
}

// ATS SCORE LOGIC
let keywords = ["Python","Data","Machine Learning","Analysis"];
let score = 60;

keywords.forEach(k => {
  if (skills.includes(k)) score += 10;
});

document.getElementById("ats").innerText = score + "%";

generatePortfolio(name, skills, projects);
showTab("resume");
}

// PORTFOLIO
window.generatePortfolio = function(name,skills,projects) {

let portfolioHTML = `
<!DOCTYPE html>
<html>
<head>
<title>${name} Portfolio</title>

<style>

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Segoe UI';
  background: #f5f5f5;
  color: #222;
}

/* NAVBAR */
nav {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 15px 40px;
  background: #111;
  color: white;
  z-index: 1000;
}

nav a {
  color: white;
  margin-left: 20px;
  text-decoration: none;
  font-weight: bold;
}

/* HERO */
.hero {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg,#000,#333);
  color: white;
}

/* SECTIONS */
section {
  padding: 80px 40px;
  max-width: 1000px;
  margin: auto;
}

/* SECTION TITLE */
h2 {
  border-bottom: 2px solid black;
  padding-bottom: 10px;
}

/* CARD */
.card {
  background: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* FOOTER */
footer {
  text-align: center;
  padding: 20px;
  background: #111;
  color: white;
}

</style>

</head>

<body>

<!-- ✅ NAVIGATION -->
<nav>
  <h2>${name}</h2>
  <div>
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </div>
</nav>

<!-- HERO -->
<div class="hero">
  <h1>${name}</h1>
  <p>Professional Portfolio</p>
</div>

<!-- ABOUT -->
<section id="about">
  <h2>About</h2>
  <div class="card">
    <p>I am a passionate developer focused on building scalable solutions.</p>
  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <h2>Skills</h2>
  <div class="card">
    <p>${skills}</p>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <h2>Projects</h2>
  <div class="card">
    <p>${projects}</p>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <h2>Contact</h2>
  <div class="card">
    <p>Email: Available in resume</p>
  </div>
</section>

<footer>
  <p>© 2026 ${name}</p>
</footer>

</body>
</html>
`;

let newWindow = window.open();
newWindow.document.write(portfolioHTML);
newWindow.document.close();
}