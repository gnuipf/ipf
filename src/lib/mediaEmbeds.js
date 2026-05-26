const DIRECT_VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.ogg', '.ogv', '.mov', '.m4v']);

function toSafeUrl(value) {
  if (!value) return null;
  try {
    const parsed = new URL(String(value).trim());
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed;
  } catch {
    return null;
  }
}

function stripCommonSubdomain(hostname) {
  return hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '');
}

function youtubeIdFromPath(pathname, prefix) {
  const parts = pathname.split('/').filter(Boolean);
  const index = parts.indexOf(prefix);
  return index >= 0 ? parts[index + 1] : '';
}

function cleanYoutubeId(value) {
  const match = String(value ?? '').match(/^[a-zA-Z0-9_-]{6,}$/);
  return match ? match[0] : '';
}

function youtubeEmbed(url) {
  const host = stripCommonSubdomain(url.hostname);
  const isYoutubeHost = host === 'youtube.com' || host.endsWith('.youtube.com');
  let id = '';

  if (host === 'youtu.be') {
    id = url.pathname.split('/').filter(Boolean)[0] ?? '';
  }

  if (isYoutubeHost || host === 'youtube-nocookie.com') {
    id =
      url.searchParams.get('v') ??
      youtubeIdFromPath(url.pathname, 'embed') ??
      youtubeIdFromPath(url.pathname, 'shorts') ??
      '';
  }

  const cleanId = cleanYoutubeId(id);
  if (!cleanId) return null;

  return {
    type: 'iframe',
    src: `https://www.youtube-nocookie.com/embed/${cleanId}`,
    provider: 'youtube',
  };
}

function vimeoEmbed(url) {
  const host = stripCommonSubdomain(url.hostname);
  if (host !== 'vimeo.com' && host !== 'player.vimeo.com') return null;

  const parts = url.pathname.split('/').filter(Boolean);
  const videoIndex = parts.indexOf('video');
  const id =
    host === 'player.vimeo.com' && videoIndex >= 0
      ? parts[videoIndex + 1]
      : parts.find((part) => /^\d+$/.test(part));
  if (!id || !/^\d+$/.test(id)) return null;

  return {
    type: 'iframe',
    src: `https://player.vimeo.com/video/${id}`,
    provider: 'vimeo',
  };
}

function directVideoEmbed(url) {
  const lowerPath = url.pathname.toLowerCase();
  const hasVideoExtension = [...DIRECT_VIDEO_EXTENSIONS].some((extension) => lowerPath.endsWith(extension));
  if (!hasVideoExtension) return null;

  return {
    type: 'video',
    src: url.href,
    provider: 'direct',
  };
}

export function getVideoEmbedUrl(value) {
  const url = toSafeUrl(value);
  if (!url) return null;

  return youtubeEmbed(url) ?? vimeoEmbed(url) ?? directVideoEmbed(url);
}
