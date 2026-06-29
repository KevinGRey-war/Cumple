const imageFiles = [
  "foto-01.jpg",
  "foto-02.jpg",
  "foto-03.jpg",
  "foto-04.jpg",
  "foto-05.jpg",
  "foto-06.jpg",
  "foto-07.jpg",
  "foto-08.jpg",
  "foto-09.jpg",
  "foto-10.jpg",
  "foto-11.jpeg",
  "foto-12.jpg",
  "foto-13.jpg",
  "foto-14.jpg",
  "foto-15.jpg",
  "foto-16.jpg",
  "foto-17.jpg",
  "foto-18.jpg",
  "foto-19.jpg",
  "foto-20.jpg",
  "foto-21.jpg",
  "foto-22.jpg",
  "foto-23.jpg",
  "foto-24.jpeg",
  "foto-25.jpg",
  "foto-26.jpg",
  "foto-26.jpg",
  "foto-27.jpg",
  "foto-28.jpg",
  "foto-29.jpg",
  "foto-30.jpg",
  "foto-31.jpg",
  "foto-32.jpg",
  "foto-33.jpg",
  "foto-34.jpg",
  "foto-35.jpg",
  "foto-36.jpg",
  "foto-37.jpg",
  "foto-38.jpg",
  "foto-39.jpg",
  "foto-40.jpg",
  "foto-41.jpg",
  "foto-42.jpg",
  "foto-43.jpg",
  "foto-44.jpg",
  "foto-45.jpg",
  "foto-46.jpg",
  "foto-47.jpg",
  "foto-48.jpg",
  "foto-49.jpg",
  "foto-50.jpg",
  "foto-51.jpg",
  "foto-52.jpg",
  "foto-53.jpg",
  "foto-54.jpg",
  "foto-55.jpg",
  "foto-56.jpg",
  "foto-57.jpg",
];

const phrases = [
  "Gracias por existir.",
  "Siempre contigo.",
  "Para las buenas...",
  "Y para las malas.",
  "Te amo.",
  "Mi verdadero amor."
];

const letterText = `Dennise, feliz cumpleaños.

Hoy quiero regalarte algo que no sea solo una pagina, sino un pedacito de nuestra historia convertido en cielo, luz y memoria.

Gracias por llegar a mi vida, por cambiarla para siempre y por hacer que los dias tengan una razon mas bonita.

Te amo por lo que eres, por lo que sueñas, por tu forma de mirar la vida y por todo lo que construimos juntos.

Que este viaje te recuerde que eres mi universo favorito.`;

const loader = document.querySelector("#loader");
const startButton = document.querySelector("#startStory");
const intro = document.querySelector("#intro");
const introLine = document.querySelector("#introLine");
const openLetterButton = document.querySelector("#openLetter");
const letterPaper = document.querySelector("#letterPaper");
const typedLetter = document.querySelector("#typedLetter");
const coverflow = document.querySelector("#coverflow");
const heartGrid = document.querySelector("#heartGrid");
const phraseText = document.querySelector("#phraseText");
const loveCounter = document.querySelector("#loveCounter");
const music = document.querySelector("#music");
const musicControl = document.querySelector("#musicControl");
const musicIcon = document.querySelector("#musicIcon");
const volume = document.querySelector("#volume");
const fallingLayer = document.querySelector("#fallingLayer");
const sceneDots = document.querySelector("#sceneDots");
const cursorDot = document.querySelector(".cursor-dot");
const imagePreview = document.querySelector("#imagePreview");
const previewImage = document.querySelector("#previewImage");

let phraseIndex = 0;
let letterStarted = false;
let finaleVisible = false;

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 3000);
  buildCoverflow();
  buildHeart();
  buildDots();
  updateCounter();
  setInterval(updateCounter, 60_000);
  setInterval(rotatePhrase, 2600);
  setInterval(spawnFallingItem, 420);
});

startButton.addEventListener("click", async () => {
  await playMusic();
  document.body.classList.add("story-started");
  intro.scrollIntoView({ behavior: "smooth" });
  runIntro();
});

openLetterButton.addEventListener("click", () => {
  openLetterButton.classList.add("open");
  letterPaper.classList.add("revealed");
  if (!letterStarted) {
    letterStarted = true;
    typeWriter(letterText, typedLetter, 28);
  }
});

musicControl.addEventListener("click", async event => {
  if (event.target === volume) return;
  if (music.paused) await playMusic();
  else {
    music.pause();
    musicIcon.textContent = "♪";
  }
});

volume.addEventListener("input", () => {
  music.volume = volume.value;
});

document.querySelectorAll("video").forEach(video => {
  video.addEventListener("mouseenter", async () => {
    try {
      await video.play();
    } catch {
      video.muted = true;
      await video.play().catch(() => {});
    }
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
  });
});

document.addEventListener("mousemove", event => {
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
});

async function playMusic() {
  music.volume = volume.value;
  try {
    await music.play();
    musicIcon.textContent = "❚❚";
  } catch {
    musicIcon.textContent = "♪";
  }
}

function runIntro() {
  const lines = [
    "Hay personas que llegan a nuestra vida...",
    "...y la cambian para siempre."
  ];
  let index = 0;

  introLine.textContent = lines[index];
  introLine.classList.add("visible");

  const interval = setInterval(() => {
    introLine.classList.remove("visible");
    setTimeout(() => {
      index += 1;
      if (index >= lines.length) {
        clearInterval(interval);
        document.querySelector("#letter").scrollIntoView({ behavior: "smooth" });
        return;
      }
      introLine.textContent = lines[index];
      introLine.classList.add("visible");
    }, 750);
  }, 2400);
}

function typeWriter(text, element, speed) {
  element.textContent = "";
  let index = 0;
  const timer = setInterval(() => {
    element.textContent += text[index];
    index += 1;
    if (index >= text.length) clearInterval(timer);
  }, speed);
}

function buildCoverflow() {
  coverflow.innerHTML = "";
  const total = imageFiles.length;
  imageFiles.forEach((file, index) => {
    const card = document.createElement("article");
    const offset = index - (total - 1) / 2;
    const depth = Math.abs(offset);
    const baseTransform = `translate(-50%, -50%) translateX(${offset * 86}px) translateZ(${-depth * 46}px) rotateY(${-offset * 13}deg) rotateZ(${offset * 1.5}deg)`;
    card.className = "memory-card";
    card.style.transform = baseTransform;
    card.dataset.baseTransform = baseTransform;
    card.style.zIndex = `${100 - depth}`;
    card.style.animationDelay = `${index * -.28}s`;
    const enlargeCard = () => {
      card.style.transform = `${card.dataset.baseTransform} scale(1.55)`;
      showImagePreview(`img/${file}`, `Recuerdo ${index + 1}`);
    };
    const restoreCard = () => {
      card.style.transform = card.dataset.baseTransform;
      hideImagePreview();
    };
    card.addEventListener("mouseenter", enlargeCard);
    card.addEventListener("pointerenter", enlargeCard);
    card.addEventListener("mouseleave", restoreCard);
    card.addEventListener("pointerleave", restoreCard);
    card.append(createPhotoElement(file, `Recuerdo ${index + 1}`));
    coverflow.append(card);
  });
}

function createPhotoElement(file, fallbackText) {
  const img = document.createElement("img");
  img.src = `img/${file}`;
  img.alt = fallbackText;
  img.loading = "lazy";
  img.onerror = () => {
    const fallback = document.createElement("div");
    fallback.className = "fallback-photo";
    fallback.textContent = fallbackText;
    img.replaceWith(fallback);
  };
  return img;
}

function buildHeart() {
  heartGrid.innerHTML = "";
  const points = heartPoints(60);
  points.forEach((point, index) => {
    const tile = document.createElement("div");
    tile.className = "heart-photo";
    tile.style.setProperty("--x", `${point.x}px`);
    tile.style.setProperty("--y", `${point.y}px`);
    tile.style.setProperty("--r", `${(index % 7) - 3}deg`);
    tile.style.setProperty("--s", "1");
    tile.style.left = "50%";
    tile.style.top = "50%";
    tile.style.animationDelay = `${index * -.06}s`;
    const enlargeTile = () => {
      tile.style.setProperty("--s", "2.15");
      showImagePreview(`img/${imageFiles[index % imageFiles.length]}`, "Dennise ♥");
    };
    const restoreTile = () => {
      tile.style.setProperty("--s", "1");
      hideImagePreview();
    };
    tile.addEventListener("mouseenter", enlargeTile);
    tile.addEventListener("pointerenter", enlargeTile);
    tile.addEventListener("mouseleave", restoreTile);
    tile.addEventListener("pointerleave", restoreTile);
    tile.append(createPhotoElement(imageFiles[index % imageFiles.length], "Dennise ♥"));
    heartGrid.append(tile);
  });
}

function showImagePreview(src, alt) {
  previewImage.src = src;
  previewImage.alt = alt;
  imagePreview.classList.add("visible");
}

function hideImagePreview() {
  imagePreview.classList.remove("visible");
}

function heartPoints(count) {
  const points = [];
  const scale = Math.min(heartGrid.clientWidth, heartGrid.clientHeight) / 34;
  for (let i = 0; i < count; i += 1) {
    const t = (Math.PI * 2 * i) / count;
    const x = 16 * Math.sin(t) ** 3;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({ x: x * scale - 34, y: y * scale - 34 });
  }
  return points;
}

function rotatePhrase() {
  phraseText.classList.add("fade");
  setTimeout(() => {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    phraseText.textContent = phrases[phraseIndex];
    phraseText.classList.remove("fade");
  }, 600);
}

function updateCounter() {
  const start = new Date("2014-01-01T00:00:00");
  const now = new Date();
  const days = Math.floor((now - start) / 86_400_000);
  loveCounter.textContent = `${days.toLocaleString("es-EC")} dias`;
}

function spawnFallingItem() {
  const item = document.createElement("span");
  const isHeart = Math.random() > 0.48;
  item.className = "falling-item";
  item.textContent = isHeart ? "♥" : "✦";
  item.style.left = `${Math.random() * 100}vw`;
  item.style.fontSize = `${14 + Math.random() * 22}px`;
  item.style.animationDuration = `${5 + Math.random() * 5}s`;
  item.style.color = isHeart ? "var(--rose)" : "var(--gold)";
  fallingLayer.append(item);
  setTimeout(() => item.remove(), 10_500);
}

function buildDots() {
  const scenes = [...document.querySelectorAll(".scene")];
  scenes.forEach(scene => {
    const button = document.createElement("button");
    button.setAttribute("aria-label", scene.id);
    button.addEventListener("click", () => scene.scrollIntoView({ behavior: "smooth" }));
    sceneDots.append(button);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = scenes.indexOf(entry.target);
      [...sceneDots.children].forEach((button, buttonIndex) => {
        button.classList.toggle("active", buttonIndex === index);
      });

      if (entry.target.id === "letter") {
        openLetterButton.classList.add("open");
        letterPaper.classList.add("revealed");
        if (!letterStarted) {
          letterStarted = true;
          typeWriter(letterText, typedLetter, 24);
        }
      }

      if (entry.target.id === "finale" && !finaleVisible) {
        finaleVisible = true;
        startFireworks();
      }
    });
  }, { threshold: 0.52 });

  scenes.forEach(scene => observer.observe(scene));
}

const universe = document.querySelector("#universe");
const universeContext = universe.getContext("2d");
const fireworks = document.querySelector("#fireworks");
const fireworksContext = fireworks.getContext("2d");
let stars = [];
let particles = [];
let fireworkParticles = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  universe.width = innerWidth * ratio;
  universe.height = innerHeight * ratio;
  fireworks.width = innerWidth * ratio;
  fireworks.height = innerHeight * ratio;
  stars = Array.from({ length: Math.min(900, Math.floor(innerWidth * innerHeight / 1100)) }, () => ({
    x: Math.random() * universe.width,
    y: Math.random() * universe.height,
    r: Math.random() * 1.8 + .35,
    speed: Math.random() * .28 + .05,
    alpha: Math.random() * .74 + .22
  }));
  particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * universe.width,
    y: Math.random() * universe.height,
    r: Math.random() * 2.6 + .9,
    vx: (Math.random() - .5) * .34,
    vy: (Math.random() - .5) * .34,
    hue: Math.random() > .5 ? "255, 0, 85" : "255, 209, 102"
  }));
  buildHeart();
}

function drawUniverse() {
  const width = universe.width;
  const height = universe.height;
  const gradient = universeContext.createRadialGradient(width * .5, height * .3, 0, width * .5, height * .5, width * .75);
  gradient.addColorStop(0, "#172247");
  gradient.addColorStop(.45, "#081120");
  gradient.addColorStop(1, "#020412");
  universeContext.fillStyle = gradient;
  universeContext.fillRect(0, 0, width, height);

  drawNebula(width, height);

  for (const star of stars) {
    universeContext.globalAlpha = star.alpha;
    universeContext.fillStyle = "#fff";
    universeContext.beginPath();
    universeContext.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    universeContext.fill();
    star.y += star.speed * (window.devicePixelRatio || 1);
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
  }

  for (const particle of particles) {
    universeContext.globalAlpha = .18;
    universeContext.fillStyle = `rgb(${particle.hue})`;
    universeContext.beginPath();
    universeContext.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    universeContext.fill();
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;
  }

  universeContext.globalAlpha = 1;
  requestAnimationFrame(drawUniverse);
}

function drawNebula(width, height) {
  const nebulaOne = universeContext.createRadialGradient(width * .25, height * .28, 0, width * .25, height * .28, width * .34);
  nebulaOne.addColorStop(0, "rgba(255,0,85,.20)");
  nebulaOne.addColorStop(1, "rgba(255,0,85,0)");
  universeContext.fillStyle = nebulaOne;
  universeContext.fillRect(0, 0, width, height);

  const nebulaTwo = universeContext.createRadialGradient(width * .78, height * .62, 0, width * .78, height * .62, width * .36);
  nebulaTwo.addColorStop(0, "rgba(255,209,102,.14)");
  nebulaTwo.addColorStop(1, "rgba(255,209,102,0)");
  universeContext.fillStyle = nebulaTwo;
  universeContext.fillRect(0, 0, width, height);
}

function startFireworks() {
  setInterval(() => {
    const ratio = window.devicePixelRatio || 1;
    const x = (innerWidth * (.2 + Math.random() * .6)) * ratio;
    const y = (innerHeight * (.18 + Math.random() * .35)) * ratio;
    const color = Math.random() > .5 ? "255, 0, 85" : "255, 209, 102";
    for (let i = 0; i < 70; i += 1) {
      const angle = (Math.PI * 2 * i) / 70;
      const speed = 2 + Math.random() * 4;
      fireworkParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80,
        color
      });
    }
  }, 950);
}

function drawFireworks() {
  fireworksContext.clearRect(0, 0, fireworks.width, fireworks.height);
  fireworkParticles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += .035;
    particle.life -= 1;
    fireworksContext.globalAlpha = Math.max(0, particle.life / 80);
    fireworksContext.fillStyle = `rgb(${particle.color})`;
    fireworksContext.beginPath();
    fireworksContext.arc(particle.x, particle.y, 2.4 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
    fireworksContext.fill();
  });
  fireworkParticles = fireworkParticles.filter(particle => particle.life > 0);
  fireworksContext.globalAlpha = 1;
  requestAnimationFrame(drawFireworks);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawUniverse();
drawFireworks();
