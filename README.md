# TMDB Watchlist (Angular 22)

A small movie watchlist app built on [The Movie Database (TMDB) API](https://developer.themoviedb.org/). It's a portfolio project to show modern Angular patterns, and it's still being built in phases (see [Roadmap](#roadmap)).

## Features

- **Watchlist**: track movies and mark them as watched. A live count of watched movies is computed from the list.
- **Search / Trending**: browse this week's trending movies from TMDB.
- **Movie details**: poster, backdrop, tagline, runtime, rating, genres, budget/revenue, original language, and the top-billed cast. TMDB's `append_to_response` returns the credits in the same request as the details.

## Angular concepts used

| Concept | Where |
| --- | --- |
| Standalone components (no NgModules) | All components |
| Signals: `signal`, `computed`, `update` | [watchlist.ts](src/app/watchlist/watchlist.ts), [movie-detail.ts](src/app/movie-detail/movie-detail.ts) |
| RxJS ↔ signals with `toSignal` | [search.ts](src/app/search/search.ts), [movie-detail.ts](src/app/movie-detail/movie-detail.ts) |
| Route params → HTTP with `switchMap` (cancels stale requests) | [movie-detail.ts](src/app/movie-detail/movie-detail.ts) |
| Lazy-loaded routes via `loadComponent` | [app.routes.ts](src/app/app.routes.ts) |
| Built-in control flow (`@if`, `@for`, `@else`) | All templates |
| `inject()` function-based DI | Components and [movie.service.ts](src/app/movie.service.ts) |
| Typed `HttpClient` service, `providedIn: 'root'` | [movie.service.ts](src/app/movie.service.ts) |
| Built-in pipes (`number`, `currency`) | [movie-detail.html](src/app/movie-detail/movie-detail.html) |
| Loading / error states without extra flags (`undefined` = loading, `null` = error) | [movie-detail.ts](src/app/movie-detail/movie-detail.ts) |
| Unit tests with Vitest, mocked DI providers, and keyboard interaction tests | `*.spec.ts` next to each component |

## Accessibility

- Each watchlist item is a custom checkbox (`role="checkbox"` with `aria-checked`) that's labelled with the movie title. You can tab to it and toggle it with **Enter**, **Space**, or a click. Unit tests cover the keyboard behavior.
- The movie details page uses semantic landmarks: an `article` and labelled `section`s with a proper heading order (`h1` → `h2`).
- Facts use lists, and details use a description list (`dl`), so screen readers announce them as structured data.
- The poster has descriptive `alt` text. Cast photos and the backdrop are decorative, so they have an empty `alt` or `aria-hidden`.
- Emoji used as decoration are hidden from assistive tech.
- Loading uses `role="status"` and errors use `role="alert"`, so both are announced.
- External links say "(opens in a new tab)" with visually hidden text.
- Links and watchlist items have a visible `:focus-visible` outline.

## Getting started

**Prerequisites:** Node.js 22.22+, 24.15+, or 26+ and a free [TMDB API key](https://www.themoviedb.org/settings/api).

```bash
npm install
```

The development API key file is git-ignored, so you need to create it yourself at `src/environments/environment.development.ts`:

```ts
export const environment = { tmdb: 'YOUR_TMDB_API_KEY' };
```

Then:

```bash
npm start        # dev server at http://localhost:4200
npm test         # unit tests (Vitest)
npm run build    # production build to dist/
```

## Project structure

```
src/app/
├── app.routes.ts        # lazy-loaded routes
├── movie.service.ts     # TMDB HTTP calls
├── movie.ts             # domain + TMDB API types
├── watchlist/           # watchlist with watched toggling
├── search/              # trending movies grid
└── movie-detail/        # full details for one movie (/movie/:id)
```

## Roadmap

This project is being built in phases:

- [x] **Phase 1**: Watchlist with signals, routing, TMDB trending, and movie details
- [ ] **Next phases**: remaining features in progress

## Notes

- The TMDB key is used in the browser. That's fine for a demo, but a production app would send requests through a backend so the key stays private.
- This product uses the TMDB API but is not endorsed or certified by TMDB.
