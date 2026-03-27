import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://nourischw.github.io',
  base: '/ch-daily-report',
  build: {
    assets: 'assets'
  }
});
