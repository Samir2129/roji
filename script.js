window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }, 3000);

    const message = document.querySelector(".message");
    if (message) {
        const originalText = message.textContent.trim();
        message.textContent = "";
        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                message.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 25);
            }
        }

        setTimeout(typeWriter, 3500);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
});

const birthdayDate = new Date("August 29, 2026 00:00:00").getTime();
const now = Date.now();
const isBirthday = now >= birthdayDate;

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const titleEl = document.querySelector(".title");
const subtitleEl = document.querySelector(".subtitle");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const openGift = document.getElementById("openGift");
const giftSection = document.getElementById("giftSection");
const wishBtn = document.getElementById("wishBtn");
const heartsContainer = document.getElementById("hearts");
const canvas = document.getElementById("fireworks");
const ctx = canvas ? canvas.getContext("2d") : null;
const messageEl = document.querySelector("#giftSection .message");

let celebrationStarted = false;
let playing = false;
let particles = [];
let confetti = [];

if (messageEl) {
    if (!isBirthday) {
        messageEl.style.visibility = "hidden";
        messageEl.style.height = "0";
        messageEl.style.padding = "0";
        messageEl.style.overflow = "hidden";
    } else {
        messageEl.style.visibility = "visible";
        messageEl.style.height = "";
        messageEl.style.padding = "";
        messageEl.style.overflow = "";
    }
}

if (giftSection && !isBirthday) {
    giftSection.classList.add("hidden");
}

if (openGift) {
    if (!isBirthday) {
        openGift.disabled = true;
        openGift.textContent = "🎁 Surprise Unlocks on 29/08/2026";
    } else {
        openGift.disabled = false;
        openGift.textContent = "🎁 Open Your Surprise";
    }
}

function updateCountdown() {
    const now = Date.now();
    const distance = birthdayDate - now;

    if (distance <= 0) {
        if (dayEl) dayEl.textContent = "00";
        if (hourEl) hourEl.textContent = "00";
        if (minuteEl) minuteEl.textContent = "00";
        if (secondEl) secondEl.textContent = "00";

        if (titleEl) titleEl.textContent = "🎉 Happy Birthday Rojina 🎉";
        if (subtitleEl) subtitleEl.textContent = "The surprise is now open 💖";

        if (openGift) {
            openGift.disabled = false;
            openGift.textContent = "🎁 Open Your Surprise";
        }

        if (giftSection) giftSection.classList.remove("hidden");
        if (messageEl) {
            messageEl.style.visibility = "visible";
            messageEl.style.height = "";
            messageEl.style.padding = "";
            messageEl.style.overflow = "";
        }

        startBirthdayCelebration();
        clearInterval(countdownTimer);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (dayEl) dayEl.textContent = String(days).padStart(2, "0");
    if (hourEl) hourEl.textContent = String(hours).padStart(2, "0");
    if (minuteEl) minuteEl.textContent = String(minutes).padStart(2, "0");
    if (secondEl) secondEl.textContent = String(seconds).padStart(2, "0");
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();

if (musicBtn && music) {
    musicBtn.addEventListener("click", () => {
        if (!playing) {
            music.play().catch(() => {});
            musicBtn.textContent = "⏸ Pause Music";
        } else {
            music.pause();
            musicBtn.textContent = "🎵 Play Music";
        }
        playing = !playing;
    });
}

if (openGift && giftSection) {
    openGift.addEventListener("click", () => {
        if (openGift.disabled) return;
        giftSection.classList.remove("hidden");
        if (messageEl) {
            messageEl.style.visibility = "visible";
            messageEl.style.height = "";
            messageEl.style.padding = "";
            messageEl.style.overflow = "";
        }
        giftSection.scrollIntoView({ behavior: "smooth" });
    });
}

if (wishBtn) {
    wishBtn.addEventListener("click", () => {
        alert(`✨ Close your eyes...
Make a beautiful wish...
May every dream of Rojina come true!
🎂 Happy Birthday ❤️`);
    });
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2;
        this.color = color;
        this.speedX = (Math.random() - 0.5) * 10;
        this.speedY = (Math.random() - 0.5) * 10;
        this.alpha = 1;
        this.gravity = 0.05;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.alpha -= 0.015;
    }
    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

class ConfettiPiece {
    constructor() {
        this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
        this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.speed = Math.random() * 4 + 2;
        this.rotation = Math.random() * 360;
        this.rotateSpeed = Math.random() * 8 - 4;
        this.color = ["#ff4fd8", "#ff66cc", "#9b59ff", "#ffd700", "#00e5ff", "#ffffff"][Math.floor(Math.random() * 6)];
    }
    update() {
        this.y += this.speed;
        this.rotation += this.rotateSpeed;
    }
    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createFirework(x, y) {
    const colors = ["#ff4fd8", "#ffea00", "#ffffff", "#9b59ff", "#00e5ff", "#ff6b6b"];
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
    }
}

function launchConfetti() {
    for (let i = 0; i < 250; i++) {
        confetti.push(new ConfettiPiece());
    }
}

function updateConfetti() {
    if (!ctx || !canvas) return;
    for (let i = confetti.length - 1; i >= 0; i--) {
        confetti[i].update();
        confetti[i].draw();
        if (confetti[i].y > canvas.height + 30) confetti.splice(i, 1);
    }
}

function animateFireworks() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
    }

    updateConfetti();
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

function startFireworks() {
    if (!canvas) return;
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createFirework(Math.random() * canvas.width, Math.random() * (canvas.height / 2));
        }, i * 400);
    }
}

function startBirthdayCelebration() {
    if (celebrationStarted) return;
    celebrationStarted = true;

    startFireworks();
    launchConfetti();

    if (titleEl) titleEl.textContent = "🎉 Happy Birthday Rojina 🎂";
    if (subtitleEl) subtitleEl.textContent = "Wishing You Endless Happiness 💖";
    if (giftSection) giftSection.classList.remove("hidden");

    if (openGift) {
        openGift.disabled = false;
        openGift.textContent = "🎁 Open Your Surprise";
    }

    if (messageEl) {
        messageEl.style.visibility = "visible";
        messageEl.style.height = "";
        messageEl.style.padding = "";
        messageEl.style.overflow = "";
    }

    if (music) {
        music.play().catch(() => {});
        if (musicBtn) musicBtn.textContent = "⏸ Pause Music";
        playing = true;
    }

    setTimeout(() => {
        alert(`🎉 HAPPY BIRTHDAY ROJINA! 🎂

May your life always be filled with happiness,
love, success and beautiful memories.

Have a wonderful Birthday! ❤️`);
    }, 1000);
}

function createHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 4 + Math.random() * 4 + "s";
    heart.style.fontSize = 18 + Math.random() * 22 + "px";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 500);

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    const colors = ["pink", "purple", "white"];
    balloon.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.animationDuration = 8 + Math.random() * 6 + "s";
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 15000);
}
setInterval(createBalloon, 2500);

function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 6 + Math.random() * 5 + "s";
    petal.style.fontSize = 16 + Math.random() * 16 + "px";
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 12000);
}
setInterval(createPetal, 900);

function createShootingStar() {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.top = Math.random() * 250 + "px";
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 5000);
}
setInterval(createShootingStar, 7000);

document.addEventListener("mousemove", (e) => {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = e.pageX + "px";
    sparkle.style.top = e.pageY + "px";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
});

const photos = document.querySelectorAll(".photos img");
photos.forEach((photo) => {
    photo.addEventListener("click", () => {
        photo.style.transform = "scale(1.15)";
        photo.style.zIndex = "999";
        setTimeout(() => {
            photo.style.transform = "scale(1)";
            photo.style.zIndex = "";
        }, 1000);
    });
});

const gift = document.querySelector(".gift-box");
if (gift) {
    gift.addEventListener("click", () => {
        gift.style.transform = "scale(1.25) rotate(20deg)";
        gift.textContent = "💖";
        setTimeout(() => {
            gift.style.transform = "scale(1)";
            gift.textContent = "🎁";
        }, 1200);
    });
}

let glow = false;
setInterval(() => {
    document.body.style.background = glow
        ? "linear-gradient(180deg,#050018,#14042e,#23053d,#33064f)"
        : "linear-gradient(180deg,#120028,#2c084e,#43106e,#63119a)";
    glow = !glow;
}, 10000);

console.log("🎉 Birthday Celebration Ready");
