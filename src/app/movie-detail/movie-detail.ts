import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { TmdbMovie } from '../movie';

@Component({
  imports: [],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.scss',
  templateUrl: './movie-detail.html',
})
export class MovieDetail {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = toSignal<TmdbMovie>(
    this.route.paramMap.pipe(
      map(p => Number(p.get('id'))),
      switchMap(id => this.movieService.getMovie(id))
    )
  );
}
