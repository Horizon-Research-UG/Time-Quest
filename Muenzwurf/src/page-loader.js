// Gigapage-Loader Modul
// Lädt und verwaltet große Seitenstrukturen
// Verwendet von: src/main.js (wird noch implementiert)
// Verbunden mit: pages/home.html (Zeile wird in load() definiert)

const fs = require('fs'); // Dateisystem-Zugriff
const path = require('path'); // Pfad-Utilities

class GigaPageLoader {
    
    // Konstruktor initialisiert den Loader
    // Setzt Basis-Pfad für alle Seiten
    constructor(basePath = '../pages') {
        this.basePath = basePath; // Basis-Pfad speichern
    }
    
}