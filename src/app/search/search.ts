import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { TmdbMovie } from '../movie';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-search',
  styleUrl: './search.scss',
  templateUrl: './search.html',
})
export class Search {
  private movieService = inject(MovieService);
  movies = toSignal(this.movieService.getTrending().pipe(map(r => r.results)),{
    initialValue: [] as TmdbMovie[]
  });
}
