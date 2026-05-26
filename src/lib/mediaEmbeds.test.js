import { describe, expect, it } from 'vitest';
import { getVideoEmbedUrl } from './mediaEmbeds.js';

describe('getVideoEmbedUrl', () => {
  it('gera embed seguro para YouTube', () => {
    expect(getVideoEmbedUrl('https://youtu.be/dQw4w9WgXcQ')).toEqual({
      type: 'iframe',
      src: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      provider: 'youtube',
    });
  });

  it('gera embed para Vimeo', () => {
    expect(getVideoEmbedUrl('https://vimeo.com/123456789')).toEqual({
      type: 'iframe',
      src: 'https://player.vimeo.com/video/123456789',
      provider: 'vimeo',
    });
  });

  it('aceita videos diretos por extensao', () => {
    expect(getVideoEmbedUrl('https://cdn.example.com/live/session.mp4?token=abc')).toEqual({
      type: 'video',
      src: 'https://cdn.example.com/live/session.mp4?token=abc',
      provider: 'direct',
    });
  });

  it('rejeita protocolos inseguros e links comuns', () => {
    expect(getVideoEmbedUrl('javascript:alert(1)')).toBeNull();
    expect(getVideoEmbedUrl('https://example.com/not-a-video')).toBeNull();
  });
});
