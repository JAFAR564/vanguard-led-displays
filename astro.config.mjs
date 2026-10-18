import { defineConfig, passthroughImageService } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

const isVercel = Boolean(process.env.VERCEL);

export default defineConfig({
  output: 'static',
  adapter: isVercel
    ? vercel()
    : node({
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
  vite: {
    server: {
      watch: {
        ignored: ['**/.vercel/**', '**/data/**', '**/*.raw.mp4']
      }
    }
  }
});
