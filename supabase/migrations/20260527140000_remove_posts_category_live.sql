-- Remove categoria editorial LIVE dos posts

update public.posts
set category = 'standard'
where category = 'live';

alter table public.posts
  drop constraint if exists posts_category_check;

alter table public.posts
  add constraint posts_category_check
  check (
    category in (
      'standard',
      'launch_review',
      'classic_review',
      'event_coverage',
      'interview'
    )
  );

comment on column public.posts.category is
  'Editorial: standard | launch_review | classic_review | event_coverage | interview';
