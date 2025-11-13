// resources/js/rotating-subtitle.js

export function initRotatingSubtitle({
    textSelector = "#hero-text",
    cursorSelector = "#hero-cursor",
    phrases = [
        "a Backend Developer.",
        "experienced in Laravel.",
        "a Laravel Developer.",
    ],
    typeSpeed = 70,
    deleteSpeed = 45,
    pauseDelay = 1100,
    loop = true,
} = {}) {
    const textEl = document.querySelector(textSelector);
    const cursor = document.querySelector(cursorSelector);

    if (!textEl || !cursor) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const phrase = phrases[phraseIndex];

        if (!deleting) {
            // typing forward
            textEl.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === phrase.length) {
                deleting = true;
                setTimeout(tick, pauseDelay);
                return;
            }
            setTimeout(tick, typeSpeed);
        } else {
            // deleting backward
            textEl.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                if (!loop && phraseIndex === 0) return;
            }
            setTimeout(tick, deleteSpeed);
        }
    }

    // Cursor blinking
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, 500);

    // small delay before starting
    setTimeout(() => tick(), 400);
}
