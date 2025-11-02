// 5-Phasen Münzwurf System | Zeile 1

let muenze = null; // Münz-Element | Zeile 3
let zeitSlider = null; // Zeit-Regler | Zeile 4
let zeitAnzeige = null; // Zeit-Display | Zeile 5
let zustand = 1; // Aktueller Zustand | Zeile 6

// Zustand 1: Münze liegt da | Zeile 8
// Zustand 2: Münze wird geklickt | Zeile 9
// Zustand 3: Münze fliegt hoch | Zeile 10
// Zustand 4: Münze fliegt runter | Zeile 11
// Zustand 5: Ergebnis wird angezeigt | Zeile 12

// Setup | Zeile 14
document.addEventListener('DOMContentLoaded', function() {
    muenze = document.getElementById('muenze'); // Element holen | Zeile 16
    zeitSlider = document.getElementById('drehzeit'); // Slider holen | Zeile 17
    zeitAnzeige = document.getElementById('zeit-anzeige'); // Anzeige holen | Zeile 18
    
    // Zustand 1: Startposition | Zeile 20
    setzeZustand1(); // Münze liegt da | Zeile 21
    
    // Events | Zeile 23
    muenze.addEventListener('click', klickAufMuenze); // Klick-Handler | Zeile 24
    zeitSlider.addEventListener('input', updateZeitAnzeige); // Slider-Handler | Zeile 25
});

// Regler Update | Zeile 28
function updateZeitAnzeige() {
    zeitAnzeige.textContent = zeitSlider.value; // Anzeige updaten | Zeile 30
}

// Zustand 1: Münze liegt da | Zeile 33
function setzeZustand1() {
    zustand = 1; // Status setzen | Zeile 35
    muenze.textContent = Math.random() < 0.5 ? '👑' : '2'; // Zufällige Seite | Zeile 36
    muenze.style.transform = ''; // Keine Transformation | Zeile 37
    muenze.style.animation = ''; // Keine Animation | Zeile 38
}

// Klick auf Münze | Zeile 41
function klickAufMuenze() {
    if (zustand !== 1) return; // Nur in Zustand 1 klickbar | Zeile 43
    
    setzeZustand2(); // Klick registriert | Zeile 45
}

// Zustand 2: Münze wird geklickt | Zeile 48
function setzeZustand2() {
    zustand = 2; // Status setzen | Zeile 50
    setTimeout(setzeZustand3, 100); // Nach 0.1s zu Zustand 3 | Zeile 51
}

// Zustand 3: Münze fliegt hoch | Zeile 54
function setzeZustand3() {
    zustand = 3; // Status setzen | Zeile 56
    const dauer = parseFloat(zeitSlider.value); // Zeit vom Slider | Zeile 57
    const halbeDauer = dauer / 2; // Hälfte für Hochflug | Zeile 58
    
    muenze.style.animation = `hochflug ${halbeDauer}s ease-out`; // Animation starten | Zeile 60
    
    setTimeout(() => setzeZustand4(halbeDauer), halbeDauer * 1000); // Nach Hochflug zu Zustand 4 | Zeile 62
}

// Zustand 4: Münze fliegt runter | Zeile 65
function setzeZustand4(halbeDauer) {
    zustand = 4; // Status setzen | Zeile 67
    
    muenze.style.animation = `runterflug ${halbeDauer}s ease-in`; // Runterflug | Zeile 69
    
    setTimeout(setzeZustand5, halbeDauer * 1000); // Nach Runterflug zu Zustand 5 | Zeile 71
}

// Zustand 5: Ergebnis anzeigen | Zeile 74
function setzeZustand5() {
    zustand = 5; // Status setzen | Zeile 76
    
    // Zufälliges Ergebnis | Zeile 78
    muenze.textContent = Math.random() < 0.5 ? '👑' : '2'; // Neues Ergebnis | Zeile 79
    muenze.style.animation = ''; // Animation stoppen | Zeile 80
    
    // Nach 2 Sekunden zurück zu Zustand 1 | Zeile 82
    setTimeout(setzeZustand1, 2000); // Zurück zur Startposition | Zeile 83
}