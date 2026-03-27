import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://nourischw.github.io/Daily-report',
  base: '/Daily-report/',
  output: 'static',
  trailingSlash: 'never',
});
