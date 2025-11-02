// Münz-Animation Hauptdatei
// Steuert das Werfen, Drehen und Landen der Münze
// Verwendet von: pages/home.html (Zeile 25)
// Verbunden mit: muenz-steuerung.js (Zeile wird in init() definiert)

// Globale Variablen für Animation
// Verbunden mit: muenz-steuerung.js (getDrehzeit Funktion)
let muenze = null; // Münz-Element referenz
let istAmWerfen = false; // Status ob Münze gerade fliegt
let drehZeit = 5; // Standard Drehzeit in Sekunden

// Initialisierung der Münz-Animation
// Wird aufgerufen wenn DOM geladen ist
// Verbunden mit: pages/home.html #muenze (Zeile 14)
function initMuenzAnimation() {
    muenze = document.getElementById('muenze'); // Münz-Element holen
    muenze.addEventListener('click', startMuenzwurf); // Klick-Event hinzufügen
}

// Startet den Münzwurf-Vorgang
// Wird von Klick-Event aufgerufen
// Verbunden mit: werfeMuenze() (Zeile wird definiert)
function startMuenzwurf() {
    if (istAmWerfen) return; // Verhindert mehrfaches Werfen
    istAmWerfen = true; // Status auf "am werfen" setzen
    werfeMuenze(); // Eigentliche Werf-Animation starten
}

// Führt die Münzwurf-Animation aus
// Verbunden mit: muenz-steuerung.js getDrehzeit() (Zeile wird definiert)
// Verbunden mit: berechneErgebnis() (Zeile wird definiert)  
function werfeMuenze() {
    const aktuelleZeit = getDrehzeit(); // Drehzeit von Steuerung holen
    muenze.style.animation = `muenz-wurf ${aktuelleZeit}s ease-out`; // CSS-Animation starten
    setTimeout(() => berechneErgebnis(), aktuelleZeit * 1000); // Nach Animation Ergebnis zeigen
}

// Berechnet zufälliges Ergebnis und zeigt es an
// Wird von werfeMuenze() nach Animation aufgerufen
// Verbunden mit: zeigeErgebnis() (Zeile wird definiert)
function berechneErgebnis() {
    const zufallsZahl = Math.random(); // Zufallszahl zwischen 0 und 1
    const ergebnis = zufallsZahl < 0.5 ? 'kopf' : 'zahl'; // 50/50 Chance
    zeigeErgebnis(ergebnis); // Ergebnis anzeigen
}

// Zeigt das Münzwurf-Ergebnis an
// Wird von berechneErgebnis() aufgerufen
// Verbunden mit: resetMuenze() (Zeile wird definiert)
function zeigeErgebnis(ergebnis) {
    const symbol = ergebnis === 'kopf' ? '👑' : '💰'; // Symbol je nach Ergebnis
    muenze.textContent = symbol; // Münz-Symbol ändern
    setTimeout(() => resetMuenze(), 2000); // Nach 2 Sekunden zurücksetzen
}

// Setzt die Münze für nächsten Wurf zurück
// Wird von zeigeErgebnis() nach Verzögerung aufgerufen
function resetMuenze() {
    muenze.textContent = '💰'; // Zurück zum Standard-Symbol
    muenze.style.animation = ''; // Animation zurücksetzen
    istAmWerfen = false; // Status zurücksetzen
}

// DOM-Ready Event Listener
// Startet Initialisierung wenn Seite geladen ist
document.addEventListener('DOMContentLoaded', initMuenzAnimation);