import PostBody from './PostBody.jsx';
import '../pages/StaticPage.css';

/**
 * @param {{ title: string, markdown: string }} props
 */
export default function StaticPage({ title, markdown }) {
  return (
    <article className="static-page">
      <h1 className="static-page-title cinzel">{title}</h1>
      <div className="static-page-content">
        <PostBody markdown={markdown} />
      </div>
    </article>
  );
}
