# Deich Dynamics Solutions — Website

Single-Page-Website (+ separate Pflicht-Seiten) für die FinTech-Beratungsagentur **Deich Dynamics Solutions** aus St. Peter-Ording.

## Tech-Stack

- **Svelte 4** + **TypeScript**
- **Vite 5** als Build-Tool, Multi-Page-Konfiguration
- **Web3Forms** für das Kontaktformular (kostenlos, kein Backend nötig)
- Statisch deploybar — egal ob GitHub Pages, Netlify, Lima City Webspace, S3 …

## Setup

```bash
npm install
npm run dev      # Dev-Server unter http://localhost:5173
npm run build    # Erzeugt /dist – statisch deploybar
npm run preview  # Lokaler Preview-Server für /dist
npm run check    # Type-Check via svelte-check
```

## Struktur

```
.
├── index.html                          # Startseite
├── impressum.html                      # /impressum.html
├── datenschutz.html                    # /datenschutz.html
└── src/
    ├── App.svelte                      # Startseite – orchestriert Sektionen
    ├── main.ts                         # Entry Startseite
    ├── app.css                         # Design-Tokens (Nordsee-Palette) + globale Styles
    ├── legal/
    │   ├── LegalLayout.svelte          # Shared Header + Footer für Pflichtseiten
    │   ├── ImpressumPage.svelte
    │   ├── DatenschutzPage.svelte
    │   ├── impressum-main.ts           # Entry Impressum
    │   └── datenschutz-main.ts         # Entry Datenschutz
    └── lib/
        ├── stores.ts, actions.ts
        ├── Nav.svelte, Hero.svelte, About.svelte, Insights.svelte,
        ├── Services.svelte, Manifest.svelte, Faq.svelte, Contact.svelte,
        ├── Footer.svelte, CursorGlow.svelte
        └── Approach.svelte, References.svelte, Team.svelte   ← aktuell versteckt
```

> **Versteckte Sektionen:** Approach, References und Team sind in `App.svelte` auskommentiert, weil die Inhalte noch nicht fertig sind. Der Code bleibt im Repo — zum Aktivieren einfach die Kommentare entfernen.

## Kontaktformular — Web3Forms aktivieren

Das Formular nutzt [Web3Forms](https://web3forms.com/) (kostenlos, unbegrenzte Nachrichten, kein Account).

1. Auf https://web3forms.com/ deine Empfangs-E-Mail (`leon+websitemail@deich-dynamics.com`) eintragen — Plus-Address-Routing für Gmail-Filter.
2. Du erhältst den **Access-Key** per Mail.
3. In `src/lib/Contact.svelte` ganz oben die Konstante setzen:
   ```ts
   const WEB3FORMS_ACCESS_KEY = 'dein-key-hier';
   ```
4. `npm run build` → neu deployen.

Solange der Key leer ist, fällt das Formular automatisch auf `mailto:` zurück — es kann also nichts brechen.

## Pflichtangaben vor Go-Live

In `src/legal/ImpressumPage.svelte` und `src/legal/DatenschutzPage.svelte` sind folgende Platzhalter zu ersetzen:

- `[Straße und Hausnummer]` — Geschäftsadresse
- `[Hosting-Anbieter]` — z. B. „GitHub, Inc., San Francisco, CA, USA" oder „Lima City — netcup GmbH"
- USt-IdNr. und Berufshaftpflicht ergänzen, sobald vorliegend (aktuell durch „in Gründung"-Hinweis abgedeckt)

## Deploy (empfohlen: GitHub Pages mit Lima-City-Domain)

Der Auto-Deploy-Workflow liegt bereits unter `.github/workflows/deploy.yml`. Bei jedem `git push` auf `main` baut GitHub die Site und deployt sie nach GitHub Pages. Die `public/CNAME`-Datei ist ebenfalls schon angelegt.

### Einmaliges Setup

1. **Repo auf GitHub anlegen** und Projekt pushen:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<dein-user>/<repo-name>.git
   git push -u origin main
   ```

2. **GitHub Pages aktivieren:** Im Repo unter Settings → Pages → Source: **„GitHub Actions"** auswählen. Beim ersten Push läuft der Workflow automatisch los, die Site ist dann unter `https://<dein-user>.github.io/<repo-name>/` erreichbar.

3. **Custom Domain (deich-dynamics.com) verknüpfen** — im Lima-City-Kunden-Center die DNS-Einstellungen für `deich-dynamics.com` anpassen:
   - **A-Records** für den Apex (`@`) — alle vier eintragen:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **CNAME** für `www` → `<dein-github-user>.github.io.` (Punkt am Ende!)

4. **Im GitHub-Repo:** Settings → Pages → unter „Custom domain" `deich-dynamics.com` eintragen. Nach DNS-Propagation (10 min – 24 h) den Haken bei **„Enforce HTTPS"** setzen.

### Spätere Änderungen

```bash
# Lokal ändern und testen
npm run dev

# Deployen
git add .
git commit -m "kurze beschreibung der änderung"
git push
```

Das war's. ~1–2 Minuten nach dem Push ist die Änderung live.

### Alternative: Lima City Webspace direkt

Wer ohne GitHub-Workflow leben will: `npm run build`, dann den Inhalt von `dist/` per FTP/SFTP ins `htdocs/`-Verzeichnis hochladen. Bei jeder Änderung erneut. Empfohlen nur, falls GitHub aus irgendeinem Grund ausfällt.

## Lizenz

© Deich Dynamics Solutions
