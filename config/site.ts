export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'projeto imdb',
  description: '.',
  navItems: [
    {
      label: 'filmes',
      href: '/filmes',
    },

    {
      label: 'login',
      href: '/',
    },
  ],
  navMenuItems: [],
};
