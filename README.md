# panel-widget
Repositorio para Widget iOS

## Formato de `tareas.json`

Actualizado por una tarea programada varias veces al día (horario objetivo:
7:00, 9:50, 11:50, 13:50, 17:50 y 19:50, hora de España). Reglas del campo `vuelos`:

- Cada destino se identifica por el **nombre de la ciudad** (no el código IATA), máximo 7 letras.
- Formato: `Ciudad 000€ Dmes Nd y Ciudad 000€ Dmes Nd`.
- `vuelos_verificado` siempre `false`: son precios "desde" de comparadores, no reservas confirmadas.
