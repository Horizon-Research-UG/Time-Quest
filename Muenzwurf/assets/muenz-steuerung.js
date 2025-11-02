// Münzwurf Steuerung | Zeile 1
// Drehzeit-Regler verwalten | Zeile 2
// Verwendet von: index.html Zeile 23 | Zeile 3
// Verbunden mit: muenz-animation.js Zeile 32 getDrehzeit | Zeile 4

// Globale Variablen | Zeile 6  
// Verbunden mit: index.html Zeile 18 #dreh-slider | Zeile 7
let drehSlider = null; // Slider Element | Zeile 8: von index.html Zeile 18
let wertAnzeige = null; // Wert Anzeige | Zeile 9: von index.html Zeile 19

// Init Steuerung | Zeile 11
// DOM Ready Callback | Zeile 12: von Zeile 29 aufgerufen  
// Verbunden mit: index.html Zeile 18+19 Slider+Wert | Zeile 13
function initSteuerung() {
    drehSlider = document.getElementById('dreh-slider'); // Slider | Zeile 15: von index.html Zeile 18
    wertAnzeige = document.getElementById('dreh-wert'); // Anzeige | Zeile 16: von index.html Zeile 19
    drehSlider.addEventListener('input', updateDrehzeit); // Event | Zeile 17: zu Zeile 20 updateDrehzeit
}

// Drehzeit Update | Zeile 20
// Slider Input Handler | Zeile 21: von Zeile 17 addEventListener
// Verbunden mit: index.html Zeile 19 Textinhalt | Zeile 22
function updateDrehzeit() {
    const neueZeit = drehSlider.value; // Wert holen | Zeile 24: von Zeile 8 Slider
    drehZeit = parseFloat(neueZeit); // Speichern | Zeile 25: in globale Variable  
    wertAnzeige.textContent = neueZeit; // Anzeigen | Zeile 26: ändert index.html Zeile 19
}

// Drehzeit zurückgeben | Zeile 28
// Von muenz-animation.js Zeile 32 verwendet | Zeile 29
function getDrehzeit() {
    return drehZeit; // Zeit | Zeile 31: gibt Variable von Zeile 25 zurück
}

// DOM Ready Event | Zeile 33  
// Startet bei Seitenload | Zeile 34: browser DOMContentLoaded
document.addEventListener('DOMContentLoaded', initSteuerung); // Init | Zeile 35: ruft Zeile 11 auf