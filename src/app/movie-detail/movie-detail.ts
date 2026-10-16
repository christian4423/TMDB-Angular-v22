import { Component, computed, Inject, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TmdbMovieDetail } from '../movie';
import { WatchlistStore } from '../watchlist-store';

@Component({
  imports: [RouterLink, DecimalPipe, CurrencyPipe],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.scss',
  templateUrl: './movie-detail.html',
})
export class MovieDetail {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  readonly imageBase = 'https://image.tmdb.org/t/p';
  store = inject(WatchlistStore)
  // undefined = loading, null = failed to load
  movie = toSignal<TmdbMovieDetail | null>(
    this.route.paramMap.pipe(
      map(p => Number(p.get('id'))),
      switchMap(id => this.movieService.getMovie(id).pipe(catchError(() => of(null))))
    )
  );

  releaseYear = computed(() => this.movie()?.release_date?.slice(0, 4) ?? '');

  runtime = computed(() => {
    const minutes = this.movie()?.runtime;
    if (!minutes) {
      return '';
    }
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h ? `${h} hr ${m} min` : `${m} min`;
  });

  topCast = computed(() => this.movie()?.credits?.cast.slice(0, 8) ?? []);
  onList = computed(() => this.store.items().some(m => m.id === this.movie()?.id));

  toggleList() {
    const m = this.movie();
    if (!m) return;
    this.onList() ? this.store.remove(m.id) : this.store.add(m);
  }
  
  language = computed(() => {
    const code = this.movie()?.original_language;
    if (!code) {
      return '';
    }
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) ?? code;
  });
}
