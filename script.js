const glow = document.querySelector(".cursor-glow");
const dot = document.querySelector(".cursor-dot");

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let dotX = mouseX;
let dotY = mouseY;


/* =========================
   SMOOTH CURSOR
========================= */

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function cursorLoop() {

    glowX +=
        (mouseX - glowX) * 0.08;

    glowY +=
        (mouseY - glowY) * 0.08;

    dotX +=
        (mouseX - dotX) * 0.35;

    dotY +=
        (mouseY - dotY) * 0.35;

    glow.style.left =
        `${glowX}px`;

    glow.style.top =
        `${glowY}px`;

    dot.style.left =
        `${dotX}px`;

    dot.style.top =
        `${dotY}px`;

    requestAnimationFrame(
        cursorLoop
    );

}

cursorLoop();


/* =========================
   MAGNETIC BUTTONS
========================= */

const magneticElements =
    document.querySelectorAll(".magnetic");

magneticElements.forEach((element) => {

    element.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "";

        }
    );

});


/* =========================
   CURSOR INTERACTION
========================= */

const interactive =
    document.querySelectorAll(
        "a, .feature-card, .app-window"
    );

interactive.forEach((element) => {

    element.addEventListener(
        "mouseenter",
        () => {

            glow.style.width =
                "600px";

            glow.style.height =
                "600px";

            dot.style.transform =
                "translate(-50%, -50%) scale(2)";

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            glow.style.width =
                "430px";

            glow.style.height =
                "430px";

            dot.style.transform =
                "translate(-50%, -50%) scale(1)";

        }
    );

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        observer.observe(element);

    }
);


/* =========================
   FEATURE CARD TILT
========================= */

const cards =
    document.querySelectorAll(
        ".feature-card"
    );

cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateY =
                ((x - rect.width / 2) /
                    rect.width) * 5;

            const rotateX =
                ((y - rect.height / 2) /
                    rect.height) * -5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================
   FAKE APP CPS ANIMATION
========================= */

const cps =
    document.getElementById(
        "fakeCps"
    );

let currentCps = 100;

function animateCps() {

    if (!cps) return;

    currentCps +=
        (Math.random() - 0.5) * 3;

    currentCps =
        Math.max(
            96,
            Math.min(
                104,
                currentCps
            )
        );

    cps.textContent =
        Math.round(currentCps);

    requestAnimationFrame(
        animateCps
    );

}

animateCps();


/* =========================
   SMOOTH ANCHORS
========================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute(
                        "href"
                    );

                const target =
                    document.querySelector(
                        id
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================
   PARALLAX BACKGROUND
========================= */

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        document
            .querySelector(".orb-one")
            .style.transform =
            `translateY(${scroll * 0.08}px)`;

        document
            .querySelector(".orb-two")
            .style.transform =
            `translateY(${scroll * -0.05}px)`;

    },
    {
        passive: true
    }
);
