// Münz-Animation Hauptdatei | Zeile 1
// Steuert Werfen, Drehen, Landen | Zeile 2  
// Verwendet von: index.html Zeile 22 | Zeile 3
// Verbunden mit: muenz-steuerung.js Zeile 25 | Zeile 4

// Globale Variablen | Zeile 6
// Verbunden mit: muenz-steuerung.js Zeile 25 getDrehzeit | Zeile 7
let muenze = null; // Münz-Element | Zeile 8: verbunden index.html Zeile 15
let istAmWerfen = false; // Werf-Status | Zeile 9: verhindert Doppelklick  
let drehZeit = 5; // Standard Zeit | Zeile 10: von muenz-steuerung.js Zeile 16

// Init Münz-Animation | Zeile 12
// DOM Ready Callback | Zeile 13: von Zeile 43 aufgerufen
// Verbunden mit: index.html Zeile 15 #muenze | Zeile 14
function initMuenzAnimation() {
    muenze = document.getElementById('muenze'); // Element holen | Zeile 16: von index.html Zeile 15
    muenze.addEventListener('click', startMuenzwurf); // Event | Zeile 17: zu Zeile 21 startMuenzwurf
}

// Start Münzwurf | Zeile 21
// Klick-Event Handler | Zeile 22: von Zeile 17 addEventListener
// Verbunden mit: werfeMuenze Zeile 28 | Zeile 23
function startMuenzwurf() {
    if (istAmWerfen) return; // Doppelklick stopp | Zeile 25: prüft Zeile 9 Variable
    istAmWerfen = true; // Status setzen | Zeile 26: ändert Zeile 9 Variable  
    werfeMuenze(); // Animation start | Zeile 27: ruft Zeile 28 auf
}

// Münzwurf Animation | Zeile 28  
// Verbunden mit: muenz-steuerung.js Zeile 25 getDrehzeit | Zeile 29
// Verbunden mit: berechneErgebnis Zeile 35 | Zeile 30
function werfeMuenze() {
    const aktuelleZeit = getDrehzeit(); // Zeit holen | Zeile 32: von muenz-steuerung.js Zeile 25
    muenze.style.animation = `muenz-wurf ${aktuelleZeit}s ease-out`; // CSS | Zeile 33: zu muenz-style.css Zeile 52
    setTimeout(() => berechneErgebnis(), aktuelleZeit * 1000); // Timer | Zeile 34: ruft Zeile 35 auf
}

// Ergebnis berechnen | Zeile 35
// Von werfeMuenze Zeile 34 aufgerufen | Zeile 36  
// Verbunden mit: zeigeErgebnis Zeile 42 | Zeile 37
function berechneErgebnis() {
    const zufallsZahl = Math.random(); // Zufall 0-1 | Zeile 39: Math.random 50/50
    const ergebnis = zufallsZahl < 0.5 ? 'kopf' : 'zahl'; // Wahl | Zeile 40: kopf oder zahl
    zeigeErgebnis(ergebnis); // Zeigen | Zeile 41: ruft Zeile 42 auf
}

// Ergebnis anzeigen | Zeile 42
// Von berechneErgebnis Zeile 41 aufgerufen | Zeile 43
// Verbunden mit: resetMuenze Zeile 48 | Zeile 44  
function zeigeErgebnis(ergebnis) {
    const symbol = ergebnis === 'kopf' ? '👑' : '💰'; // Symbol | Zeile 46: Icon auswahl
    muenze.textContent = symbol; // Ändern | Zeile 47: ändert index.html Zeile 15
    setTimeout(() => resetMuenze(), 2000); // Reset | Zeile 48: ruft Zeile 49 auf
}

// Münze zurücksetzen | Zeile 49
// Von zeigeErgebnis Zeile 48 aufgerufen | Zeile 50
function resetMuenze() {
    muenze.textContent = '💰'; // Standard | Zeile 52: zurück zu Standard Icon
    muenze.style.animation = ''; // Clear | Zeile 53: entfernt Zeile 33 Animation
    istAmWerfen = false; // Frei | Zeile 54: setzt Zeile 9 Variable zurück
}

// DOM Ready Event | Zeile 56
// Startet bei Seitenload | Zeile 57: browser DOMContentLoaded
document.addEventListener('DOMContentLoaded', initMuenzAnimation); // Init | Zeile 58: ruft Zeile 12 auf