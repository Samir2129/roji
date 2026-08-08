"use strict";

/* ==========================================
PREMIUM BIRTHDAY WEBSITE
Birthday: 29 August 2026, 10:00 PM
========================================== */

const BIRTHDAY_TIME = new Date(
2026,
7,      // August
29,     // Date
22,     // 10 PM
0,      // Minutes
0,      // Seconds
0       // Milliseconds
).getTime();

/* ==========================
ELEMENTS
========================== */

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

const titleEl = document.querySelector(".title");
const subtitleEl = document.querySelector(".subtitle");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const openGift = document.getElementById("openGift");

const surpriseContent =
document.getElementById("surpriseContent");

const giftSection =
document.getElementById("giftSection");

const wishBtn =
document.getElementById("wishBtn");

const gift =
document.querySelector(".gift-box");

const heartsContainer =
document.getElementById("hearts");

const canvas =
document.getElementById("fireworks");

const ctx =
canvas ? canvas.getContext("2d") : null;

const messageEl =
document.querySelector("#giftSection .message");

/* ==========================
VARIABLES
========================== */

let celebrationStarted = false;
let playing = false;
let typewriterStarted = false;

let particles = [];
let confetti = [];

/* ==========================
LOADER
========================== */

window.addEventListener("load", () => {

```
const loader = document.getElementById("loader");

setTimeout(() => {
    if (loader) {
        loader.style.display = "none";
    }
}, 3000);

window.scrollTo({
    top: 0,
    behavior: "auto"
});
```

});

/* ==========================
TYPEWRITER
Starts ONLY after unlock
========================== */

function startTypewriter() {

```
if (typewriterStarted || !messageEl) {
    return;
}

typewriterStarted = true;

const originalText =
    messageEl.dataset.message ||
    messageEl.textContent.trim();

messageEl.dataset.message = originalText;

messageEl.textContent = "";

let index = 0;

function typeWriter() {

    if (index < originalText.length) {

        messageEl.textContent +=
            originalText.charAt(index);

        index++;

        setTimeout(typeWriter, 25);
    }
}

typeWriter();
```

}

/* ==========================
MESSAGE VISIBILITY
========================== */

function setMessageVisibility(visible) {

```
if (!messageEl) {
    return;
}

if (visible) {

    messageEl.style.visibility = "visible";
    messageEl.style.height = "";
    messageEl.style.padding = "";
    messageEl.style.overflow = "";

} else {

    messageEl.style.visibility = "hidden";
    messageEl.style.height = "0";
    messageEl.style.padding = "0";
    messageEl.style.overflow = "hidden";
}
```

}

/* ==========================
LOCK SURPRISE
========================== */

function setGiftLocked() {

```
/* Hide EVERYTHING below the surprise button */
if (surpriseContent) {

    surpriseContent.hidden = true;

    surpriseContent.classList.remove("show");
}

/* Keep button locked */
if (openGift) {

    openGift.disabled = true;

    openGift.textContent =
        "🎁 Surprise Unlocks on 29/08/2026";
}

setMessageVisibility(false);
```

}

/* ==========================
UNLOCK SURPRISE
========================== */

function setBirthdayState() {

```
/* Show EVERYTHING */
if (surpriseContent) {

    surpriseContent.hidden = false;

    surpriseContent.classList.add("show");
}

/* Unlock button */
if (openGift) {

    openGift.disabled = false;

    openGift.textContent =
        "🎁 Open Your Surprise";
}

setMessageVisibility(true);

startTypewriter();
```

}

/* ==========================
COUNTDOWN
========================== */

function updateCountdown() {

```
const now = Date.now();

const distance =
    BIRTHDAY_TIME - now;


/* ==========================
   BIRTHDAY ARRIVED
========================== */

if (distance <= 0) {

    if (dayEl) {
        dayEl.textContent = "00";
    }

    if (hourEl) {
        hourEl.textContent = "00";
    }

    if (minuteEl) {
        minuteEl.textContent = "00";
    }

    if (secondEl) {
        secondEl.textContent = "00";
    }


    if (titleEl) {

        titleEl.textContent =
            "🎉 Happy Birthday Rojina 🎂";
    }


    if (subtitleEl) {

        subtitleEl.textContent =
            "Wishing You Endless Happiness 💖";
    }


    /* Unlock complete surprise */
    setBirthdayState();


    /* Start celebration */
    startBirthdayCelebration();


    clearInterval(countdownTimer);

    return;
}


/* ==========================
   COUNTDOWN CALCULATION
========================== */

const days =
    Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
    );

const hours =
    Math.floor(
        (distance %
            (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

const minutes =
    Math.floor(
        (distance %
            (1000 * 60 * 60)) /
        (1000 * 60)
    );

const seconds =
    Math.floor(
        (distance %
            (1000 * 60)) /
        1000
    );


if (dayEl) {

    dayEl.textContent =
        String(days).padStart(2, "0");
}

if (hourEl) {

    hourEl.textContent =
        String(hours).padStart(2, "0");
}

if (minuteEl) {

    minuteEl.textContent =
        String(minutes).padStart(2, "0");
}

if (secondEl) {

    secondEl.textContent =
        String(seconds).padStart(2, "0");
}
```

}

/* ==========================
INITIAL LOCK
========================== */

if (Date.now() < BIRTHDAY_TIME) {

```
setGiftLocked();
```

}

/* ==========================
START COUNTDOWN
========================== */

const countdownTimer =
setInterval(updateCountdown, 1000);

updateCountdown();

/* ==========================
MUSIC
========================== */

async function playMusic() {

```
if (!music) {
    return false;
}

try {

    await music.play();

    playing = true;

    if (musicBtn) {

        musicBtn.textContent =
            "⏸ Pause Music";
    }

    return true;

} catch (error) {

    playing = false;

    if (musicBtn) {

        musicBtn.textContent =
            "🎵 Play Music";
    }

    return false;
}
```

}

function pauseMusic() {

```
if (!music) {
    return;
}

music.pause();

playing = false;

if (musicBtn) {

    musicBtn.textContent =
        "🎵 Play Music";
}
```

}

if (musicBtn && music) {

```
musicBtn.addEventListener(
    "click",
    async () => {

        if (music.paused) {

            await playMusic();

        } else {

            pauseMusic();
        }
    }
);


music.addEventListener(
    "play",
    () => {

        playing = true;

        musicBtn.textContent =
            "⏸ Pause Music";
    }
);


music.addEventListener(
    "pause",
    () => {

        playing = false;

        musicBtn.textContent =
            "🎵 Play Music";
    }
);
```

}

/* ==========================
OPEN SURPRISE BUTTON
========================== */

if (openGift) {

```
openGift.addEventListener(
    "click",
    () => {

        /* Never allow before birthday */
        if (
            openGift.disabled ||
            Date.now() < BIRTHDAY_TIME
        ) {
            return;
        }


        /* Make sure surprise is visible */
        if (surpriseContent) {

            surpriseContent.hidden = false;
        }


        /* Scroll to message */
        if (giftSection) {

            giftSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
);
```

}

/* ==========================
WISH BUTTON
========================== */

if (wishBtn) {

```
wishBtn.addEventListener(
    "click",
    () => {

        alert(
```

`✨ Close your eyes...

Make a beautiful wish...

May every dream of Rojina come true!

🎂 Happy Birthday ❤️`
);
}
);
}

/* ==========================
CANVAS
========================== */

function resizeCanvas() {

```
if (!canvas) {
    return;
}

const ratio =
    Math.min(
        window.devicePixelRatio || 1,
        2
    );


canvas.width =
    Math.floor(
        window.innerWidth * ratio
    );

canvas.height =
    Math.floor(
        window.innerHeight * ratio
    );


canvas.style.width =
    `${window.innerWidth}px`;

canvas.style.height =
    `${window.innerHeight}px`;


if (ctx) {

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}
```

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

/* ==========================
FIREWORK PARTICLE
========================== */

class Particle {

```
constructor(x, y, color) {

    this.x = x;
    this.y = y;

    this.radius =
        Math.random() * 3 + 1.5;

    this.color = color;

    this.speedX =
        (Math.random() - 0.5) * 10;

    this.speedY =
        (Math.random() - 0.5) * 10;

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

    if (!ctx) {
        return;
    }

    ctx.save();

    ctx.globalAlpha =
        Math.max(this.alpha, 0);

    ctx.beginPath();

    ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = this.color;

    ctx.fill();

    ctx.restore();
}
```

}

/* ==========================
CONFETTI
========================== */

class ConfettiPiece {

```
constructor() {

    this.x =
        Math.random() *
        window.innerWidth;

    this.y = -20;

    this.size =
        Math.random() * 10 + 5;

    this.speed =
        Math.random() * 4 + 2;

    this.rotation =
        Math.random() * 360;

    this.rotateSpeed =
        Math.random() * 8 - 4;


    const colors = [
        "#ff4fd8",
        "#ff66cc",
        "#9b59ff",
        "#ffd700",
        "#00e5ff",
        "#ffffff"
    ];


    this.color =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];
}


update() {

    this.y += this.speed;

    this.rotation +=
        this.rotateSpeed;
}


draw() {

    if (!ctx) {
        return;
    }

    ctx.save();

    ctx.translate(
        this.x,
        this.y
    );

    ctx.rotate(
        (this.rotation * Math.PI) / 180
    );

    ctx.fillStyle =
        this.color;

    ctx.fillRect(
        -this.size / 2,
        -this.size / 2,
        this.size,
        this.size
    );

    ctx.restore();
}
```

}

/* ==========================
CREATE FIREWORK
========================== */

function createFirework(x, y) {

```
const colors = [
    "#ff4fd8",
    "#ffea00",
    "#ffffff",
    "#9b59ff",
    "#00e5ff",
    "#ff6b6b"
];


for (let i = 0; i < 120; i++) {

    particles.push(
        new Particle(
            x,
            y,
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ]
        )
    );
}
```

}

/* ==========================
CONFETTI LAUNCH
========================== */

function launchConfetti() {

```
for (let i = 0; i < 250; i++) {

    confetti.push(
        new ConfettiPiece()
    );
}
```

}

/* ==========================
UPDATE CONFETTI
========================== */

function updateConfetti() {

```
if (!ctx || !canvas) {
    return;
}


for (
    let i = confetti.length - 1;
    i >= 0;
    i--
) {

    confetti[i].update();

    confetti[i].draw();


    if (
        confetti[i].y >
        window.innerHeight + 30
    ) {

        confetti.splice(i, 1);
    }
}
```

}

/* ==========================
ANIMATE FIREWORKS
========================== */

function animateFireworks() {

```
if (!ctx || !canvas) {
    return;
}


ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
);


for (
    let i = particles.length - 1;
    i >= 0;
    i--
) {

    particles[i].update();

    particles[i].draw();


    if (
        particles[i].alpha <= 0
    ) {

        particles.splice(i, 1);
    }
}


updateConfetti();

requestAnimationFrame(
    animateFireworks
);
```

}

animateFireworks();

/* ==========================
START FIREWORKS
========================== */

function startFireworks() {

```
if (!canvas) {
    return;
}


for (let i = 0; i < 12; i++) {

    setTimeout(
        () => {

            createFirework(
                Math.random() *
                    window.innerWidth,

                Math.random() *
                    (window.innerHeight / 2)
            );

        },
        i * 400
    );
}
```

}

/* ==========================
AUTOMATIC BIRTHDAY MODE
========================== */

function startBirthdayCelebration() {

```
if (celebrationStarted) {
    return;
}

celebrationStarted = true;


/* Unlock surprise */
setBirthdayState();


/* Fireworks */
startFireworks();


/* Confetti */
launchConfetti();


/* Change title */
if (titleEl) {

    titleEl.textContent =
        "🎉 Happy Birthday Rojina 🎂";
}


/* Change subtitle */
if (subtitleEl) {

    subtitleEl.textContent =
        "Wishing You Endless Happiness 💖";
}


/*
   Browsers may block autoplay.
   We try automatically.
   Play button remains available.
*/

playMusic();


setTimeout(
    () => {

        alert(
```

`🎉 HAPPY BIRTHDAY ROJINA! 🎂

May your life always be filled with happiness,
love, success and beautiful memories.

Have a wonderful Birthday! ❤️`
);

```
    },
    1200
);
```

}

/* ==========================
FLOATING HEARTS
========================== */

function createHeart() {

```
if (!heartsContainer) {
    return;
}


const heart =
    document.createElement("div");

heart.className = "heart";

heart.textContent = "❤️";

heart.style.left =
    `${Math.random() * 100}vw`;

heart.style.animationDuration =
    `${4 + Math.random() * 4}s`;

heart.style.fontSize =
    `${18 + Math.random() * 22}px`;


heartsContainer.appendChild(
    heart
);


setTimeout(
    () => heart.remove(),
    8000
);
```

}

setInterval(
createHeart,
700
);

/* ==========================
BALLOONS
========================== */

function createBalloon() {

```
const balloon =
    document.createElement("div");

balloon.classList.add(
    "balloon"
);


const colors = [
    "pink",
    "purple",
    "white"
];


balloon.classList.add(
    colors[
        Math.floor(
            Math.random() *
            colors.length
        )
    ]
);


balloon.style.left =
    `${Math.random() * 100}vw`;

balloon.style.animationDuration =
    `${8 + Math.random() * 6}s`;


document.body.appendChild(
    balloon
);


setTimeout(
    () => balloon.remove(),
    15000
);
```

}

setInterval(
createBalloon,
3500
);

/* ==========================
ROSE PETALS
========================== */

function createPetal() {

```
const petal =
    document.createElement("div");

petal.className = "petal";

petal.textContent = "🌸";

petal.style.left =
    `${Math.random() * 100}vw`;

petal.style.animationDuration =
    `${6 + Math.random() * 5}s`;

petal.style.fontSize =
    `${16 + Math.random() * 16}px`;


document.body.appendChild(
    petal
);


setTimeout(
    () => petal.remove(),
    12000
);
```

}

setInterval(
createPetal,
1400
);

/* ==========================
SHOOTING STARS
========================== */

function createShootingStar() {

```
const star =
    document.createElement("div");

star.className =
    "shooting-star";

star.style.top =
    `${Math.random() * 250}px`;


document.body.appendChild(
    star
);


setTimeout(
    () => star.remove(),
    5000
);
```

}

setInterval(
createShootingStar,
8000
);

/* ==========================
DESKTOP SPARKLES
========================== */

let lastSparkleTime = 0;

document.addEventListener(
"mousemove",
(event) => {

```
    const now =
        performance.now();


    if (
        now - lastSparkleTime < 60
    ) {
        return;
    }


    lastSparkleTime = now;


    const sparkle =
        document.createElement("div");

    sparkle.className =
        "sparkle";

    sparkle.style.left =
        `${event.pageX}px`;

    sparkle.style.top =
        `${event.pageY}px`;


    document.body.appendChild(
        sparkle
    );


    setTimeout(
        () => sparkle.remove(),
        1000
    );
}
```

);

/* ==========================
PHOTO EFFECT
========================== */

const photos =
document.querySelectorAll(
".photos img"
);

photos.forEach(
(photo) => {

```
    photo.addEventListener(
        "click",
        () => {

            photo.style.transform =
                "scale(1.08)";

            photo.style.zIndex =
                "999";


            setTimeout(
                () => {

                    photo.style.transform =
                        "";

                    photo.style.zIndex =
                        "";

                },
                1000
            );
        }
    );
}
```

);

/* ==========================
GIFT BOX EFFECT
========================== */

if (gift) {

```
gift.addEventListener(
    "click",
    () => {

        gift.style.transform =
            "scale(1.25) rotate(20deg)";

        gift.textContent =
            "💖";


        setTimeout(
            () => {

                gift.style.transform =
                    "";

                gift.textContent =
                    "🎁";

            },
            1200
        );
    }
);
```

}

/* ==========================
BACKGROUND GLOW
========================== */

let glow = false;

setInterval(
() => {

```
    document.body.style.background =
        glow
            ? "linear-gradient(180deg,#050018,#14042e,#23053d,#33064f)"
            : "linear-gradient(180deg,#120028,#2c084e,#43106e,#63119a)";

    glow = !glow;

},
10000
```

);

/* ==========================
READY
========================== */

console.log(
"🎉 Birthday Celebration Ready"
);

console.log(
"🎂 Unlock time:",
new Date(BIRTHDAY_TIME)
);
