<script lang="ts">
  import { slide } from 'svelte/transition';
  import { reveal, trackSection } from './actions';

  type FAQ = { q: string; a: string };

  const faqs: FAQ[] = [
    {
      q: 'Wie lange dauert ein CRM-Projekt typischerweise?',
      a: 'Ein Standard-Setup auf unserer CRM-Plattform dauert ca. 6–10 Wochen vom Kickoff bis zum Go-Live. Größere Migrationen mit umfangreicher Daten­übernahme aus einem Bestands­system brauchen 3–4 Monate. Wir liefern in 2-Wochen-Sprints — Sie sehen Klickbares lange bevor wir fertig sind.'
    },
    {
      q: 'Können wir das CRM auch ohne die FinTech-Schicht nutzen?',
      a: 'Selbstverständlich. Das CRM ist ein eigen­ständiges Produkt. Die Finanzanalyse-Schicht setzt darauf auf, ist aber optional. Sie können sie auch zwei Jahre später ergänzen, wenn der Bedarf entsteht — ohne Migration und ohne Mehrarbeit.'
    },
    {
      q: 'Was kostet das ungefähr?',
      a: 'Wir arbeiten mit Modul-Festpreisen statt Stunden­paketen. Ein vollständiges CRM-Projekt startet bei ca. 18.000&nbsp;€ einmalig, zuzüglich Hosting &amp; Wartung ab 280&nbsp;€/Monat. Die exakte, schriftliche Festpreis-Zusage bekommen Sie nach dem ersten Workshop — verbindlich.'
    },
    {
      q: 'Wo werden unsere Daten gespeichert?',
      a: 'Standardmäßig auf Servern in Frankfurt am Main, gehostet bei einem deutschen Provider. Wir schließen mit Ihnen einen Auftrags­verarbeitungs­vertrag nach Art.&nbsp;28 DSGVO ab. Auf Wunsch betreiben Sie das System komplett selbst — auch on-prem ist möglich.'
    },
    {
      q: 'Was passiert, wenn wir uns irgendwann trennen wollen?',
      a: 'Sie bekommen den vollständigen Quellcode, Datenbank-Dumps und das Schema. Kein Lock-in, kein Vendor-Drama. Wir helfen sogar gerne beim Onboarding eines neuen Dienst­leisters — denn wenn Sie zufrieden waren, war es kein schlechter Abschied.'
    },
    {
      q: 'Funktioniert das auch ohne eigene IT-Abteilung?',
      a: 'Ja. Wir übernehmen Wartung, Updates, Backups und das Monitoring im Rahmen der monatlichen Betreuung. Sie konzentrieren sich auf Ihr Geschäft, wir auf die Technik.'
    },
    {
      q: 'Können wir das System später selbst weiter­entwickeln?',
      a: 'Ja. Das Datenmodell ist dokumentiert, die Architektur klassisch (PostgreSQL + REST-API + Web-Frontend), und wir schulen Ihr Team gerne ein. Sie sind nicht abhängig von uns, sondern arbeiten optional mit uns weiter.'
    },
    {
      q: 'Migrieren Sie auch aus Salesforce, HubSpot oder DATEV Unternehmen Online?',
      a: 'Regelmäßig. Wir haben Migrations-Werkzeuge für die gängigen Standards inklusive Historien­übernahme und Roll-back-Möglichkeit. Datenverlust ist ausgeschlossen, weil wir Dual-Run fahren — beide Systeme laufen parallel, bis Sie zufrieden umstellen.'
    }
  ];

  let openIndex: number | null = 0;
  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }
</script>

<section id="faq" use:trackSection={'faq'} class="faq">
  <div class="container">
    <header class="head" use:reveal>
      <span class="eyebrow">Häufige Fragen</span>
      <h2>Bevor Sie anrufen.</h2>
      <p>Acht Antworten, die wir sonst im Erstgespräch wiederholen.</p>
    </header>

    <div class="list" use:reveal data-delay="1">
      {#each faqs as item, i}
        <div class="item" class:open={openIndex === i}>
          <button
            type="button"
            class="trigger"
            aria-expanded={openIndex === i}
            aria-controls="faq-answer-{i}"
            on:click={() => toggle(i)}
          >
            <span class="q">{item.q}</span>
            <span class="chev" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 6 L8 11 L13 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          {#if openIndex === i}
            <div id="faq-answer-{i}" class="answer" transition:slide={{ duration: 220 }}>
              <p>{@html item.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <p class="footnote" use:reveal data-delay="2">
      Frage nicht dabei? <a href="#contact">Schreiben Sie uns einfach</a>.
    </p>
  </div>
</section>

<style>
  .faq {
    background: linear-gradient(180deg, var(--color-bg-2) 0%, var(--color-bg) 100%);
  }

  .head {
    max-width: 640px;
    margin-bottom: 2rem;
  }
  .head p {
    color: var(--color-text-muted);
    font-size: 1.05rem;
  }

  .list {
    max-width: 880px;
    margin: 0 auto;
    border-top: 1px solid var(--color-line);
  }
  .item {
    border-bottom: 1px solid var(--color-line);
  }

  .trigger {
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 1.15rem 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font: inherit;
    color: var(--color-deep);
    transition: color var(--t-fast) var(--ease);
  }
  .trigger:hover {
    color: var(--color-tide);
  }

  .q {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: clamp(1rem, 1.6vw, 1.1rem);
    line-height: 1.4;
  }

  .chev {
    display: inline-grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--color-foam);
    color: var(--color-deep);
    transition: transform 280ms var(--ease),
      background var(--t-fast) var(--ease),
      color var(--t-fast) var(--ease);
    flex-shrink: 0;
  }
  .item.open .chev {
    transform: rotate(180deg);
    background: var(--color-deep);
    color: var(--color-cloud);
  }
  .chev svg {
    width: 14px;
    height: 14px;
  }

  .answer {
    padding: 0 0.5rem 1.2rem 0.5rem;
    color: var(--color-text-muted);
    max-width: 60em;
    line-height: 1.6;
  }
  .answer p {
    margin: 0;
  }

  .footnote {
    margin-top: 2rem;
    text-align: center;
    color: var(--color-text-muted);
    font-size: 0.95rem;
  }
  .footnote a {
    color: var(--color-deep);
    font-weight: 500;
    text-decoration: underline;
    text-decoration-color: var(--color-line);
    text-underline-offset: 3px;
  }
  .footnote a:hover {
    text-decoration-color: var(--color-deep);
  }
</style>
