// Münz-Animation Hauptdatei | Zeile 1
// Steuert Werfen, Drehen, Landen | Zeile 2  
// Verwendet von: index.html Zeile 22 | Zeile 3
// Verbunden mit: muenz-steuerung.js Zeile 25 | Zeile 4

// Globale Variablen | Zeile 6
// Verbunden mit: muenz-steuerung.js Zeile 31 getDrehzeit | Zeile 7
let muenze = null; // Münz-Element | Zeile 8: verbunden index.html Zeile 15
let istAmVolleyball = false; // Volleyball-Modus | Zeile 9: Münze am fallen/spielen
let drehZeit = 5; // Standard Zeit | Zeile 10: von muenz-steuerung.js Zeile 31
let aktuelleSeite = 'zahl'; // Start Seite | Zeile 11: beginnt mit Zahl (2)
let muenzPosition = {x: 0, y: 0}; // Position | Zeile 12: aktuelle Münz-Position
let muenzGeschwindigkeit = {x: 0, y: 0}; // Speed | Zeile 13: Geschwindigkeit
let volleyballAnimation = null; // Volleyball Animation | Zeile 14: Animation ID
let letzterKlick = 0; // Letzter Klick | Zeile 15: Zeit des letzten Klicks

// Init Münz-Animation | Zeile 17
// DOM Ready Callback | Zeile 18: von Zeile 120 aufgerufen
// Verbunden mit: index.html Zeile 15 #muenze | Zeile 19
function initMuenzAnimation() {
    muenze = document.getElementById('muenze'); // Element holen | Zeile 21: von index.html Zeile 15
    muenze.addEventListener('click', volleyballKlick); // Volleyball Klick | Zeile 22: zu Zeile 30 volleyballKlick
    setzeZufallsSeite(); // Random Start | Zeile 23: zufällige Startseite
}

// Zufällige Startseite | Zeile 26
// Wird von initMuenzAnimation Zeile 23 aufgerufen | Zeile 27
function setzeZufallsSeite() {
    const zufall = Math.random() < 0.5; // 50/50 | Zeile 29: zufällig true/false
    aktuelleSeite = zufall ? 'kopf' : 'zahl'; // Seite | Zeile 30: kopf oder zahl
    muenze.textContent = aktuelleSeite === 'kopf' ? '👑' : '2'; // Anzeigen | Zeile 31: Kopf=Krone, Zahl=2
}

// Volleyball Klick | Zeile 34
// Wird von click Zeile 22 aufgerufen | Zeile 35
function volleyballKlick() {
    if (!istAmVolleyball) { // Nicht am spielen | Zeile 37: erster Klick startet Spiel
        startVolleyball(); // Volleyball starten | Zeile 38: ruft Zeile 43 auf
    } else { // Schon am spielen | Zeile 39: Münze hochschlagen
        schlagMuenzeHoch(); // Hochschlagen | Zeile 40: ruft Zeile 49 auf
    }
}

// Volleyball starten | Zeile 43
// Wird von volleyballKlick Zeile 38 aufgerufen | Zeile 44
function startVolleyball() {
    istAmVolleyball = true; // Volleyball-Modus an | Zeile 46: setzt Zeile 9 Variable
    muenzPosition = {x: 0, y: -100}; // Start-Position | Zeile 47: setzt Zeile 12 Variable (100px hoch)
    muenzGeschwindigkeit = {x: 0, y: 0}; // Start-Speed | Zeile 48: setzt Zeile 13 Variable
    letzterKlick = Date.now(); // Klick-Zeit | Zeile 49: setzt Zeile 15 Variable
    starteVolleyballPhysik(); // Physik starten | Zeile 50: ruft Zeile 56 auf
}

// Münze hochschlagen | Zeile 53
// Wird von volleyballKlick Zeile 40 aufgerufen | Zeile 54
function schlagMuenzeHoch() {
    muenzGeschwindigkeit.y = -15; // Nach oben | Zeile 56: negative Y = hoch (-15px pro Frame)
    muenzGeschwindigkeit.x += (Math.random() - 0.5) * 8; // Seitlich | Zeile 57: zufällige X-Bewegung
    letzterKlick = Date.now(); // Klick-Zeit | Zeile 58: setzt Zeile 15 Variable
}

// Volleyball-Physik starten | Zeile 61
// Wird von startVolleyball Zeile 50 aufgerufen | Zeile 62
function starteVolleyballPhysik() {
    function physikLoop() { // Physik-Loop | Zeile 64: endlose Physik-Schleife
        if (istAmVolleyball) { // Noch am spielen | Zeile 65: prüft Zeile 9 Variable
            // Schwerkraft anwenden | Zeile 66: Münze fällt nach unten
            muenzGeschwindigkeit.y += 0.8; // Gravity | Zeile 67: +0.8px pro Frame nach unten
            
            // Position aktualisieren | Zeile 69: neue Position berechnen
            muenzPosition.x += muenzGeschwindigkeit.x; // X bewegen | Zeile 70: horizontale Bewegung
            muenzPosition.y += muenzGeschwindigkeit.y; // Y bewegen | Zeile 71: vertikale Bewegung
            
            // Luftwiderstand | Zeile 73: Geschwindigkeit reduzieren
            muenzGeschwindigkeit.x *= 0.98; // X-Bremse | Zeile 74: 2% Verlust pro Frame
            
            // Seitliche Grenzen | Zeile 76: nicht zu weit seitlich
            if (Math.abs(muenzPosition.x) > 200) { // Zu weit | Zeile 77: mehr als 200px seitlich
                muenzGeschwindigkeit.x *= -0.8; // Abprall | Zeile 78: Richtung umkehren + Verlust
            }
            
            // Münze zu lange nicht geklickt | Zeile 81: Game Over Check
            if (Date.now() - letzterKlick > getDrehzeit() * 1000) { // Zu lange | Zeile 82: länger als Drehzeit
                beendeVolleyball(); // Spiel Ende | Zeile 83: ruft Zeile 91 auf
                return; // Stop | Zeile 84: Loop beenden
            }
            
            // Münze zu tief gefallen | Zeile 87: am Boden
            if (muenzPosition.y > 100) { // Zu tief | Zeile 88: mehr als 100px unten
                beendeVolleyball(); // Spiel Ende | Zeile 89: ruft Zeile 91 auf
                return; // Stop | Zeile 90: Loop beenden
            }
            
            // Position setzen | Zeile 93: Münze visuell bewegen
            muenze.style.transform = `translate(${muenzPosition.x}px, ${muenzPosition.y}px) rotateY(${Date.now() / 10 % 360}deg)`; // Move | Zeile 94: Position + Drehung
            
            volleyballAnimation = requestAnimationFrame(physikLoop); // Weiter | Zeile 96: nächster Frame
        }
    }
    physikLoop(); // Start | Zeile 98: beginnt Physik-Loop
}

// Volleyball beenden | Zeile 101
// Wird von starteVolleyballPhysik Zeile 83/89 aufgerufen | Zeile 102
function beendeVolleyball() {
    istAmVolleyball = false; // Volleyball aus | Zeile 104: setzt Zeile 9 Variable
    if (volleyballAnimation) { // Animation läuft | Zeile 105: prüft Zeile 14 Variable
        cancelAnimationFrame(volleyballAnimation); // Stoppen | Zeile 106: stoppt Animation
        volleyballAnimation = null; // Reset | Zeile 107: setzt Zeile 14 Variable zurück
    }
    starteFinalenWurf(); // Finaler Wurf | Zeile 109: ruft Zeile 112 auf
}

// Finaler Wurf | Zeile 112
// Wird von beendeVolleyball Zeile 109 aufgerufen | Zeile 113
function starteFinalenWurf() {
    const aktuelleZeit = getDrehzeit(); // Zeit holen | Zeile 115: von muenz-steuerung.js Zeile 31
    muenze.style.animation = `muenz-wurf ${aktuelleZeit}s ease-out`; // Wurf-Animation | Zeile 116: zu muenz-style.css Zeile 66
    setTimeout(() => berechneErgebnis(), aktuelleZeit * 1000); // Ergebnis | Zeile 117: ruft Zeile 120 nach Wurf auf
}

// Ergebnis berechnen | Zeile 120
// Von starteFinalenWurf Zeile 117 aufgerufen | Zeile 121  
// Verbunden mit: zeigeErgebnis Zeile 126 | Zeile 122
function berechneErgebnis() {
    const zufallsZahl = Math.random(); // Zufall 0-1 | Zeile 124: Math.random 50/50
    const ergebnis = zufallsZahl < 0.5 ? 'kopf' : 'zahl'; // Wahl | Zeile 125: kopf oder zahl
    zeigeErgebnis(ergebnis); // Zeigen | Zeile 126: ruft Zeile 129 auf
}

// Ergebnis anzeigen | Zeile 129
// Von berechneErgebnis Zeile 126 aufgerufen | Zeile 130
// Verbunden mit: resetMuenze Zeile 135 | Zeile 131  
function zeigeErgebnis(ergebnis) {
    aktuelleSeite = ergebnis; // Seite setzen | Zeile 133: neue aktuelle Seite
    muenze.textContent = ergebnis === 'kopf' ? '👑' : '2'; // Symbol | Zeile 134: Krone oder 2
    setTimeout(() => resetMuenze(), 2000); // Reset | Zeile 135: nach 2 Sekunden zurücksetzen
}

// Münze zurücksetzen | Zeile 138
// Von zeigeErgebnis Zeile 135 aufgerufen | Zeile 139
function resetMuenze() {
    muenze.style.animation = ''; // Animation weg | Zeile 141: entfernt Animation
    muenze.style.transform = ''; // Position reset | Zeile 142: zurück zu Startposition
    istAmVolleyball = false; // Volleyball aus | Zeile 143: setzt Zeile 9 Variable zurück
    muenzPosition = {x: 0, y: 0}; // Position reset | Zeile 144: setzt Zeile 12 Variable zurück
    muenzGeschwindigkeit = {x: 0, y: 0}; // Speed reset | Zeile 145: setzt Zeile 13 Variable zurück
    if (volleyballAnimation) { // Animation läuft | Zeile 146: prüft Zeile 14 Variable
        cancelAnimationFrame(volleyballAnimation); // Animation stopp | Zeile 147: stoppt Animation
        volleyballAnimation = null; // Reset | Zeile 148: setzt Zeile 14 Variable zurück
    }
}

// DOM Ready Event | Zeile 151
// Startet bei Seitenload | Zeile 152: browser DOMContentLoaded  
document.addEventListener('DOMContentLoaded', initMuenzAnimation); // Init | Zeile 153: ruft Zeile 17 auf