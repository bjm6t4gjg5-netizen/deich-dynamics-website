# Deich Dynamics Solutions — Website

Statische Website für [deich-dynamics.com](https://deich-dynamics.com) — KI, Digitalisierung & Finanzen für den Mittelstand in Norddeutschland.

Gehostet über **GitHub Pages** (Source: *Deploy from a branch*, `main` / root). Kein Build-Schritt, kein Framework — reines HTML/CSS/JS, DSGVO-freundlich (lokale Fonts, keine Cookies, kein Tracking).

## Struktur

```
04 - Website/
├── draft/        ← Arbeitskopie: HIER wird geändert und getestet
├── live/         ← Spiegel des deployten Stands (nie direkt anfassen)
└── deploy.sh     ← Deployment-Script (draft → live → GitHub)
```

Inhalt der Website:

```
index.html        Einseiter (Hero, Auszug, KI, Leistungen, Profil, Kanzleien, Kontakt)
impressum.html    Impressum
datenschutz.html  Datenschutzerklärung
CNAME             Custom Domain (deich-dynamics.com) — NICHT löschen!
assets/           Logos, Hero-Bild, Porträt, Favicons, OG-Image
fonts/            Source Serif 4 + IBM Plex Mono (lokal eingebunden, DSGVO)
```

## Workflow

1. Änderungen in `draft/` machen und lokal testen (`draft/index.html` im Browser öffnen — am besten einmal MacBook, einmal iMac).
2. Wenn alles passt, deployen:

```bash
cd "/Users/leonschulte/Library/CloudStorage/GoogleDrive-leon@deich-dynamics.com/My Drive/C - Deich Dynamics Solutions/A - Marketing/04 - Website"
./deploy.sh "Kurze Beschreibung der Änderung"
```

Das Script macht vier Schritte:

1. **draft → live** spiegeln (rsync)
2. Repo frisch nach `/tmp` **klonen** (außerhalb von Google Drive — Git und Drive-Sync vertragen sich nicht)
3. `live/` in den Klon spiegeln, **committen und pushen** (keine Änderungen → kein Push)
4. Temp-Ordner **automatisch löschen**

GitHub Pages baut die Seite nach dem Push automatisch neu (1–2 Minuten, sichtbar im Actions-Tab als „pages build and deployment").

## Wichtige Hinweise

- **CNAME:** Die Datei `CNAME` muss in `draft/` liegen. Das Script deployt mit `--delete` — fehlt sie, wird die Custom Domain bei jedem Deploy aus den GitHub-Settings entfernt. Domainwechsel = einfach `draft/CNAME` editieren.
- **`permission denied` beim Script:** einmalig `chmod +x deploy.sh` ausführen (Google Drive setzt Dateirechte gelegentlich zurück; alternativ `bash deploy.sh "…"`).
- **Hero:** passt sich per `@media (max-height: …)` an flache Displays an (MacBook vs. iMac).
- **Kontakt:** „E-Mail schreiben" öffnet erst einen Hinweis-Dialog, dann eine vorformatierte E-Mail mit Formular-Feldern (`mailto:` mit Body).

## Kontakt

Leon Schulte · Deich Dynamics Solutions · St. Peter-Ording
info@deich-dynamics.com · +49 4863 9984997
