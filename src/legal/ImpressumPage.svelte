<script lang="ts">
  import LegalLayout from './LegalLayout.svelte';
</script>

<LegalLayout title="Impressum">
  <article class="block">
    <h1>Impressum</h1>
    <p class="sub">Angaben gemäß § 5 TMG</p>

    <div class="notice" role="note">
      <strong>Hinweis:</strong> Deich&nbsp;Dynamics&nbsp;Solutions befindet sich derzeit in
      Gründung. Pflichtangaben wie die Umsatzsteuer-Identifikations­nummer und die Berufs­haftpflicht­versicherung
      werden an dieser Stelle ergänzt, sobald die Gewerbe­anmeldung und die entsprechenden
      Verträge vorliegen. Bis dahin tritt der Inhaber persönlich für die Inhalte dieser Website ein.
    </div>

    <h2>Anbieter</h2>
    <p>
      Deich Dynamics Solutions <em>(in Gründung)</em><br>
      Inhaber: Leon Schulte<br>
      [Straße und Hausnummer]<br>
      25826 St.&nbsp;Peter-Ording<br>
      Deutschland
    </p>

    <h2>Kontakt</h2>
    <p>
      Telefon: <a href="tel:+4948639984997">+49&nbsp;4863&nbsp;9984997</a><br>
      E-Mail: <a href="mailto:info@deich-dynamics.com">info@deich-dynamics.com</a><br>
      Web: <a href="https://deich-dynamics.com">deich-dynamics.com</a>
    </p>

    <h2>Umsatzsteuer-ID</h2>
    <p>
      Eine Umsatzsteuer-Identifikations­nummer gemäß §&nbsp;27&nbsp;a UStG liegt aktuell noch
      nicht vor — siehe Hinweis oben.
    </p>

    <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
    <p>Leon Schulte, Anschrift wie oben.</p>

    <h2>Berufshaftpflicht­versicherung</h2>
    <p>
      Eine Berufs­haftpflicht­versicherung wird zum Zeitpunkt der Geschäfts­aufnahme
      abgeschlossen — siehe Hinweis oben.
    </p>

    <h2>Streit­schlichtung</h2>
    <p>
      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
      <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a>.
      Wir sind nicht bereit oder verpflichtet, an Streit­beilegungs­verfahren vor einer
      Verbraucher­schlichtungs­stelle teilzunehmen.
    </p>

    <h2>Haftung für Inhalte</h2>
    <p>
      Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
      nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
      Dienstanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
      Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechts­widrige
      Tätigkeit hinweisen.
    </p>

    <h2>Haftung für Links</h2>
    <p>
      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
      Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
      übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
      oder Betreiber der Seiten verantwortlich.
    </p>

    <h2>Urheberrecht</h2>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unter­liegen
      dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
      Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
      Zustimmung des jeweiligen Autors bzw. Erstellers.
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

  .notice {
    background: rgba(184, 133, 54, 0.10);
    border-left: 3px solid var(--color-sun);
    padding: 0.95rem 1.1rem;
    border-radius: 6px;
    color: var(--color-text);
    font-size: 0.92rem;
    margin-bottom: 2rem;
  }
  .notice strong {
    color: var(--color-deep);
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
