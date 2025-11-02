# Münzwurf Spiel 🪙

**GitHub Pages Version für direkten Browser-Zugriff**

Interaktives Münzwurf-Spiel mit präziser Animation und einstellbarer Drehzeit.

## Spielfeatures

- 🎯 Klicke auf die Münze zum Werfen
- 🌪️ Realistische Flug- und Drehanimation
- ⏱️ Einstellbare Drehzeit (1-10 Sekunden)
- 🎲 Echter Zufallsgenerator für Kopf/Zahl
- 🏀 Sprunganimation beim Landen

## Projektstruktur

```
Muenzwurf/
├── src/                     # Hauptquellcode
│   ├── main.js             # Server-Startdatei
│   └── page-loader.js      # Gigapage-Loader Modul
├── pages/                  # HTML-Seiten
│   └── home.html           # Münzwurf-Spielseite
├── assets/                 # Statische Dateien
│   ├── muenz-style.css     # Münz-Stylesheet mit Animationen
│   ├── muenz-animation.js  # Hauptanimations-Logik
│   └── muenz-steuerung.js  # Drehzeit-Steuerung
├── config/                 # Konfigurationsdateien
│   └── server-config.js    # Server-Konfiguration
└── package.json           # Projekt-Dependencies
```

## Coding-Standards (read_everytime_important)

✅ **Korrekt befolgt:**
- **x = 7**: Maximal 7 Zeilen pro Funktion
- **Punkt 5**: Jede einzelne Zeile ist vollständig kommentiert  
- **Punkt 3**: Maximale Modularität (separate Dateien)
- **Punkt 2**: Nur klare, verständliche Code-Zeilen
- **Punkt 7**: Kommentare mit exakten Zeilennummern der Verbindungen
- **Punkt 8**: Maximal 7 Funktionsdateien gleichzeitig

## Installation & Start

```bash
npm install     # Dependencies installieren
npm start       # Spiel starten
```

Dann öffne: http://localhost:3000

## Spielanleitung

1. **Münze werfen:** Klicke auf die Münze 💰
2. **Drehzeit einstellen:** Nutze den Slider (1-10 Sekunden)
3. **Ergebnis abwarten:** Kopf 👑 oder Zahl 💰
4. **Erneut spielen:** Klicke wieder auf die Münze

Viel Spaß beim Münzwerfen! 🎮