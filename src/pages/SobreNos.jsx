import StaticPage from '../components/StaticPage.jsx';
import { SOBRE_NOS_MARKDOWN } from '../content/staticPages.js';

export default function SobreNos() {
  return <StaticPage title="Sobre nós" markdown={SOBRE_NOS_MARKDOWN} />;
}
