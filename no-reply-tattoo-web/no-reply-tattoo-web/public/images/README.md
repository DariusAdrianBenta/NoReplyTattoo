# Fotografías del estudio

Coloca aquí las fotos reales. Todo lo que hay en `public/` se publica tal cual,
así que una foto en `public/images/portfolio/rosa.webp` se usa como `/images/portfolio/rosa.webp`.

| Carpeta       | Qué va dentro                         | Dónde se enlaza                    |
|---------------|---------------------------------------|------------------------------------|
| `hero/`       | Foto de portada (horizontal, grande)  | `src/data/images.js` → `hero`      |
| `portfolio/`  | Tatuajes                              | `src/data/portfolio.js`            |
| `artists/`    | Retratos de los artistas              | `src/data/artists.js`              |
| `studio/`     | Fotos del espacio, máquinas, detalles | `src/data/content.js` → `studio.tour` y `src/data/images.js` |
| `misc/`       | Logo, otras imágenes                  | Donde las uses                     |

## Recomendaciones

- Formato **WebP** (o AVIF), calidad 75–82.
- Lado largo: **2000 px** para el hero, **1400 px** para el resto.
- Peso orientativo: < 400 KB (hero < 600 KB).
- Sin marcas de agua, y con el permiso del cliente para publicar su tatuaje.
- Nombres en minúsculas y sin espacios: `blackwork-espalda-01.webp`.

Para convertir en lote puedes usar [Squoosh](https://squoosh.app) (web) o:

```bash
npx @squoosh/cli --webp '{"quality":80}' --resize '{"width":1400}' fotos/*.jpg
```
