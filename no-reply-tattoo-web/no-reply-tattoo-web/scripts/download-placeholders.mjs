/* Descarga las fotos de placeholder (Unsplash) a public/images/ para servirlas
   desde tu propio dominio en lugar del CDN. Uso:  npm run images:download

   Después cambia las rutas en src/data/*.js por las locales que imprime el script
   (o, mejor, sustitúyelas directamente por las fotos reales del estudio). */

import { mkdir, writeFile } from 'node:fs/promises'
import { images } from '../src/data/images.js'
import { portfolio } from '../src/data/portfolio.js'
import { artists } from '../src/data/artists.js'
import { content } from '../src/data/content.js'

const list = [
  ...Object.entries(images).map(([k, v]) => [k === 'hero' ? 'hero' : 'misc', k, v.src]),
  ...portfolio.map((p) => ['portfolio', p.id, p.src]),
  ...artists.map((a) => ['artists', a.id, a.image.src]),
  ...content.studio.tour.map((s, i) => ['studio', `tour-${i + 1}`, s.image.src]),
].filter(([, , src]) => src.startsWith('https://images.unsplash.com/'))

for (const [folder, name, src] of list) {
  const url = `${src}?auto=format&fm=webp&fit=max&w=1800&q=78`
  const dir = new URL(`../public/images/${folder}/`, import.meta.url)
  await mkdir(dir, { recursive: true })
  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`✗ ${name}: ${res.status}`)
    continue
  }
  await writeFile(new URL(`${name}.webp`, dir), Buffer.from(await res.arrayBuffer()))
  console.log(`✓ /images/${folder}/${name}.webp`)
}
