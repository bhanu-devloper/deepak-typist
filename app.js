/* =====================================================
   DEEPAK TYPIST
   MAIN JAVASCRIPT
===================================================== */


/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("preloader")
            .classList.add("hide");

    }, 700);

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});


/* =========================
   FOOTER YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =====================================================
   TYPING TEST
===================================================== */


const typingTexts = [

    "Success in typing comes from consistent practice. Focus on accuracy first and allow your speed to grow naturally over time.",

    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet and is useful for typing practice.",

    "A good typist does not simply type quickly. A good typist maintains rhythm, accuracy, concentration and confidence throughout the entire exercise.",

    "Daily practice can transform your typing ability. Start slowly, maintain correct finger placement and gradually increase your speed.",

    "Learning computer typing is an important skill for students, professionals and anyone who spends time working with a computer.",

    "Discipline is the bridge between goals and achievement. Practice your typing every day and keep improving one small step at a time."

];


let selectedTime = 60;

let timeLeft = selectedTime;

let timerInterval = null;

let testStarted = false;

let startTime = null;

let currentText = "";

let testFinished = false;


/* ELEMENTS */

const typingTextElement =
    document.getElementById("typingText");

const typingInput =
    document.getElementById("typingInput");

const timerElement =
    document.getElementById("timer");

const wpmElement =
    document.getElementById("wpm");

const accuracyElement =
    document.getElementById("accuracy");

const charactersElement =
    document.getElementById("characters");

const errorsElement =
    document.getElementById("errors");

const startButton =
    document.getElementById("startTest");

const resetButton =
    document.getElementById("resetTest");

const newTextButton =
    document.getElementById("newText");

const resultModal =
    document.getElementById("resultModal");

const closeModal =
    document.getElementById("closeModal");

const retryTest =
    document.getElementById("retryTest");


/* =========================
   RANDOM TEXT
========================= */

function getRandomText() {

    const randomIndex =
        Math.floor(
            Math.random() * typingTexts.length
        );

    return typingTexts[randomIndex];
}


/* =========================
   LOAD TEXT
========================= */

function loadText() {

    currentText = getRandomText();

    typingTextElement.innerHTML = "";

    currentText.split("").forEach(char => {

        const span =
            document.createElement("span");

        span.textContent = char;

        typingTextElement.appendChild(span);

    });

}


/* =========================
   INITIAL TEXT
========================= */

loadText();


/* =========================
   TIME BUTTONS
========================= */

document.querySelectorAll(".time-btn").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".time-btn")
            .forEach(btn =>
                btn.classList.remove("active")
            );

        button.classList.add("active");

        selectedTime =
            Number(button.dataset.time);

        resetTest();

    });

});


/* =========================
   START TEST
========================= */

startButton.addEventListener("click", () => {

    if (testStarted) return;

    testStarted = true;

    testFinished = false;

    timeLeft = selectedTime;

    startTime = Date.now();

    typingInput.disabled = false;

    typingInput.focus();

    startButton.innerHTML =
        '<i class="fa-solid fa-keyboard"></i> Typing...';

    startTimer();

});


/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(timerInterval);

    timerInterval =
        setInterval(() => {

            timeLeft--;

            timerElement.textContent =
                timeLeft;

            updateLiveStats();

            if (timeLeft <= 0) {

                finishTest();

            }

        }, 1000);

}


/* =========================
   INPUT EVENT
========================= */

typingInput.addEventListener("input", () => {

    if (!testStarted || testFinished) return;

    const input =
        typingInput.value;

    const spans =
        typingTextElement.querySelectorAll("span");

    let correct = 0;

    let errors = 0;


    spans.forEach((span, index) => {

        const typedChar =
            input[index];


        if (typedChar == null) {

            span.className = "";

        }

        else if (typedChar === span.textContent) {

            span.className = "correct";

            correct++;

        }

        else {

            span.className = "incorrect";

            errors++;

        }

    });


    updateLiveStats();


    /* FINISH IF TEXT COMPLETE */

    if (input.length >= currentText.length) {

        finishTest();

    }

});


/* =========================
   LIVE STATS
========================= */

function updateLiveStats() {

    const typed =
        typingInput.value;

    const spans =
        typingTextElement.querySelectorAll("span");

    let correct = 0;

    let errors = 0;


    spans.forEach((span, index) => {

        if (index >= typed.length) return;

        if (typed[index] === span.textContent) {

            correct++;

        } else {

            errors++;

        }

    });


    const elapsedSeconds =
        Math.max(
            1,
            (Date.now() - startTime) / 1000
        );


    const minutes =
        elapsedSeconds / 60;


    const words =
        correct / 5;


    const wpm =
        Math.round(words / minutes);


    const totalTyped =
        typed.length;


    const accuracy =
        totalTyped === 0
            ? 100
            : Math.round(
                (correct / totalTyped) * 100
            );


    wpmElement.textContent =
        Math.max(0, wpm);


    accuracyElement.textContent =
        accuracy + "%";


    charactersElement.textContent =
        totalTyped;


    errorsElement.textContent =
        errors;

}


/* =========================
   FINISH TEST
========================= */

function finishTest() {

    if (testFinished) return;

    testFinished = true;

    testStarted = false;

    clearInterval(timerInterval);

    typingInput.disabled = true;

    startButton.innerHTML =
        '<i class="fa-solid fa-play"></i> Start Test';


    const typed =
        typingInput.value;


    const spans =
        typingTextElement.querySelectorAll("span");


    let correct = 0;

    let errors = 0;


    spans.forEach((span, index) => {

        if (index >= typed.length) return;

        if (typed[index] === span.textContent) {

            correct++;

        } else {

            errors++;

        }

    });


    const elapsedSeconds =
        Math.max(
            1,
            (Date.now() - startTime) / 1000
        );


    const minutes =
        elapsedSeconds / 60;


    const wpm =
        Math.round(
            (correct / 5) / minutes
        );


    const accuracy =
        typed.length === 0
            ? 0
            : Math.round(
                (correct / typed.length) * 100
            );


    document.getElementById("finalWpm").textContent =
        Math.max(0, wpm);


    document.getElementById("finalAccuracy").textContent =
        accuracy + "%";


    document.getElementById("finalCharacters").textContent =
        typed.length;


    document.getElementById("finalErrors").textContent =
        errors;


    resultModal.classList.add("show");

}


/* =========================
   RESET TEST
========================= */

function resetTest() {

    clearInterval(timerInterval);

    testStarted = false;

    testFinished = false;

    timeLeft = selectedTime;

    timerElement.textContent =
        timeLeft;

    typingInput.value = "";

    typingInput.disabled = true;

    startButton.innerHTML =
        '<i class="fa-solid fa-play"></i> Start Test';


    wpmElement.textContent = "0";

    accuracyElement.textContent = "100%";

    charactersElement.textContent = "0";

    errorsElement.textContent = "0";


    loadText();

}


resetButton.addEventListener("click", resetTest);


/* =========================
   NEW TEXT
========================= */

newTextButton.addEventListener("click", () => {

    resetTest();

});


/* =========================
   CLOSE RESULT
========================= */

closeModal.addEventListener("click", () => {

    resultModal.classList.remove("show");

});


/* =========================
   RETRY
========================= */

retryTest.addEventListener("click", () => {

    resultModal.classList.remove("show");

    resetTest();

    typingInput.disabled = false;

    typingInput.focus();

    testStarted = true;

    testFinished = false;

    startTime = Date.now();

    startButton.innerHTML =
        '<i class="fa-solid fa-keyboard"></i> Typing...';

    startTimer();

});


/* =========================
   CLOSE MODAL ON BACKGROUND
========================= */

resultModal.addEventListener("click", (event) => {

    if (event.target === resultModal) {

        resultModal.classList.remove("show");

    }

});


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    alert(
        `Thank you ${name}! Your message has been received.`
    );

    contactForm.reset();

});


/* =========================
   BACK TO TOP
========================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});
