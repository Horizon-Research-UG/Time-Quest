// Münz-Animation Hauptdatei | Zeile 1
// Steuert Werfen, Drehen, Landen | Zeile 2  
// Verwendet von: index.html Zeile 22 | Zeile 3
// Verbunden mit: muenz-steuerung.js Zeile 25 | Zeile 4

// Globale Variablen | Zeile 6
// Verbunden mit: muenz-steuerung.js Zeile 25 getDrehzeit | Zeile 7
let muenze = null; // Münz-Element | Zeile 8: verbunden index.html Zeile 15
let istAmWerfen = false; // Werf-Status | Zeile 9: verhindert Doppelklick  
let drehZeit = 5; // Standard Zeit | Zeile 10: von muenz-steuerung.js Zeile 16

// Init 3D Münz-Animation | Zeile 12
// DOM Ready Callback | Zeile 13: von Zeile 58 aufgerufen
// Verbunden mit: index.html Zeile 15 #muenze-3d | Zeile 14
function initMuenzAnimation() {
    muenze = document.getElementById('muenze-3d'); // 3D Element | Zeile 16: von index.html Zeile 15
    muenze.addEventListener('click', startMuenzwurf); // Klick Event | Zeile 17: zu Zeile 21 startMuenzwurf
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

// Ergebnis 3D anzeigen | Zeile 42
// Von berechneErgebnis Zeile 41 aufgerufen | Zeile 43
// Verbunden mit: resetMuenze Zeile 52 | Zeile 44  
function zeigeErgebnis(ergebnis) {
    const kopfSeite = muenze.querySelector('.kopf-seite'); // Kopf Element | Zeile 46: Kopf-Seite finden
    const zahlSeite = muenze.querySelector('.zahl-seite'); // Zahl Element | Zeile 47: Zahl-Seite finden
    const rotation = ergebnis === 'kopf' ? 'rotateY(0deg)' : 'rotateY(180deg)'; // Drehung | Zeile 48: finale Position
    muenze.style.transform = rotation; // Finale Pose | Zeile 49: Ergebnis zeigen
    setTimeout(() => resetMuenze(), 3000); // Längere Pause | Zeile 50: 3 Sekunden anzeigen
}

// 3D Münze zurücksetzen | Zeile 53
// Von zeigeErgebnis Zeile 50 aufgerufen | Zeile 54
function resetMuenze() {
    muenze.style.transform = 'rotateY(0deg)'; // Neutral Position | Zeile 56: zurück zu Startposition
    muenze.style.animation = ''; // Animation löschen | Zeile 57: entfernt Zeile 33 Animation
    istAmWerfen = false; // Status frei | Zeile 58: setzt Zeile 9 Variable zurück
}

// DOM Ready Event | Zeile 61
// Startet bei Seitenload | Zeile 62: browser DOMContentLoaded  
document.addEventListener('DOMContentLoaded', initMuenzAnimation); // Init | Zeile 63: ruft Zeile 12 auf