import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';
import PostCard from '../components/PostCard.jsx';
import { POSTS_PAGE_SIZE, fetchPublishedPostsFeed } from '../services/postsApi.js';
import { POST_CATEGORY_OPTIONS } from '../lib/postCategory.js';
import './Home.css';

export default function Home() {
  const [feedPosts, setFeedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [period, setPeriod] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [feedNotice, setFeedNotice] = useState('');
  const [page, setPage] = useState(1);
  const [feedLoading, setFeedLoading] = useState(true);
  const [filterAnchorMs, setFilterAnchorMs] = useState(() => Date.now());
  const feedSectionRef = useRef(null);
  const skipScrollRef = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setFeedLoading(true);
      setFeedNotice('');
      const result = await fetchPublishedPostsFeed();
      if (cancelled) return;
      if (!result.ok) {
        setFeedNotice(result.error || 'Não foi possível carregar as postagens.');
        setFeedPosts([]);
        setFeedLoading(false);
        return;
      }
      setFeedPosts(result.posts);
      setFeedLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const minTs =
      period === 'last30'
        ? filterAnchorMs - 30 * 24 * 60 * 60 * 1000
        : period === 'currentYear'
          ? new Date(new Date(filterAnchorMs).getFullYear(), 0, 1).getTime()
          : 0;

    const filtered = feedPosts.filter((post) => {
      const matchesText =
        !normalized ||
        post.title.toLowerCase().includes(normalized) ||
        post.excerpt.toLowerCase().includes(normalized);
      if (!matchesText) return false;
      if (categoryFilter !== 'all' && post.category !== categoryFilter) return false;
      if (period === 'all') return true;
      const candidate = post.publishedAt || post.updatedAt;
      if (!candidate) return false;
      const ts = Date.parse(candidate);
      if (Number.isNaN(ts)) return false;
      return ts >= minTs;
    });

    const direction = sortBy === 'oldest' ? 1 : -1;
    return filtered.sort((a, b) => {
      const aTs = Date.parse(a.publishedAt || a.updatedAt || '');
      const bTs = Date.parse(b.publishedAt || b.updatedAt || '');
      const safeA = Number.isNaN(aTs) ? 0 : aTs;
      const safeB = Number.isNaN(bTs) ? 0 : bTs;
      return (safeA - safeB) * direction;
    });
  }, [feedPosts, searchTerm, period, sortBy, categoryFilter, filterAnchorMs]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const pagedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PAGE_SIZE;
    return filteredPosts.slice(start, start + POSTS_PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  function clearFilters() {
    setSearchTerm('');
    setPeriod('all');
    setSortBy('recent');
    setCategoryFilter('all');
    setFilterAnchorMs(Date.now());
    setPage(1);
  }

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    feedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const showPagination = totalPages > 1 && !feedLoading;

  const activeFilterCount = [
    searchTerm.trim(),
    period !== 'all',
    categoryFilter !== 'all',
    sortBy !== 'recent',
  ].filter(Boolean).length;

  return (
    <>
      <BannerCarousel />

      <section ref={feedSectionRef} className="posts-feed" id="posts-feed" aria-label="Postagens">
        {feedLoading ? (
          <p className="home-feed-loading">A carregar…</p>
        ) : (
          <>
            {feedNotice ? <p className="home-notice">{feedNotice}</p> : null}
            {!feedNotice ? (
              <>
                <div className="home-filters-toggle-wrap">
                  <button
                    type="button"
                    className="home-filters-toggle"
                    aria-expanded={filtersOpen}
                    aria-controls="home-post-filters"
                    onClick={() => setFiltersOpen((open) => !open)}
                  >
                    {filtersOpen ? 'Ocultar filtros' : 'Filtrar postagens'}
                    {activeFilterCount > 0 ? (
                      <span className="home-filters-badge">{activeFilterCount}</span>
                    ) : null}
                  </button>
                </div>
                <div
                  id="home-post-filters"
                  className={`home-filters${filtersOpen ? ' is-open' : ''}`}
                >
                  <label className="home-filter-field home-filter-field--search">
                    <span className="home-filter-label">Buscar</span>
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Digite título ou resumo..."
                    />
                  </label>
                  <label className="home-filter-field">
                    <span className="home-filter-label">Ordenação</span>
                    <select
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="recent">Mais recentes</option>
                      <option value="oldest">Mais antigos</option>
                    </select>
                  </label>
                  <label className="home-filter-field">
                    <span className="home-filter-label">Período</span>
                    <select
                      value={period}
                      onChange={(e) => {
                        setPeriod(e.target.value);
                        setFilterAnchorMs(Date.now());
                        setPage(1);
                      }}
                    >
                      <option value="all">Todos</option>
                      <option value="last30">Últimos 30 dias</option>
                      <option value="currentYear">Ano atual</option>
                    </select>
                  </label>
                  <label className="home-filter-field">
                    <span className="home-filter-label">Categoria</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="all">Todas as categorias</option>
                      {POST_CATEGORY_OPTIONS.filter((o) => o.value !== 'standard').map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="home-filters-actions">
                    <button type="button" className="home-filter-clear" onClick={clearFilters}>
                      Limpar filtros
                    </button>
                  </div>
                </div>
              </>
            ) : null}
            {!feedNotice && !feedLoading ? (
              <p className="home-feed-meta" aria-live="polite">
                {filteredPosts.length === 0
                  ? 'Nenhum resultado'
                  : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'postagem' : 'postagens'}`}
                {activeFilterCount > 0 ? ' com os filtros aplicados' : ''}
              </p>
            ) : null}
            {!feedNotice && pagedPosts.length === 0 ? (
              <p className="home-feed-empty">Nenhuma postagem encontrada para os filtros selecionados.</p>
            ) : (
              <div className="posts posts--feed">
                {pagedPosts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    onSelect={(slug) => navigate(`/post/${slug}`)}
                  />
                ))}
              </div>
            )}
            {showPagination ? (
              <div className="home-pagination" role="navigation" aria-label="Paginação">
                <button
                  type="button"
                  className="home-pagination-btn"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </button>
                <span className="home-pagination-info">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  type="button"
                  className="home-pagination-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Seguinte
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
