console.log("✅ script.js cargado");

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const trunk = document.getElementById("trunk");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");

const heartsLayer = document.getElementById("heartsLayer");
const note = document.getElementById("note");
const counter = document.getElementById("counter");

const openLetter = document.getElementById("openLetter");
const letter = document.getElementById("letter");

startBtn.addEventListener("click", () => {
  console.log("🔥 CLICK detectado");

  intro.classList.add("hidden");
  scene.classList.remove("hidden");

  growTree();
  drawHeartCanopy();

  setTimeout(() => {
    note.classList.remove("hidden");
  }, 2000);

  startCounter("2008-10-28T00:00:00");
});

function growTree() {
  trunk.style.height = "240px";

  setTimeout(() => { b1.style.height = "120px"; b1.style.opacity = 1; }, 600);
  setTimeout(() => { b2.style.height = "130px"; b2.style.opacity = 1; }, 800);
  setTimeout(() => { b3.style.height = "115px"; b3.style.opacity = 1; }, 1000);
}

openLetter.addEventListener("click", () => {
  openLetter.classList.add("hidden");
  letter.classList.remove("hidden");
  confettiHearts(2600);
}, { once: true });

function startCounter(dateISO) {
  const start = new Date(dateISO);

  setInterval(() => {
    const now = new Date();
    const diff = now - start;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    counter.textContent =
      `${days} días ${pad(hours)} horas ${pad(minutes)} minutos ${pad(seconds)} segundos`;
  }, 1000);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function confettiHearts(ms) {
  const end = Date.now() + ms;

  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart falling";
    heart.textContent = "❤";

    heart.style.left = (Math.random() * scene.clientWidth) + "px";
    heart.style.top = "60px";
    heart.style.color = ["#e63946", "#ff6b6b", "#ffb4c0"][Math.floor(Math.random() * 3)];
    heart.style.fontSize = (12 + Math.random() * 18) + "px";

    const dur = 1400 + Math.random() * 1600;
    heart.style.animationDuration = dur + "ms";

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), dur);

    if (Date.now() > end) clearInterval(interval);
  }, 90);
}

/* ✅ Copa con hojas corazón (forma corazón real) */
function drawHeartCanopy() {
  const isMobile = window.innerWidth <= 520;

  const baseX = scene.clientWidth * (isMobile ? 0.76 : 0.62);
  const baseY = scene.clientHeight * (isMobile ? 0.28 : 0.34);

  const colors = ["#e63946", "#ff6b6b", "#ffb4c0"];
  const total = isMobile ? 140 : 190;

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      leaf.textContent = "❤";

      // corazón paramétrico
      const t = Math.random() * Math.PI * 2;
      const r = Math.random();

      const x = (16 * Math.pow(Math.sin(t), 3)) * (isMobile ? 4.2 : 5.2);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)) * (isMobile ? 4.2 : 5.2);

      const jitterX = (Math.random() - 0.5) * (isMobile ? 18 : 24);
      const jitterY = (Math.random() - 0.5) * (isMobile ? 18 : 24);

      leaf.style.left = `${baseX + (x * r) + jitterX}px`;
      leaf.style.top  = `${baseY + (y * r) + jitterY}px`;

      leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
      leaf.style.fontSize = `${10 + Math.random() * (isMobile ? 12 : 16)}px`;
      leaf.style.animationDelay = `${Math.random() * 0.35}s`;

      heartsLayer.appendChild(leaf);
    }, 900 + i * 10);
  }
}
