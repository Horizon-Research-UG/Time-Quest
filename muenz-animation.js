// Münz-Animation Hauptdatei | Zeile 1
// Steuert Werfen, Drehen, Landen | Zeile 2  
// Verwendet von: index.html Zeile 22 | Zeile 3
// Verbunden mit: muenz-steuerung.js Zeile 25 | Zeile 4

// Globale Variablen | Zeile 6
// Verbunden mit: muenz-steuerung.js Zeile 31 getDrehzeit | Zeile 7
let muenze = null; // Münz-Element | Zeile 8: verbunden index.html Zeile 15
let istAmWerfen = false; // Werf-Status | Zeile 9: verhindert Doppelklick  
let drehZeit = 5; // Standard Zeit | Zeile 10: von muenz-steuerung.js Zeile 31
let aktuelleSeite = 'zahl'; // Start Seite | Zeile 11: beginnt mit Zahl (2)
let istGehalten = false; // Halt-Status | Zeile 12: Münze wird gehalten
let schwebHoehe = 0; // Schweb-Höhe | Zeile 13: aktuelle Höhe in Luft
let fallTimer = null; // Fall-Timer | Zeile 14: Timer für automatisches Fallen
let schwebeAnimation = null; // Schwebe-Animation | Zeile 15: Animation ID

// Init Münz-Animation | Zeile 17
// DOM Ready Callback | Zeile 18: von Zeile 95 aufgerufen
// Verbunden mit: index.html Zeile 15 #muenze | Zeile 19
function initMuenzAnimation() {
    muenze = document.getElementById('muenze'); // Element holen | Zeile 21: von index.html Zeile 15
    muenze.addEventListener('mousedown', startHalten); // Maus runter | Zeile 22: zu Zeile 30 startHalten
    muenze.addEventListener('mouseup', stopHalten); // Maus hoch | Zeile 23: zu Zeile 41 stopHalten
    muenze.addEventListener('mouseleave', stopHalten); // Maus weg | Zeile 24: zu Zeile 41 stopHalten
    muenze.addEventListener('click', mehrHoehe); // Extra Klick | Zeile 25: zu Zeile 49 mehrHoehe
    setzeZufallsSeite(); // Random Start | Zeile 26: zufällige Startseite
}

// Zufällige Startseite | Zeile 29
// Wird von initMuenzAnimation Zeile 26 aufgerufen | Zeile 30
function setzeZufallsSeite() {
    const zufall = Math.random() < 0.5; // 50/50 | Zeile 32: zufällig true/false
    aktuelleSeite = zufall ? 'kopf' : 'zahl'; // Seite | Zeile 33: kopf oder zahl
    muenze.textContent = aktuelleSeite === 'kopf' ? '👑' : '2'; // Anzeigen | Zeile 34: Kopf=Krone, Zahl=2
}

// Halten starten | Zeile 37
// Wird von mousedown Zeile 22 aufgerufen | Zeile 38
function startHalten() {
    if (istAmWerfen) return; // Schon am werfen | Zeile 40: verhindert Doppelstart
    istGehalten = true; // Halten aktiviert | Zeile 41: setzt Zeile 12 Variable
    istAmWerfen = true; // Wurf-Status | Zeile 42: setzt Zeile 9 Variable
    schwebHoehe = 100; // Start-Höhe | Zeile 43: beginnt bei 100px Höhe
    starteSchwebeAnimation(); // Schweben | Zeile 44: ruft Zeile 58 auf
}

// Halten stoppen | Zeile 47
// Wird von mouseup/mouseleave Zeile 23/24 aufgerufen | Zeile 48
function stopHalten() {
    if (!istGehalten) return; // Nicht am halten | Zeile 50: prüft Zeile 12 Variable
    istGehalten = false; // Halten beenden | Zeile 51: setzt Zeile 12 Variable
    stoppeSchwebeAnimation(); // Schweben stopp | Zeile 52: ruft Zeile 70 auf
    starteFallTimer(); // Fall-Timer | Zeile 53: ruft Zeile 74 auf
}

// Mehr Höhe bei Klick | Zeile 56
// Wird von click Zeile 25 aufgerufen | Zeile 57
function mehrHoehe() {
    if (istGehalten && schwebHoehe < 300) { // Gehalten und nicht zu hoch | Zeile 59: prüft Zeile 12+13
        schwebHoehe += 50; // Höher fliegen | Zeile 60: erhöht Zeile 13 Variable um 50px
        resetFallTimer(); // Timer reset | Zeile 61: ruft Zeile 78 auf
    }
}

// Schwebe-Animation starten | Zeile 64
// Wird von startHalten Zeile 44 aufgerufen | Zeile 65
function starteSchwebeAnimation() {
    function schweben() { // Schwebe-Loop | Zeile 67: endlose Schwebe-Schleife
        if (istGehalten) { // Noch gehalten | Zeile 68: prüft Zeile 12 Variable
            muenze.style.transform = `translateY(-${schwebHoehe}px) rotateY(${Date.now() / 10 % 360}deg)`; // Position | Zeile 69: setzt Position und Drehung
            schwebeAnimation = requestAnimationFrame(schweben); // Weiter | Zeile 70: nächster Frame
        }
    }
    schweben(); // Start | Zeile 72: beginnt Schwebe-Loop
}

// Schwebe-Animation stoppen | Zeile 75
// Wird von stopHalten Zeile 52 aufgerufen | Zeile 76
function stoppeSchwebeAnimation() {
    if (schwebeAnimation) { // Animation läuft | Zeile 78: prüft Zeile 15 Variable
        cancelAnimationFrame(schwebeAnimation); // Stoppen | Zeile 79: stoppt Animation
        schwebeAnimation = null; // Reset | Zeile 80: setzt Zeile 15 Variable zurück
    }
}

// Fall-Timer starten | Zeile 83
// Wird von stopHalten Zeile 53 aufgerufen | Zeile 84
function starteFallTimer() {
    const warteZeit = getDrehzeit() * 1000; // Warte-Zeit | Zeile 86: von muenz-steuerung.js Zeile 31 in Millisekunden
    fallTimer = setTimeout(() => starteFall(), warteZeit); // Timer setzen | Zeile 87: ruft Zeile 91 nach Wartezeit auf
}

// Fall-Timer zurücksetzen | Zeile 90
// Wird von mehrHoehe Zeile 61 aufgerufen | Zeile 91
function resetFallTimer() {
    if (fallTimer) { // Timer läuft | Zeile 93: prüft Zeile 14 Variable
        clearTimeout(fallTimer); // Timer löschen | Zeile 94: löscht alten Timer
        starteFallTimer(); // Neu starten | Zeile 95: ruft Zeile 83 auf
    }
}

// Fall starten | Zeile 99
// Wird von starteFallTimer Zeile 87 aufgerufen | Zeile 100
function starteFall() {
    const aktuelleZeit = getDrehzeit(); // Zeit holen | Zeile 102: von muenz-steuerung.js Zeile 31
    muenze.style.animation = `muenz-wurf ${aktuelleZeit}s ease-out`; // Fall-Animation | Zeile 103: zu muenz-style.css Zeile 66
    setTimeout(() => berechneErgebnis(), aktuelleZeit * 1000); // Ergebnis | Zeile 104: ruft Zeile 107 nach Fall auf
}

// Ergebnis berechnen | Zeile 107
// Von starteFall Zeile 104 aufgerufen | Zeile 108  
// Verbunden mit: zeigeErgebnis Zeile 113 | Zeile 109
function berechneErgebnis() {
    const zufallsZahl = Math.random(); // Zufall 0-1 | Zeile 111: Math.random 50/50
    const ergebnis = zufallsZahl < 0.5 ? 'kopf' : 'zahl'; // Wahl | Zeile 112: kopf oder zahl
    zeigeErgebnis(ergebnis); // Zeigen | Zeile 113: ruft Zeile 116 auf
}

// Ergebnis anzeigen | Zeile 116
// Von berechneErgebnis Zeile 113 aufgerufen | Zeile 117
// Verbunden mit: resetMuenze Zeile 122 | Zeile 118  
function zeigeErgebnis(ergebnis) {
    aktuelleSeite = ergebnis; // Seite setzen | Zeile 120: neue aktuelle Seite
    muenze.textContent = ergebnis === 'kopf' ? '👑' : '2'; // Symbol | Zeile 121: Krone oder 2
    setTimeout(() => resetMuenze(), 2000); // Reset | Zeile 122: nach 2 Sekunden zurücksetzen
}

// Münze zurücksetzen | Zeile 125
// Von zeigeErgebnis Zeile 122 aufgerufen | Zeile 126
function resetMuenze() {
    muenze.style.animation = ''; // Animation weg | Zeile 128: entfernt Animation
    muenze.style.transform = ''; // Position reset | Zeile 129: zurück zu Startposition
    istAmWerfen = false; // Status frei | Zeile 130: setzt Zeile 9 Variable zurück
    istGehalten = false; // Halt-Status reset | Zeile 131: setzt Zeile 12 Variable zurück
    schwebHoehe = 0; // Höhe reset | Zeile 132: setzt Zeile 13 Variable zurück
    if (fallTimer) { // Timer läuft noch | Zeile 133: prüft Zeile 14 Variable
        clearTimeout(fallTimer); // Timer löschen | Zeile 134: löscht Timer
        fallTimer = null; // Timer reset | Zeile 135: setzt Zeile 14 Variable zurück
    }
}

// DOM Ready Event | Zeile 139
// Startet bei Seitenload | Zeile 140: browser DOMContentLoaded  
document.addEventListener('DOMContentLoaded', initMuenzAnimation); // Init | Zeile 141: ruft Zeile 17 auf