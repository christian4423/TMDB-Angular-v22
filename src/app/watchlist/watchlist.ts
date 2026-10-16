import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie, TmdbMovie, WatchItem } from '../movie';
import { WatchlistStore } from '../watchlist-store';

@Component({
  imports: [RouterLink],
  selector: 'app-watchlist',
  styleUrl: './watchlist.scss',
  templateUrl: './watchlist.html',
})
export class Watchlist {
  store = inject(WatchlistStore)
  movies = this.store.items

  watchedCount = computed(() => this.movies().filter(movie => movie.watched).length)
  toggleWatched(id: number) {
    this.store.toggleWatched(id)
  }
}
