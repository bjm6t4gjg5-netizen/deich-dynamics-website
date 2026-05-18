import '../app.css';
import ImpressumPage from './ImpressumPage.svelte';

const target = document.getElementById('app');
if (!target) throw new Error('#app container missing');

const app = new ImpressumPage({ target });

export default app;
