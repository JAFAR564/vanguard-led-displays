import { defineConfig, passthroughImageService } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  security: {
    checkOrigin: false,
  },
  image: {
    service: passthroughImageService(),
  },
  site: 'https://leddisplays.co.za',
  trailingSlash: 'ignore',
  compressHTML: true,
});
