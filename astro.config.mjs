// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  site: 'https://leddisplays.co.za',
  output: 'static',
  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  // The Node adapter rewrites request.url to http://localhost, so Astro's
  // origin check cannot work here. /api/enquiry performs its own host check.
  security: {
    checkOrigin: false,
  },
  vite: {
    server: {
      allowedHosts: ['.e2b.app'],
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
