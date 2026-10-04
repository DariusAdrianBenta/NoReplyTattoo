import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/data/site.js'
import { buildHead, buildRobots, buildSitemap } from './src/seo/buildHead.js'

/**
 * Plugin SEO: genera <title>, metas, Open Graph, Schema.org (TattooParlor),
 * robots.txt y sitemap.xml a partir de src/data/site.js.
 * Así toda la información del estudio vive en un único archivo.
 */
function seoPlugin() {
  return {
    name: 'no-reply-seo',
    transformIndexHtml(html) {
      return html.replace('<!--app-head-->', buildHead(site))
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobots(site) })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(site) })
    },
  }
}

export default defineConfig({
  plugins: [react(), seoPlugin()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
  },
})
