<script lang="ts">
  import { onMount } from 'svelte';
  import Nav from './lib/Nav.svelte';
  import Hero from './lib/Hero.svelte';
  import About from './lib/About.svelte';
  import Insights from './lib/Insights.svelte';
  import Services from './lib/Services.svelte';
  import Manifest from './lib/Manifest.svelte';
  // Vorübergehend ausgeblendet — Inhalt noch nicht ausgereift. Import bewusst beibehalten,
  // damit die Komponenten beim Bundling weiter geprüft werden (Tree-Shaking entfernt sie aus dem Build).
  // import Approach from './lib/Approach.svelte';
  // import References from './lib/References.svelte';
  // import Team from './lib/Team.svelte';
  import Faq from './lib/Faq.svelte';
  import Contact from './lib/Contact.svelte';
  import Footer from './lib/Footer.svelte';
  import CursorGlow from './lib/CursorGlow.svelte';
  import { initInteractionListeners } from './lib/stores';

  onMount(() => {
    initInteractionListeners();
  });
</script>

<CursorGlow />
<Nav />

<main>
  <Hero />
  <About />
  <Insights />
  <Services />
  <Manifest />
  <!-- Ausgeblendet: <Approach /> -->
  <!-- Ausgeblendet: <References /> -->
  <Faq />
  <!-- Ausgeblendet: <Team /> -->
  <Contact />
  <!-- Legal komplett auf /impressum.html und /datenschutz.html ausgelagert -->
</main>

<Footer />

<style>
  main {
    position: relative;
    z-index: 1;
  }
</style>
