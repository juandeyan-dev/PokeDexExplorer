# PokéDex Explorer

PokéDex Explorer es una aplicación móvil desarrollada con React Native y Expo.

La aplicación consume la [PokéAPI](https://pokeapi.co/) para mostrar una lista de Pokémon, permitir búsquedas por nombre o número y consultar el detalle de cada Pokémon.

## Funcionalidades principales

- Lista inicial de 20 Pokémon.
- Scroll infinito para cargar más Pokémon disponibles.
- Búsqueda por nombre o número (que sean valores exactos).
- Tarjetas con imagen, número y nombre.
- Vista detallada de cada Pokémon.
- Tipos con colores diferenciados.
- Altura y peso convertidos a metros y kilogramos.
- Estadísticas base con barras proporcionales.
- Estados de carga, error y sin resultados.

## Requisitos

- Node.js instalado.
- npm instalado.
- Expo Go en un dispositivo móvil, o un emulador Android/iOS.
- Conexión a internet para consultar la PokéAPI.

## Instalación

Clona el repositorio y entra a la carpeta del proyecto:

```bash
git clone https://github.com/juandeyan-dev/PokeDexExplorer.git
cd PokeDexExplorer

npm install

npx expo start

a || i