// Münzwurf Steuerung
// Verwaltet den Drehzeit-Regler und Einstellungen
// Verwendet von: pages/home.html (Zeile 26)
// Verbunden mit: muenz-animation.js getDrehzeit() (diese Datei)

// Globale Steuerungsvariablen
// Verbunden mit: pages/home.html #dreh-slider (Zeile 19)
let drehSlider = null; // Slider-Element Referenz
let wertAnzeige = null; // Wert-Anzeige Referenz

// Initialisiert die Steuerungselemente
// Wird bei DOM-Ready aufgerufen
// Verbunden mit: pages/home.html #dreh-slider und #dreh-wert
function initSteuerung() {
    drehSlider = document.getElementById('dreh-slider'); // Slider holen
    wertAnzeige = document.getElementById('dreh-wert'); // Wert-Anzeige holen
    drehSlider.addEventListener('input', updateDrehzeit); // Input-Event hinzufügen
}

// Aktualisiert die Drehzeit basierend auf Slider-Wert
// Wird von Slider input-Event aufgerufen
// Verbunden mit: pages/home.html #dreh-wert (Zeile 20)
function updateDrehzeit() {
    const neueZeit = drehSlider.value; // Slider-Wert holen
    drehZeit = parseFloat(neueZeit); // Als Zahl speichern
    wertAnzeige.textContent = neueZeit; // Anzeige aktualisieren
}

// Gibt die aktuelle Drehzeit zurück
// Wird von muenz-animation.js werfeMuenze() verwendet
function getDrehzeit() {
    return drehZeit; // Aktuelle Drehzeit zurückgeben
}

// DOM-Ready Event für Steuerung
// Startet Steuerung wenn Seite geladen ist
document.addEventListener('DOMContentLoaded', initSteuerung);