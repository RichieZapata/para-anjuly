console.log("✅ script.js cargado");

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const scene = document.getElementById("scene");

const heartsLayer = document.getElementById("heartsLayer");
const counter = document.getElementById("counter");

const openLetter = document.getElementById("openLetter");
const letter = document.getElementById("letter");

let counterTimer = null;

startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  scene.classList.remove("hidden");

  startCounter("2008-10-28T00:00:00");
});

openLetter.addEventListener("click", () => {
  openLetter.classList.add("hidden");
  letter.classList.remove("hidden");

  // confeti suave y sin invadir demasiado
  confettiHearts(2200);
}, { once: true });

function startCounter(dateISO){
  const start = new Date(dateISO);

  // por si reinicias
  if (counterTimer) clearInterval(counterTimer);

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
  // limpia confeti previo (por si acaso)
  heartsLayer.innerHTML = "";

  const end = Date.now() + ms;

  // en móvil: menos corazones para que no se vea “montón”
  const isMobile = window.innerWidth <= 520;
  const spawnEvery = isMobile ? 120 : 90; // ms
  const maxSize = isMobile ? 18 : 22;

  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "confetti-heart";
    heart.textContent = "❤";

    // posición X a lo ancho de la tarjeta
    const w = scene.clientWidth;
    heart.style.left = (Math.random() * (w - 20)) + "px";
    heart.style.top = "-10px";

    // colores suaves
    const colors = ["#e63946", "#ff6b6b", "#ffb4c0"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    // tamaño aleatorio, pero controlado
    const size = 12 + Math.random() * maxSize;
    heart.style.fontSize = size + "px";

    // duración / caída
    const dur = (isMobile ? 1600 : 1500) + Math.random() * 1200;
    heart.style.animation = `fall ${dur}ms linear forwards`;

    // pequeña variación de “deriva” con rotate via inline style (ya en keyframe)
    heartsLayer.appendChild(heart);

    setTimeout(() => heart.remove(), dur + 100);

    if(Date.now() > end){
      clearInterval(interval);
    }
  }, spawnEvery);
}
