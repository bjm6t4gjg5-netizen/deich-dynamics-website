import '../app.css';
import DatenschutzPage from './DatenschutzPage.svelte';

const target = document.getElementById('app');
if (!target) throw new Error('#app container missing');

const app = new DatenschutzPage({ target });

export default app;
