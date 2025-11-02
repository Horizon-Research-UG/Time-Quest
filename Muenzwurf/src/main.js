// Haupt-Server-Datei für Gigapages-Projekt
// Startet den Express-Server und lädt alle Module
// Verbunden mit: config/server-config.js (Zeile 15)
// Verbunden mit: pages/page-loader.js (Zeile 20)

const express = require('express'); // Express Framework laden
const path = require('path'); // Pfad-Utilities laden
const config = require('../config/server-config'); // Server-Konfiguration laden

const app = express(); // Express App erstellen
const port = config.port || 3000; // Port aus Konfiguration oder Standard

// Statische Dateien servieren
// Verbunden mit: assets/* (alle Asset-Dateien)
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Hauptroute für Münzwurf-Spiel
// Verbunden mit: pages/home.html (Zeile wird gesendet)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/home.html')); // Spielseite senden
});

// Server starten
// Verbunden mit: config/server-config.js port (Zeile 8)
app.listen(port, () => {
    console.log(`Münzwurf-Spiel läuft auf http://localhost:${port}`); // Start-Nachricht
});