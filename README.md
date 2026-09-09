# panel-widget
Repositorio para Widget iOS

## Estructura

- **`tareas.json`** — datos (BTC, noticias, tiempo, vuelos). Se actualiza automáticamente.
- **`format-widget`** — el widget de Scriptable completo (fetch de datos + diseño + presentación).
- **`scriptable-loader.js`** — el único script que hay que pegar en la app Scriptable. En
  cada refresco descarga `format-widget` desde este repo y lo ejecuta al vuelo, así que
  un cambio de diseño en `format-widget` se aplica solo, sin volver a pegar nada en el
  móvil. Si cambias el diseño, solo hay que actualizar `format-widget` aquí.

## Formato de `tareas.json`

Actualizado por una tarea programada varias veces al día (horario objetivo:
7:00, 9:50, 11:50, 13:50, 17:50 y 19:50, hora de España). Reglas del campo `vuelos`:

- Cada destino se identifica por el **nombre de la ciudad** (no el código IATA), máximo 7 letras.
- Formato: `Ciudad 000€ Dmes Nd y Ciudad 000€ Dmes Nd`.
- `vuelos_verificado` siempre `false`: son precios "desde" de comparadores, no reservas confirmadas.
