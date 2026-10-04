/* ==========================================================================
   PORTFOLIO
   --------------------------------------------------------------------------
   - `styles`: los filtros de la galería. El `id` se usa en cada tatuaje.
   - `portfolio`: los tatuajes. El orden del array = el orden en la galería.

   Campos de cada tatuaje:
     id      → identificador único (cualquier texto)
     src     → foto en /public/images/portfolio/ (o /public/images/artists/<id>/)
     alt     → descripción de la foto (SEO + accesibilidad)
     title   → nombre corto de la pieza (se ve en el lightbox)
     style   → id de un estilo de la lista `styles`
     artist  → id de un artista de src/data/artists.js
     size    → forma en la cuadrícula: 'sm' (1x1) · 'tall' (1x2) · 'wide' (2x1) · 'lg' (2x2)
     focal   → (opcional) punto de la foto que debe quedar visible, ej '50% 30%'
     story   → true si es una foto vertical tipo historia (9:16). No entra en el
               carrusel (todas las fotos se muestran en formato 4:5 y estas se
               deformarían); se siguen viendo en la ficha de su artista.

   Fotos: trabajos reales publicados en @noreplytattoo (sept. 2025 – sept. 2026).
   ========================================================================== */

export const styles = [
  { id: 'realismo', label: 'Realismo' },
  { id: 'microrrealismo', label: 'Microrrealismo' },
  { id: 'fine-line', label: 'Fine line' },
  { id: 'color', label: 'Color' },
]

export const portfolio = [
  { id: 'dvzf5jnchgc-0', src: '/images/portfolio/DVZF5jnCHGc_0.webp', alt: 'Manga realista en negro y gris con rostro de terror, primer premio de realismo en la Madriz Tattoo Convention', title: 'Premio de realismo', style: 'realismo', artist: 'diego-sacristan', size: 'lg' },
  { id: 'dq-x2zodq-a-0', src: '/images/portfolio/DQ_x2ZODQ_a_0.webp', alt: 'Cachorro de león en microrrealismo con corazón de línea fina en el antebrazo', title: 'Bebé leona', style: 'microrrealismo', artist: 'belen-perez', size: 'tall' },
  { id: 'duz-vpoid-b-3', src: '/images/portfolio/DUz-vpOiD_b_3.webp', alt: 'Manga floral de línea fina con nombre en lettering en el antebrazo', title: 'Floral con nombre', style: 'fine-line', artist: 'elena-calderon', size: 'tall' },
  { id: 'ddbbrckdlpg-0', src: '/images/portfolio/DdBbRckDLPg_0.webp', alt: 'Primera sesión de un brazo completo realista con leones en negro y gris', title: 'Leones', style: 'realismo', artist: 'carlos-gon', size: 'tall' },
  { id: 'dxfdlxmccmp-0', src: '/images/portfolio/DXFdLXmCCMp_0.webp', alt: 'Sirena en negro con sombreado fino en el brazo', title: 'Sirena', style: 'microrrealismo', artist: 'carla-limon', size: 'sm' },
  { id: 'dbfzl5roqat-0', src: '/images/portfolio/DbFzL5Roqat_0.webp', alt: 'Retrato realista de un dios griego en negro y gris', title: 'Dios griego', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dw1plkliak0-0', src: '/images/portfolio/DW1PLKLiAk0_0.webp', alt: 'Retrato de perro en microrrealismo con frase en el antebrazo', title: 'Mi estrella', style: 'microrrealismo', artist: 'belen-perez', size: 'sm' },
  { id: 'dbhb-t4owfk-0', src: '/images/portfolio/DbHB-t4owfk_0.webp', alt: 'Dinosaurio a color con corona de estilo pictórico', title: 'Dino con corona', style: 'color', artist: 'belen-perez', size: 'sm' },
  { id: 'dzdftj6o9yh-0', src: '/images/portfolio/DZDftJ6o9Yh_0.webp', alt: 'Retrato realista de mujer con tocado de tigre en el hombro', title: 'Guerrera tigre', style: 'realismo', artist: 'carlos-algobia', size: 'sm' },
  { id: 'dsfe7vhcnbp-0', src: '/images/portfolio/DSFe7vHCNBP_0.webp', alt: 'Espalda completa realista con la Virgen y el niño en negro y gris', title: 'Virgen y niño', style: 'realismo', artist: 'diego-sacristan', size: 'lg' },
  { id: 'dvtz1yximy5-0', src: '/images/portfolio/DVtz1yXiMy5_0.webp', alt: 'Pieza ornamental de línea fina con flores en el pecho', title: 'Ornamental de pecho', style: 'fine-line', artist: 'elena-calderon', size: 'tall' },
  { id: 'dx6amnuimo8-0', src: '/images/portfolio/DX6aMnuiMO8_0.webp', alt: 'Minotauro sentado en negro con sol de blackwork en el antebrazo', title: 'Minotauro', style: 'microrrealismo', artist: 'carla-limon', size: 'sm' },
  { id: 'dbt3awsob8f-0', src: '/images/portfolio/DbT3awSob8F_0.webp', alt: 'Casco de stormtrooper realista en la pierna', title: 'Stormtrooper', style: 'realismo', artist: 'carlos-gon', size: 'sm' },
  { id: 'dcbdddnimsi-0', src: '/images/portfolio/DcbdddnImSi_0.webp', alt: 'Elefante en microrrealismo en el antebrazo', title: 'Elefante', style: 'microrrealismo', artist: 'belen-perez', size: 'sm' },
  { id: 'dxoyewmioqy-0', src: '/images/portfolio/DXoYewmiOqy_0.webp', alt: 'Retrato realista de niña con un gran ojo y flores', title: 'Mirada', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'duz-vpoid-b-4', src: '/images/portfolio/DUz-vpOiD_b_4.webp', alt: 'Casete a color con acuarela arcoíris y lettering', title: 'Casete', style: 'color', artist: 'elena-calderon', size: 'tall' },
  { id: 'dvgfhjtikbr-0', src: '/images/portfolio/DVgFHjTiKBr_0.webp', alt: 'Tigre caminando en negro y gris en el antebrazo', title: 'Tigre', style: 'microrrealismo', artist: 'carla-limon', size: 'sm' },
  { id: 'dz4vqi-on-n-0', src: '/images/portfolio/DZ4vQi-oN-n_0.webp', alt: 'Monja demoníaca realista con rosario', title: 'Monja', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'ddcskk7ibdx-0', src: '/images/portfolio/DdCSKk7IbDx_0.webp', alt: 'Retrato de bulldog en microrrealismo con nombre', title: 'Horus', style: 'microrrealismo', artist: 'belen-perez', size: 'sm' },
  { id: 'dwl1q6cipaj-0', src: '/images/portfolio/DWl1Q6ciPAj_0.webp', alt: 'Composición con león, manos y geometría en el gemelo', title: 'Carpe diem', style: 'microrrealismo', artist: 'carlos-algobia', size: 'sm' },
  { id: 'duz-vpoid-b-1', src: '/images/portfolio/DUz-vpOiD_b_1.webp', alt: 'Marco ornamental barroco de línea fina en el abdomen', title: 'Marco barroco', style: 'fine-line', artist: 'elena-calderon', size: 'tall' },
  { id: 'dreg5t4clvz-0', src: '/images/portfolio/DReg5T4CLvz_0.webp', alt: 'Poseidón realista con tridente en el antebrazo', title: 'Poseidón', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'drpqzhcij-k-0', src: '/images/portfolio/DRpqZHCiJ_k_0.webp', alt: 'Ciervo en negro sobre círculo sólido en el gemelo', title: 'Ciervo', style: 'microrrealismo', artist: 'carla-limon', size: 'sm' },
  { id: 'dav8-4loyx9-0', src: '/images/portfolio/Dav8-4loyx9_0.webp', alt: 'Conejo en microrrealismo en el antebrazo', title: 'Conejo', style: 'microrrealismo', artist: 'belen-perez', size: 'sm' },
  { id: 'dxchfxnihod-0', src: '/images/portfolio/DXcHFXNiHod_0.webp', alt: 'Sagrado corazón de línea fina con rayos', title: 'Sagrado corazón', style: 'fine-line', artist: 'elena-calderon', size: 'sm' },
  { id: 'dxozrzicixo-0', src: '/images/portfolio/DXOZRzICIxO_0.webp', alt: 'Rostro de payaso realista con lettering', title: 'Payaso', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dyqco1echqa-0', src: '/images/portfolio/DYQCo1eCHqA_0.webp', alt: 'Tigre rugiendo con rama de cerezo en el hombro', title: 'Tigre y cerezo', style: 'microrrealismo', artist: 'belen-perez', size: 'tall' },
  { id: 'dbf0qjbofc--0', src: '/images/portfolio/DbF0QjboFc-_0.webp', alt: 'Ratón en microrrealismo en el antebrazo', title: 'Ratón', style: 'microrrealismo', artist: 'carla-limon', size: 'sm' },
  { id: 'dv1tnsucgoh-0', src: '/images/portfolio/DV1TNSuCGOH_0.webp', alt: 'Retrato realista de hombre con media cara de calavera', title: 'Media calavera', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dyxyiidiuf3-0', src: '/images/portfolio/DYxYIiDIUF3_0.webp', alt: 'Corazón anatómico y cerebro con alas y aureola', title: 'Corazón y cerebro', style: 'fine-line', artist: 'elena-calderon', size: 'sm' },
  { id: 'dvecws-cb-p-0', src: '/images/portfolio/DVEcWs-CB-P_0.webp', alt: 'Dos dragones enfrentados en el antebrazo', title: 'Dragones', style: 'microrrealismo', artist: 'belen-perez', size: 'sm' },
  { id: 'dtsdm0aip1i-0', src: '/images/portfolio/DTsDM0aiP1I_0.webp', alt: 'Joker realista en negro y gris en el brazo', title: 'Joker', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dt-c2pucbta-0', src: '/images/portfolio/DT_C2PUCBTa_0.webp', alt: 'Ornamental de puntos y línea fina en la mano', title: 'Ornamental en la mano', style: 'fine-line', artist: 'carla-limon', size: 'sm' },
  { id: 'dco9caoi4a1-0', src: '/images/portfolio/DcO9caOI4A1_0.webp', alt: 'Calavera y deidad en realismo oscuro', title: 'Calavera y deidad', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dunos3iinoy-0', src: '/images/portfolio/DUnOS3iiNOY_0.webp', alt: 'Pez de dibujos animados a color en el brazo', title: 'Pez', style: 'color', artist: 'belen-perez', size: 'sm' },
  { id: 'dvtiizecgco-0', src: '/images/portfolio/DVTiIzECGcO_0.webp', alt: 'Abanico con flores de línea fina en el brazo', title: 'Abanico', style: 'fine-line', artist: 'elena-calderon', size: 'sm' },
  { id: 'ddtr0b-owig-0', src: '/images/portfolio/DdTR0b-owiG_0.webp', alt: 'Cabeza de cabra en microrrealismo', title: 'Cabra', style: 'microrrealismo', artist: 'carla-limon', size: 'sm' },
  { id: 'dctcef4nda9-0', src: '/images/portfolio/DctCEf4NDa9_0.webp', alt: 'Serpiente realista enroscada en el brazo', title: 'Serpiente', style: 'realismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dr1u5-biia3-0', src: '/images/portfolio/DR1U5_BiIa3_0.webp', alt: 'Composición surrealista con ojo y figura en microrrealismo', title: 'Surrealista', style: 'microrrealismo', artist: 'belen-perez', size: 'sm' },
  { id: 'duz-vpoid-b-2', src: '/images/portfolio/DUz-vpOiD_b_2.webp', alt: 'Flor de loto y unalome de línea fina', title: 'Loto', style: 'fine-line', artist: 'elena-calderon', size: 'tall' },
  { id: 'dpguvbscagm-0', src: '/images/portfolio/DPGuVbSCAGM_0.webp', alt: 'Jarrón clásico con flores en línea fina', title: 'Jarrón floral', style: 'fine-line', artist: 'carla-limon', size: 'sm' },
  { id: 'dz7ukhjinv1-0', src: '/images/portfolio/DZ7UkhjINv1_0.webp', alt: 'Perro en microrrealismo en el brazo', title: 'Mascota', style: 'microrrealismo', artist: 'diego-sacristan', size: 'sm' },
  { id: 'dcyfuofo61e-0', src: '/images/portfolio/DcyFuOFo61E_0.webp', alt: 'Corazón formado por letras de línea fina', title: 'Corazón de letras', style: 'fine-line', artist: 'elena-calderon', size: 'sm' },
  { id: 'dpei6lbidsq-0', src: '/images/portfolio/DPeI6LBiDsQ_0.webp', alt: 'Mini tatuaje de corazones enlazados en línea fina', title: 'Corazones', style: 'fine-line', artist: 'belen-perez', size: 'sm' },
  { id: 'carlos-gon-04', src: '/images/artists/carlos-gon/04.webp', alt: 'Retrato realista de vikingo con barco en el hombro', title: 'Vikingo', style: 'realismo', artist: 'carlos-gon', size: 'tall', story: true },
  { id: 'carlos-algobia-01', src: '/images/artists/carlos-algobia/01.webp', alt: 'Rostro de mujer mitad calavera con composición surrealista', title: 'Dos caras', style: 'realismo', artist: 'carlos-algobia', size: 'tall', story: true },
  { id: 'carlos-gon-02', src: '/images/artists/carlos-gon/02.webp', alt: 'Cuervo realista en el costado', title: 'Cuervo', style: 'realismo', artist: 'carlos-gon', size: 'tall', story: true },
  { id: 'carlos-algobia-04', src: '/images/artists/carlos-algobia/04.webp', alt: 'Joker y Batman en un periódico realista en el antebrazo', title: 'Joker · Daily Planet', style: 'realismo', artist: 'carlos-algobia', size: 'tall', story: true },
  { id: 'carlos-gon-05', src: '/images/artists/carlos-gon/05.webp', alt: 'Rosa realista en negro y gris en la mano', title: 'Rosa en la mano', style: 'realismo', artist: 'carlos-gon', size: 'tall', story: true },
  { id: 'carlos-algobia-08', src: '/images/artists/carlos-algobia/08.webp', alt: 'Astronauta en negro y gris en el antebrazo', title: 'Astronauta', style: 'microrrealismo', artist: 'carlos-algobia', size: 'tall', story: true },
]
