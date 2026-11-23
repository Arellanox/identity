# CV interactivo — Josué de la Cruz Arellano

Sitio estático construido con HTML, CSS y JavaScript. Está preparado para publicarse directamente en GitHub Pages, sin Node.js, compilación ni servidor.

## Estructura

- `index.html`: contenido y estructura del CV.
- `styles.css`: identidad visual, diseño adaptable y modo oscuro.
- `script.js`: navegación, animaciones, tema, copia de correo y exportación PDF.

## Librerías utilizadas

- Bootstrap 5.3.3: cuadrícula y navegación adaptable.
- AOS 2.3.4: animaciones al desplazarse.
- Lucide: iconos SVG.
- html2pdf.js 0.10.2: exportación del CV a PDF.
- Google Fonts: tipografías Manrope y DM Sans.

Las librerías se cargan desde CDN. Se necesita conexión a internet para que carguen correctamente. El contenido principal seguirá visible si una librería de animación no está disponible.

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `cv-josue-arellano`.
2. Descomprime este proyecto y sube `index.html`, `styles.css`, `script.js` y `README.md` a la raíz del repositorio.
3. En GitHub, abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda. GitHub mostrará la dirección pública del sitio cuando termine el despliegue.

La URL tendrá un formato parecido a:
`https://TU-USUARIO.github.io/cv-josue-arellano/`

## Personalización

- Cambia teléfono y correo en `index.html` y en `script.js` (función de copiar correo).
- Ajusta texto, fechas y responsabilidades directamente en `index.html`.
- Modifica colores y estilos en `styles.css`.
- Las barras de habilidades usan `data-level` en cada elemento `.skill`.
- Para quitar o cambiar una librería, revisa los enlaces CDN al final de `index.html`.

## Antes de publicar

Verifica nombres oficiales de empresas, fechas, denominación exacta de los títulos y cualquier descripción de responsabilidades. No se agregaron números de cédula ni datos personales adicionales.
