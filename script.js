// Münzwurf - Komplett neu | Zeile 1

let muenze = null; // Münz-Element | Zeile 3
let zeitSlider = null; // Zeit-Regler | Zeile 4
let zeitAnzeige = null; // Zeit-Anzeige | Zeile 5
let istAmWerfen = false; // Wurf läuft | Zeile 6

// Seite geladen | Zeile 8
document.addEventListener('DOMContentLoaded', function() {
    muenze = document.getElementById('muenze'); // Münze holen | Zeile 10
    zeitSlider = document.getElementById('drehzeit'); // Slider holen | Zeile 11
    zeitAnzeige = document.getElementById('zeit-anzeige'); // Anzeige holen | Zeile 12
    
    // Münz-Klick Event | Zeile 14
    muenze.addEventListener('click', werfeMuenze); // Bei Klick werfen | Zeile 15
    
    // Slider Event | Zeile 17
    zeitSlider.addEventListener('input', function() {
        zeitAnzeige.textContent = zeitSlider.value; // Anzeige updaten | Zeile 19
    });
    
    // Zufällige Startseite | Zeile 22
    muenze.textContent = Math.random() < 0.5 ? '👑' : '2'; // Kopf oder Zahl | Zeile 23
});

// Münze werfen | Zeile 26
function werfeMuenze() {
    if (istAmWerfen) return; // Nicht doppelt werfen | Zeile 28
    
    istAmWerfen = true; // Wurf läuft | Zeile 30
    const dauer = parseFloat(zeitSlider.value); // Dauer vom Slider | Zeile 31
    
    // Animation starten | Zeile 33
    muenze.style.animation = `muenzwurf ${dauer}s ease-in-out`; // CSS Animation | Zeile 34
    
    // Nach Animation: Zufälliges Ergebnis | Zeile 36
    setTimeout(function() {
        const ergebnis = Math.random() < 0.5 ? '👑' : '2'; // 50/50 Chance | Zeile 38
        muenze.textContent = ergebnis; // Ergebnis anzeigen | Zeile 39
        muenze.style.animation = ''; // Animation zurücksetzen | Zeile 40
        istAmWerfen = false; // Wurf beendet | Zeile 41
    }, dauer * 1000); // Dauer in Millisekunden | Zeile 42
}