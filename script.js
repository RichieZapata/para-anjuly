console.log("✅ script.js cargado");

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");
const card  = document.getElementById("card");

const trunk = document.getElementById("trunk");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");

const canopy = document.getElementById("canopy");
const heartsLayer = document.getElementById("heartsLayer");

const note = document.getElementById("note");
const counter = document.getElementById("counter");

const openLetter = document.getElementById("openLetter");
const letter = document.getElementById("letter");

let counterTimer = null;

startBtn.addEventListener("click", () => {
  console.log("🔥 CLICK detectado");

  intro.classList.add("hidden");
  scene.classList.remove("hidden");

  growTree();

  // Muestra texto después de que crece el tronco un poco
  setTimeout(() => note.classList.remove("hidden"), 1400);

  startCounter("2008-10-28T00:00:00");
});

openLetter.addEventListener("click", () => {
  openLetter.classList.add("hidden");
  letter.classList.remove("hidden");

  // ✅ Opción B: ocultar árbol + copa para que no se “separe” feo al abrir carta
  card.classList.add("letter-open");

  // Confetti suave (solo caen corazoncitos)
  confettiHearts(2400);
}, { once: true });

function growTree(){
  trunk.style.height = "240px";

  setTimeout(()=>{ b1.style.height="120px"; b1.style.opacity=1; }, 450);
  setTimeout(()=>{ b2.style.height="130px"; b2.style.opacity=1; }, 650);
  setTimeout(()=>{ b3.style.height="110px"; b3.style.opacity=1; }, 850);

  // Dibuja copa (corazones) un poquito después
  setTimeout(drawHeartCanopy, 950);
}

/* Copa del árbol (hojas en forma de corazón) */
function drawHeartCanopy(){
  canopy.innerHTML = "";

  const isMobile = window.innerWidth <= 520;
  const colors = ["#e63946", "#ff6b6b", "#ffb4c0"];
  const total = isMobile ? 120 : 170;

  // Centro del "corazón" dentro del canopy
  const cx = canopy.clientWidth * 0.52;
  const cy = canopy.clientHeight * 0.48;

  for(let i=0; i<total; i++){
    setTimeout(() => {
      const leaf = document.createElement("div");
      leaf.className = "leaf";

      const t = Math.random() * Math.PI * 2;
      const r = Math.random(); // 0..1

      // Corazón paramétrico
      // x = 16 sin^3(t)
      // y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

      // Escala y jitter
      const scale = isMobile ? 4.5 : 5.2;
      const jitterX = (Math.random() - 0.5) * (isMobile ? 16 : 22);
      const jitterY = (Math.random() - 0.5) * (isMobile ? 16 : 22);

      const x = cx + (hx * scale * r) + jitterX;
      const y = cy + (hy * scale * r) + jitterY;

      leaf.style.left = `${x}px`;
      leaf.style.top  = `${y}px`;
      leaf.style.setProperty("--c", colors[Math.floor(Math.random()*colors.length)]);
      leaf.style.setProperty("--size", `${12 + Math.random()*16}px`);

      canopy.appendChild(leaf);
    }, i * 12);
  }
}

function startCounter(dateISO){
  const start = new Date(dateISO);

  // Evita múltiples intervalos si recargan o re-inician
  if(counterTimer) clearInterval(counterTimer);

  const tick = () => {
    const now = new Date();
    const diff = now - start;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    counter.textContent =
      `${days} días ${pad(hours)} horas ${pad(minutes)} minutos ${pad(seconds)} segundos`;
  };

  tick();
  counterTimer = setInterval(tick, 1000);
}

function pad(n){
  return String(n).padStart(2, "0");
}

function confettiHearts(ms){
  const end = Date.now() + ms;
  const colors = ["#e63946","#ff6b6b","#ffb4c0"];
  const isMobile = window.innerWidth <= 520;

  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart falling";
    heart.textContent = "❤";

    // Que caiga por toda la tarjeta (no solo por el árbol)
    const w = scene.clientWidth;
    heart.style.left = (10 + Math.random() * (w - 20)) + "px";
    heart.style.top = "30px";

    heart.style.color = colors[Math.floor(Math.random()*colors.length)];
    heart.style.fontSize = (isMobile ? (12 + Math.random()*12) : (12 + Math.random()*18)) + "px";

    const dur = (isMobile ? 1800 : 1600) + Math.random()*1200;
    heart.style.animationDuration = dur + "ms";

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), dur);

    if(Date.now() > end){
      clearInterval(interval);
    }
  }, isMobile ? 120 : 90);
}

/* Si giran el celular o cambia el tamaño, re-dibuja copa */
window.addEventListener("resize", () => {
  if(!scene.classList.contains("hidden")){
    // redibuja suave solo si ya existe algo en canopy
    if(canopy.childElementCount > 0) drawHeartCanopy();
  }
});
