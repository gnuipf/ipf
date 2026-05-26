import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSanitize from 'rehype-sanitize';
import { getVideoEmbedUrl } from '../lib/mediaEmbeds.js';
import './PostBody.css';

function linkProps(href) {
  if (!href || !/^https?:\/\//i.test(href)) {
    return {};
  }
  return { target: '_blank', rel: 'noopener noreferrer' };
}

function nodeText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  if (!Array.isArray(node.children)) return '';
  return node.children.map(nodeText).join('');
}

function loneLinkFromParagraph(node) {
  const children = Array.isArray(node?.children) ? node.children : [];
  const meaningfulChildren = children.filter((child) => child.type !== 'text' || child.value.trim() !== '');
  if (meaningfulChildren.length !== 1) return null;

  const child = meaningfulChildren[0];
  if (child.type !== 'element' || child.tagName !== 'a') return null;

  const href = child.properties?.href;
  const embed = getVideoEmbedUrl(href);
  if (!embed) return null;

  return {
    embed,
    label: nodeText(child).trim() || 'Video',
  };
}

function PostVideo({ embed, label }) {
  if (embed.type === 'video') {
    return (
      <figure className="post-video-embed">
        <video className="post-video-player" controls preload="metadata">
          <source src={embed.src} />
        </video>
      </figure>
    );
  }

  return (
    <figure className="post-video-embed">
      <iframe
        className="post-video-player"
        src={embed.src}
        title={label}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </figure>
  );
}

export default function PostBody({ markdown }) {
  return (
    <div className="post-body-md">
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          p: ({ node, children, ...rest }) => {
            const video = loneLinkFromParagraph(node);
            if (video) return <PostVideo embed={video.embed} label={video.label} />;
            return <p {...rest}>{children}</p>;
          },
          a: ({ href, children, ...rest }) => (
            <a href={href} {...rest} {...linkProps(href)} className="content-link">
              {children}
            </a>
          ),
          img: ({ alt, src, ...rest }) => (
            <img className="post-body-image" src={src} alt={alt ?? ''} loading="lazy" {...rest} />
          ),
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
