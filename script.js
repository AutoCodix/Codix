/* =========================================================
   CODIX ∞
   Interactive website engine
========================================================= */


/* =========================================================
   CURSOR
========================================================= */

const glow =
    document.querySelector(".cursor-glow");

const dot =
    document.querySelector(".cursor-dot");

let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let dotX = mouseX;
let dotY = mouseY;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    },
    { passive: true }
);


function cursorLoop() {

    glowX +=
        (mouseX - glowX) * .08;

    glowY +=
        (mouseY - glowY) * .08;

    dotX +=
        (mouseX - dotX) * .35;

    dotY +=
        (mouseY - dotY) * .35;

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


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document
    .querySelectorAll(".magnetic")
    .forEach((element) => {

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
                    `translate(${x * .12}px,${y * .12}px)`;

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


/* =========================================================
   CURSOR INTERACTION
========================================================= */

document
    .querySelectorAll(
        "a,.feature-card,.app-window,.stat-card,.hotkey-panel"
    )
    .forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                glow.style.width =
                    "600px";

                glow.style.height =
                    "600px";

                dot.style.transform =
                    "translate(-50%,-50%) scale(2)";

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
                    "translate(-50%,-50%) scale(1)";

            }
        );

    });


/* =========================================================
   SCROLL REVEAL
========================================================= */

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
            threshold: .12
        }
    );


revealElements.forEach(
    (element) => {

        observer.observe(element);

    }
);


/* =========================================================
   FEATURE TILT
========================================================= */

document
    .querySelectorAll(".feature-card")
    .forEach((card) => {

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


/* =========================================================
   FAKE CPS DISPLAY
========================================================= */

const fakeCps =
    document.getElementById(
        "fakeCps"
    );

let fakeValue = 100;


function updateFakeCps() {

    if (!fakeCps)
        return;

    fakeValue +=
        (Math.random() - .5) * 3;

    fakeValue =
        Math.max(
            96,
            Math.min(
                104,
                fakeValue
            )
        );

    fakeCps.textContent =
        Math.round(fakeValue);

    requestAnimationFrame(
        updateFakeCps
    );

}

updateFakeCps();


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


function animateCounter(
    element
) {

    const target =
        Number(
            element.dataset.target
        );

    let value = 0;

    const duration = 1200;

    const start =
        performance.now();


    function update(now) {

        const progress =
            Math.min(
                (now - start) /
                duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        value =
            Math.round(
                target * eased
            );

        element.textContent =
            value;

        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        }

    }

    requestAnimationFrame(
        update
    );

}


const counterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },
        {
            threshold: .5
        }
    );


counters.forEach(
    (counter) => {

        counterObserver.observe(
            counter
        );

    }
);


/* =========================================================
   LIVE TELEMETRY
========================================================= */

const liveCps =
    document.getElementById(
        "liveCps"
    );

const engineLoad =
    document.getElementById(
        "engineLoad"
    );


const sessionTime =
    document.getElementById(
        "sessionTime"
    );


let seconds = 0;


setInterval(
    () => {

        seconds++;

        const minutes =
            Math.floor(
                seconds / 60
            );

        const remaining =
            seconds % 60;

        sessionTime.textContent =
            `${String(minutes).padStart(2,"0")}:${String(remaining).padStart(2,"0")}`;

    },
    1000
);


setInterval(
    () => {

        const cps =
            96 +
            Math.floor(
                Math.random() * 9
            );

        const load =
            2 +
            Math.floor(
                Math.random() * 7
            );

        liveCps.textContent =
            cps;

        engineLoad.textContent =
            String(load).padStart(
                2,
                "0"
            );

    },
    500
);


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

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

                if (!target)
                    return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =========================================================
   BACKGROUND PARALLAX
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY;

        const orbOne =
            document.querySelector(
                ".orb-one"
            );

        const orbTwo =
            document.querySelector(
                ".orb-two"
            );

        if (orbOne) {

            orbOne.style.transform =
                `translateY(${scroll * .08}px)`;

        }

        if (orbTwo) {

            orbTwo.style.transform =
                `translateY(${scroll * -.05}px)`;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   INFINITE SCROLL
========================================================= */

/*
    We don't duplicate the entire page.

    When the visitor reaches the bottom,
    smoothly jump back to the top.

    Because the page has the same visual language
    throughout, the transition feels continuous.
*/

let resetting = false;


window.addEventListener(
    "scroll",
    () => {

        if (resetting)
            return;

        const scrollPosition =
            window.innerHeight +
            window.scrollY;

        const pageHeight =
            document.documentElement
                .scrollHeight;

        if (
            scrollPosition >=
            pageHeight - 180
        ) {

            resetting = true;

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            setTimeout(
                () => {

                    resetting = false;

                },
                150
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Home"
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }
);
