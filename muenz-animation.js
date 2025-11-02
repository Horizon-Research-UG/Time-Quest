// Münz-Animation Hauptdatei | Zeile 1
// Steuert Werfen, Drehen, Landen | Zeile 2  
// Verwendet von: index.html Zeile 22 | Zeile 3
// Verbunden mit: muenz-steuerung.js Zeile 25 | Zeile 4

// Globale Variablen | Zeile 6
// Verbunden mit: muenz-steuerung.js Zeile 25 getDrehzeit | Zeile 7
let muenze = null; // Münz-Element | Zeile 8: verbunden index.html Zeile 15
let istAmWerfen = false; // Werf-Status | Zeile 9: verhindert Doppelklick  
let drehZeit = 5; // Standard Zeit | Zeile 10: von muenz-steuerung.js Zeile 25
let aktuelleSeite = 'zahl'; // Start Seite | Zeile 11: beginnt mit Zahl (2)

// Init Münz-Animation | Zeile 13
// DOM Ready Callback | Zeile 14: von Zeile 67 aufgerufen
// Verbunden mit: index.html Zeile 15 #muenze | Zeile 15
function initMuenzAnimation() {
    muenze = document.getElementById('muenze'); // Element holen | Zeile 17: von index.html Zeile 15
    muenze.addEventListener('click', startMuenzwurf); // Klick Event | Zeile 18: zu Zeile 22 startMuenzwurf
    setzeZufallsSeite(); // Random Start | Zeile 19: zufällige Startseite
}

// Zufällige Startseite | Zeile 22
// Wird von initMuenzAnimation Zeile 19 aufgerufen | Zeile 23
function setzeZufallsSeite() {
    const zufall = Math.random() < 0.5; // 50/50 | Zeile 25: zufällig true/false
    aktuelleSeite = zufall ? 'kopf' : 'zahl'; // Seite | Zeile 26: kopf oder zahl
    muenze.textContent = aktuelleSeite === 'kopf' ? '👑' : '2'; // Anzeigen | Zeile 27: Kopf=Krone, Zahl=2
}

// Start Münzwurf | Zeile 30
// Klick-Event Handler | Zeile 31: von Zeile 18 addEventListener
// Verbunden mit: werfeMuenze Zeile 36 | Zeile 32
function startMuenzwurf() {
    if (istAmWerfen) return; // Doppelklick stopp | Zeile 34: prüft Zeile 9 Variable
    istAmWerfen = true; // Status setzen | Zeile 35: ändert Zeile 9 Variable  
    werfeMuenze(); // Animation start | Zeile 36: ruft Zeile 37 auf
}

// Münzwurf Animation | Zeile 39  
// Verbunden mit: muenz-steuerung.js Zeile 31 getDrehzeit | Zeile 40
// Verbunden mit: berechneErgebnis Zeile 45 | Zeile 41
function werfeMuenze() {
    const aktuelleZeit = getDrehzeit(); // Zeit holen | Zeile 43: von muenz-steuerung.js Zeile 31
    muenze.style.animation = `muenz-wurf ${aktuelleZeit}s ease-out`; // CSS | Zeile 44: zu muenz-style.css Zeile 66
    setTimeout(() => berechneErgebnis(), aktuelleZeit * 1000); // Timer | Zeile 45: ruft Zeile 46 auf
}

// Ergebnis berechnen | Zeile 48
// Von werfeMuenze Zeile 45 aufgerufen | Zeile 49  
// Verbunden mit: zeigeErgebnis Zeile 54 | Zeile 50
function berechneErgebnis() {
    const zufallsZahl = Math.random(); // Zufall 0-1 | Zeile 52: Math.random 50/50
    const ergebnis = zufallsZahl < 0.5 ? 'kopf' : 'zahl'; // Wahl | Zeile 53: kopf oder zahl
    zeigeErgebnis(ergebnis); // Zeigen | Zeile 54: ruft Zeile 55 auf
}

// Ergebnis anzeigen | Zeile 57
// Von berechneErgebnis Zeile 54 aufgerufen | Zeile 58
// Verbunden mit: resetMuenze Zeile 63 | Zeile 59  
function zeigeErgebnis(ergebnis) {
    aktuelleSeite = ergebnis; // Seite setzen | Zeile 61: neue aktuelle Seite
    muenze.textContent = ergebnis === 'kopf' ? '👑' : '2'; // Symbol | Zeile 62: Krone oder 2
    setTimeout(() => resetMuenze(), 2000); // Reset | Zeile 63: nach 2 Sekunden zurücksetzen
}

// Münze zurücksetzen | Zeile 66
// Von zeigeErgebnis Zeile 63 aufgerufen | Zeile 67
function resetMuenze() {
    muenze.style.animation = ''; // Animation weg | Zeile 69: entfernt Zeile 44 Animation
    istAmWerfen = false; // Status frei | Zeile 70: setzt Zeile 9 Variable zurück
}

// DOM Ready Event | Zeile 73
// Startet bei Seitenload | Zeile 74: browser DOMContentLoaded  
document.addEventListener('DOMContentLoaded', initMuenzAnimation); // Init | Zeile 75: ruft Zeile 13 auf