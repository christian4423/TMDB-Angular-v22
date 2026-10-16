import { Component } from '@angular/core';
import { signal, computed } from '@angular/core';
import { Movie } from '../movie';

@Component({
  imports: [],
  selector: 'app-watchlist',
  styleUrl: './watchlist.scss',
  templateUrl: './watchlist.html',
})
export class Watchlist {
   movies = signal<Movie[]>([
     {id: 1, title: 'Movie 1', releaseDate: '2024-01-01', rating: 5, watched: false},
     {id: 2, title: 'Movie 2', releaseDate: '2024-02-01', rating: 4, watched: true},
     {id: 3, title: 'Movie 3', releaseDate: '2024-03-01', rating: 3, watched: false}
  ])

  watchedCount = computed(() => this.movies().filter(movie => movie.watched).length)

  toggleWatched(event: KeyboardEvent | MouseEvent, id: number) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter') {
      return;
    }
    this.movies.update(movies => 
      movies.map(movie => movie.id === id ? {...movie, watched: !movie.watched} : movie)
    );
  }
}
