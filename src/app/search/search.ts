import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { TmdbMovie } from '../movie';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { WatchlistStore } from '../watchlist-store';

@Component({
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  selector: 'app-search',
  styleUrl: './search.scss',
  templateUrl: './search.html',
})
export class Search {
  private movieService = inject(MovieService);
  store = inject(WatchlistStore) 

  searchControl = new FormControl('', { nonNullable: true })

  // movies = toSignal(this.movieService.getTrending().pipe(map(r => r.results)),{
  //   initialValue: [] as TmdbMovie[]
  // });
  movies = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(q =>
        q.trim()
          ? this.movieService.searchMovies(q)
          : this.movieService.getTrending().pipe(map(r => r.results))
      )
    ),
    { initialValue: [] as TmdbMovie[] },
  )
}
