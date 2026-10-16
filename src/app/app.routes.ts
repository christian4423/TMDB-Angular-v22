import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./watchlist/watchlist').then(m => m.Watchlist) },
    { path: 'search', loadComponent: () => import('./search/search').then(m => m.Search) },
    { path: 'movie/:id', loadComponent: ()=> import('./movie-detail/movie-detail').then(m => m.MovieDetail)}
];
