<script lang="ts">
  import { reveal, trackSection } from './actions';

  // ─────────────────────────────────────────────────────────────────────────
  // Web3Forms-Konfiguration
  // Hol dir deinen kostenlosen Access-Key auf https://web3forms.com/ (E-Mail
  // eintragen → Key kommt per Mail). Trage ihn unten ein. Bis dahin fällt das
  // Formular automatisch auf einen mailto:-Fallback zurück, sodass es nicht
  // bricht.
  // ─────────────────────────────────────────────────────────────────────────
  const WEB3FORMS_ACCESS_KEY = 'a2cdf224-0368-403d-925e-eb117ee6f998';

  let name = '';
  let email = '';
  let phone = '';
  let company = '';
  let message = '';
  let honeypot = ''; // Spam-Falle: echte Nutzer lassen das Feld leer
  let sending = false;
  let sent = false;
  let error = '';

  async function submit(e: Event) {
    e.preventDefault();
    error = '';

    if (honeypot) {
      // Bot erkannt — still „Erfolg" anzeigen, damit der Bot nicht lernt
      sent = true;
      return;
    }

    if (!name || !email || !message) {
      error = 'Bitte Name, E-Mail und eine kurze Nachricht angeben.';
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      error = 'Bitte eine gültige E-Mail-Adresse eingeben.';
      return;
    }

    // Fallback: solange kein Web3Forms-Key konfiguriert ist, mailto: nutzen
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Anfrage von ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nFirma: ${company}\nTelefon: ${phone}\nE-Mail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:leon@deich-dynamics.com?subject=${subject}&body=${body}`;
      sent = true;
      return;
    }

    sending = true;
    try {
      // Web3Forms-Payload — deutsche Feldlabels, damit die eingehende Mail
      // direkt verständlich ist. Bestätigung an Absender läuft separat über
      // Gmail-Filter + Auto-Reply-Template (nicht über Web3Forms cc).
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Neue Anfrage von ${name} — deich-dynamics.com`,
          from_name: `${name} via deich-dynamics.com`,
          replyto: email,

          // Sichtbar im Mail-Body (Reihenfolge bestimmt Anzeige in Web3Forms)
          Name: name,
          'E-Mail': email,
          Telefon: phone || '—',
          Firma: company || '—',
          Nachricht: message,

          // Anti-Spam
          botcheck: ''
        })
      });
      const data = await res.json();
      if (data.success) {
        sent = true;
        name = email = phone = company = message = '';
      } else {
        error = data.message || 'Versand fehlgeschlagen. Bitte direkt per E-Mail melden.';
      }
    } catch (err) {
      error = 'Verbindungsfehler. Bitte direkt per E-Mail an leon@deich-dynamics.com melden.';
    } finally {
      sending = false;
    }
  }
</script>

<section id="contact" use:trackSection={'contact'} class="contact">
  <div class="container grid">
    <div class="copy" use:reveal>
      <span class="eyebrow">Kontakt</span>
      <h2>Lassen Sie uns peilen, was möglich ist.</h2>
      <p>
        Ein 30-minütiges Erstgespräch kostet Sie nichts außer Kaffee — egal ob bei Ihnen
        im Büro, per Video oder mit Blick auf den Strand von St.&nbsp;Peter-Ording.
      </p>

      <ul class="info">
        <li>
          <span class="icon" aria-hidden="true">✉</span>
          <a href="mailto:leon@deich-dynamics.com">leon@deich-dynamics.com</a>
        </li>
        <li>
          <span class="icon" aria-hidden="true">☎</span>
          <a href="tel:+4948639984997">+49&nbsp;4863&nbsp;9984997</a>
        </li>
        <li>
          <span class="icon" aria-hidden="true">⌖</span>
          <a href="https://deich-dynamics.com" target="_blank" rel="noopener">deich-dynamics.com</a>
        </li>
        <li>
          <span class="icon" aria-hidden="true">◐</span>
          <span>St.&nbsp;Peter-Ording, Nordfriesland</span>
        </li>
      </ul>

      <div class="hours">
        <div>
          <span class="hours-label">Sprechzeiten</span>
          <span class="hours-value">Mo–Fr · 9–18&nbsp;Uhr</span>
        </div>
        <div>
          <span class="hours-label">Antwortzeit ⌀</span>
          <span class="hours-value">unter 4&nbsp;Stunden</span>
        </div>
        <div>
          <span class="hours-label">Erstgespräch</span>
          <span class="hours-value">30&nbsp;Min, kostenfrei</span>
        </div>
      </div>
    </div>

    <form class="form" use:reveal data-delay="1" on:submit={submit} novalidate>
      {#if sent}
        <div class="success" role="status">
          <strong>Vielen Dank!</strong>
          <p>Ihre Nachricht ist auf dem Weg zu uns. Wir melden uns in der Regel innerhalb von 4&nbsp;Stunden — meist schneller.</p>
          <button type="button" class="btn ghost" on:click={() => (sent = false)}>Neue Anfrage</button>
        </div>
      {:else}
        <label>
          <span>Name</span>
          <input type="text" bind:value={name} placeholder="Maren Mustermann" autocomplete="name" disabled={sending} />
        </label>
        <div class="row">
          <label>
            <span>E-Mail</span>
            <input type="email" bind:value={email} placeholder="maren@firma.de" autocomplete="email" disabled={sending} />
          </label>
          <label>
            <span>Telefon <em>(optional)</em></span>
            <input type="tel" bind:value={phone} placeholder="+49 …" autocomplete="tel" disabled={sending} />
          </label>
        </div>
        <label>
          <span>Firma <em>(optional)</em></span>
          <input type="text" bind:value={company} placeholder="Firma GmbH" autocomplete="organization" disabled={sending} />
        </label>
        <label>
          <span>Worum geht's?</span>
          <textarea bind:value={message} rows="5" placeholder="Erzählen Sie kurz, was Sie aktuell beschäftigt — egal wie skizzenhaft." disabled={sending}></textarea>
        </label>

        <!-- Honeypot: für Menschen versteckt, Bots füllen es aus -->
        <label class="honeypot" aria-hidden="true">
          Website
          <input type="text" tabindex="-1" autocomplete="off" bind:value={honeypot} />
        </label>

        {#if error}
          <p class="error" role="alert">{error}</p>
        {/if}

        <button class="btn sun" type="submit" disabled={sending}>
          {#if sending}
            Wird gesendet…
          {:else}
            Anfrage senden
            <span class="arrow" aria-hidden="true">→</span>
          {/if}
        </button>
        <small class="legal">
          Mit dem Absenden erklären Sie sich einverstanden, dass wir Sie zur Beantwortung Ihrer
          Anfrage kontaktieren. Keine Newsletter, keine Weitergabe.
          Details in der <a href="./datenschutz.html">Datenschutzerklärung</a>.
        </small>
      {/if}
    </form>
  </div>
</section>

<style>
  .contact {
    background:
      radial-gradient(60% 60% at 100% 0%, rgba(29, 63, 54, 0.12), transparent 60%),
      radial-gradient(40% 40% at 0% 100%, rgba(184, 133, 54, 0.08), transparent 60%),
      var(--color-bg-2);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1.05fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }

  @media (max-width: 880px) {
    .grid { grid-template-columns: 1fr; }
  }

  .copy p {
    color: var(--color-text-muted);
    max-width: 36em;
  }

  .info {
    list-style: none;
    margin: 1.5rem 0 1rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .info li {
    display: flex;
    gap: 0.85rem;
    align-items: center;
    color: var(--color-text);
  }
  .info .icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--color-foam);
    color: var(--color-tide);
    display: grid;
    place-items: center;
    font-size: 1rem;
  }

  .hours {
    margin-top: 1.5rem;
    padding-top: 1.2rem;
    border-top: 1px dashed var(--color-line);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem 1rem;
  }
  @media (max-width: 520px) {
    .hours {
      grid-template-columns: 1fr;
      gap: 0.6rem 0;
    }
  }
  .hours > div {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .hours-label {
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-text-soft);
  }
  .hours-value {
    font-family: var(--font-display);
    font-size: 0.95rem;
    color: var(--color-deep);
    font-weight: 500;
    line-height: 1.2;
  }

  .form {
    background: var(--color-surface);
    border: 1px solid var(--color-line);
    border-radius: var(--radius);
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    box-shadow: var(--shadow-sm);
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.9rem;
  }
  @media (max-width: 520px) {
    .row { grid-template-columns: 1fr; }
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.85rem;
    color: var(--color-text-muted);
  }
  label em {
    font-style: normal;
    color: var(--color-text-soft);
    font-weight: 400;
  }
  input,
  textarea {
    font: inherit;
    color: var(--color-text);
    background: var(--color-surface-2);
    border: 1px solid var(--color-line);
    border-radius: 10px;
    padding: 0.7rem 0.85rem;
    outline: none;
    transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease),
      box-shadow var(--t-fast) var(--ease);
  }
  input:focus,
  textarea:focus {
    border-color: var(--color-tide);
    background: #fff;
    box-shadow: 0 0 0 4px rgba(29, 63, 54, 0.18);
  }
  textarea {
    resize: vertical;
    min-height: 110px;
  }

  .error {
    color: #b3341d;
    background: rgba(232, 93, 74, 0.1);
    border: 1px solid rgba(232, 93, 74, 0.25);
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
    margin: 0;
    font-size: 0.9rem;
  }

  /* Visuell und für AT versteckt — bleibt für Bots auffindbar */
  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  input:disabled,
  textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .legal {
    color: var(--color-text-soft);
    font-size: 0.78rem;
  }

  .success {
    text-align: center;
    padding: 1rem 0.5rem;
  }
  .success strong {
    display: block;
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--color-deep);
    margin-bottom: 0.4rem;
  }
  .success p {
    color: var(--color-text-muted);
    margin-bottom: 1rem;
  }
</style>
