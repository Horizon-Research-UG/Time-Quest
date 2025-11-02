// Münz-Animation EINFACH | Zeile 1

let muenze = null; // Münze | Zeile 3
let istAmWerfen = false; // Wurf-Status | Zeile 4

// Setup | Zeile 6
function initMuenzAnimation() {
    muenze = document.getElementById('muenze'); // Element | Zeile 8
    muenze.addEventListener('click', starteWurf); // Klick | Zeile 9
    muenze.textContent = '2'; // Start mit 2 | Zeile 10
}

// Wurf starten | Zeile 13
function starteWurf() {
    if (istAmWerfen) return; // Nicht doppelt | Zeile 15
    
    istAmWerfen = true; // Status | Zeile 17
    const zeit = getDrehzeit(); // Zeit vom Slider | Zeile 18
    
    muenze.style.animation = `muenz-wurf ${zeit}s ease-out`; // Animation | Zeile 20
    
    setTimeout(() => {
        const kopf = Math.random() < 0.5; // 50/50 | Zeile 23
        muenze.textContent = kopf ? '👑' : '2'; // Krone oder 2 | Zeile 24
        istAmWerfen = false; // Fertig | Zeile 25
    }, zeit * 1000);
}

// Start bei Seitenload | Zeile 29
document.addEventListener('DOMContentLoaded', initMuenzAnimation);
