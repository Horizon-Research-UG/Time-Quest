// Server-Konfiguration für Gigapages
// Definiert alle wichtigen Server-Einstellungen
// Verwendet von: src/main.js (Zeile 8)

module.exports = {
    port: process.env.PORT || 3000, // Server-Port definieren
    host: 'localhost', // Server-Host definieren
    
    // Gigapages-spezifische Konfiguration
    gigapages: {
        maxPageSize: 1024 * 1024, // Max Seitengröße: 1MB
        cacheEnabled: true // Caching aktivieren
    }
};