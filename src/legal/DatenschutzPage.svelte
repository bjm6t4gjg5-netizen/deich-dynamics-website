<script lang="ts">
  import LegalLayout from './LegalLayout.svelte';
</script>

<LegalLayout title="Datenschutzerklärung">
  <article class="block">
    <h1>Datenschutzerklärung</h1>
    <p class="sub">Stand: Mai 2026</p>

    <h2>1. Verantwortlicher</h2>
    <p>
      Verantwortlicher im Sinne der DSGVO ist:<br>
      Leon Schulte · Deich Dynamics Solutions <em>(in Gründung)</em><br>
      [Straße und Hausnummer]<br>
      25826 St.&nbsp;Peter-Ording<br>
      E-Mail: <a href="mailto:leon@deich-dynamics.com">leon@deich-dynamics.com</a><br>
      Telefon: +49 4863 9984997
    </p>

    <h2>2. Allgemeines zur Daten­verarbeitung</h2>
    <p>
      Wir verarbeiten personen­bezogene Daten unserer Nutzer grundsätzlich nur, soweit dies
      zur Bereit­stellung einer funktions­fähigen Website sowie unserer Inhalte und Leistungen
      erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung der Nutzer
      oder auf einer der in Art.&nbsp;6 Abs.&nbsp;1 DSGVO genannten Rechts­grundlagen.
    </p>

    <h2>3. Bereitstellung der Website &amp; Server-Logfiles</h2>
    <p>
      Beim Aufruf unserer Website werden technisch notwendige Daten (IP-Adresse,
      Browser-Typ und -Version, Betriebssystem, Referrer-URL, Zeitstempel) durch unseren
      Hosting-Provider in Server-Logfiles gespeichert. Diese Daten werden nach spätestens
      14 Tagen automatisch gelöscht. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f
      DSGVO (berechtigtes Interesse an einer stabilen, sicheren Bereitstellung).
    </p>

    <h2>4. Kontaktaufnahme &amp; Kontakt­formular</h2>
    <p>
      Wenn Sie uns über das Kontakt­formular oder per E-Mail erreichen, werden die
      übermittelten Daten (Name, E-Mail-Adresse, ggf. Firma, Nachrichten­inhalt) zur
      Bearbeitung Ihrer Anfrage gespeichert. Die Übermittlung erfolgt über den Dienst
      <em>Web3Forms</em> (Betrieb durch Statichunt Technologies, Indien) als
      Auftrags­verarbeiter. Web3Forms leitet die Nachricht ausschließlich an unsere
      hinterlegte E-Mail-Adresse weiter und speichert die Inhalte selbst nicht dauerhaft.
      Wir geben die Daten nicht an weitere Dritte weiter. Die Daten werden bei uns gelöscht,
      sobald die Bearbeitung abgeschlossen ist und keine gesetzlichen Aufbewahrungs­pflichten
      bestehen. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b und lit.&nbsp;f DSGVO.
    </p>

    <h2>5. Hosting</h2>
    <p>
      Unsere Website wird bei <em>[Hosting-Anbieter]</em> gehostet. Mit dem Anbieter besteht
      ein Auftrags­verarbeitungs­vertrag gemäß Art.&nbsp;28 DSGVO.
    </p>

    <h2>6. Web-Fonts</h2>
    <p>
      Für die einheitliche Darstellung verwenden wir Schriftarten von <em>Bunny&nbsp;Fonts</em>
      (Tinkov International d.o.o., Slowenien). Bunny&nbsp;Fonts ist eine DSGVO-konforme
      Alternative zu Google&nbsp;Fonts, die IP-Adressen nicht protokolliert und keine
      Tracking-Cookies setzt.
    </p>

    <h2>7. Cookies</h2>
    <p>
      Diese Website setzt keine Tracking- oder Marketing-Cookies. Technisch notwendige
      Cookies (z.&nbsp;B. zur Speicherung von Benutzer­einstellungen) können temporär
      gesetzt werden — dafür ist gemäß §&nbsp;25 Abs.&nbsp;2 TTDSG keine Einwilligung
      erforderlich.
    </p>

    <h2>8. Web-Analyse &amp; Tracking</h2>
    <p>
      Wir setzen aktuell keine Tracking- oder Analyse­dienste wie Google&nbsp;Analytics,
      Matomo oder ähnliche ein. Sollte sich das ändern, werden wir Sie an dieser Stelle
      informieren und — falls erforderlich — Ihre Einwilligung einholen.
    </p>

    <h2>9. Rechte der Betroffenen</h2>
    <p>
      Sie haben das Recht auf Auskunft (Art.&nbsp;15 DSGVO), Berichtigung (Art.&nbsp;16),
      Löschung (Art.&nbsp;17), Einschränkung der Verarbeitung (Art.&nbsp;18),
      Daten­übertragbarkeit (Art.&nbsp;20) sowie auf Widerspruch (Art.&nbsp;21).
      Bitte richten Sie entsprechende Anfragen formlos an
      <a href="mailto:leon@deich-dynamics.com">leon@deich-dynamics.com</a>.
    </p>

    <h2>10. Beschwerderecht bei der Aufsichts­behörde</h2>
    <p>
      Sie haben das Recht, sich bei einer Datenschutz-Aufsichts­behörde zu beschweren.
      Zuständig für uns ist das Unabhängige Landes­zentrum für Datenschutz
      Schleswig-Holstein (ULD), Holstenstraße&nbsp;98, 24103&nbsp;Kiel.
    </p>

    <h2>11. Änderungen dieser Datenschutz­erklärung</h2>
    <p>
      Wir behalten uns vor, diese Datenschutz­erklärung anzupassen, damit sie stets den
      aktuellen rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen
      in der Erklärung umzusetzen. Die jeweils aktuelle Version ist unter dieser URL
      abrufbar.
    </p>
  </article>
</LegalLayout>

<style>
  .block {
    max-width: 720px;
    margin: 0 auto;
    color: var(--color-text-muted);
    font-size: 0.96rem;
    line-height: 1.65;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.2vw, 2.4rem);
    color: var(--color-deep);
    margin-bottom: 0.2em;
  }

  .sub {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-text-soft);
    margin-bottom: 2rem;
  }

  h2 {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--color-deep);
    margin-top: 1.9rem;
    margin-bottom: 0.4rem;
    letter-spacing: -0.005em;
  }

  p {
    margin-bottom: 0.9rem;
  }

  em {
    font-style: italic;
    color: var(--color-text-soft);
  }

  a {
    color: var(--color-deep);
    text-decoration: underline;
    text-decoration-color: var(--color-line);
    text-underline-offset: 3px;
  }
  a:hover {
    text-decoration-color: var(--color-deep);
  }
</style>
