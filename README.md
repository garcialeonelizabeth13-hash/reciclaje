# Observatorio ISDE - Frontend

Aplicación Vue 3 + TypeScript para el Observatorio de Contenidos ISDE.

## Estructura del Proyecto

```
src/
├── App.vue                 # Componente raíz
├── main.ts                 # Punto de entrada
├── router/
│   └── index.ts           # Configuración de rutas
├── views/
│   └── HomeView.vue       # Página principal
├── components/            # Componentes reutilizables
├── services/              # Servicios de API
│   ├── api.ts            # Cliente HTTP
│   ├── articles.ts       # Servicio de artículos
│   ├── categories.ts     # Servicio de categorías
│   └── stats.ts          # Servicio de estadísticas
├── types/
│   └── index.ts          # Tipos TypeScript
├── stores/               # Estado global (Pinia)
├── composables/          # Composables reutilizables
└── assets/               # Activos estáticos
```

## Instalación

```bash
npm install
```

## Configuración

1. Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

2. Actualiza `VITE_API_URL` con la URL de tu backend

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de la compilación
- `npm run type-check` - Verifica tipos TypeScript
- `npm run lint` - Ejecuta linter

## API Endpoints

El frontend se conecta a los siguientes endpoints del backend:

### Artículos

- `GET /articles` - Lista de artículos
- `GET /articles/:id` - Artículo por ID
- `GET /articles/category/:categoryId` - Artículos por categoría
- `GET /articles/featured/list` - Artículos destacados
- `GET /articles/search/:query` - Buscar artículos

### Categorías

- `GET /categories` - Lista de categorías
- `GET /categories/:id` - Categoría por ID

### Estadísticas

- `GET /stats/overview` - Estadísticas generales
- `GET /stats/content/popular` - Contenido popular
- `GET /stats/content/recent` - Contenido reciente
- `GET /stats/categories/activity` - Actividad por categoría
- `GET /stats/database/health` - Salud de la base de datos

## Tecnologías

- Vue 3
- TypeScript
- Vue Router
- Pinia (State Management)
- Vite

## Licencia

ISDE 2024
