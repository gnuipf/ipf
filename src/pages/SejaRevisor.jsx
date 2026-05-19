import StaticPage from '../components/StaticPage.jsx';
import { SEJA_REVISOR_MARKDOWN } from '../content/staticPages.js';

export default function SejaRevisor() {
  return <StaticPage title="Seja revisor" markdown={SEJA_REVISOR_MARKDOWN} />;
}
