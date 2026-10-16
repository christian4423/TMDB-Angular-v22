import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { TmdbMovie } from "./movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private http = inject(HttpClient);
    private base = 'https://api.themoviedb.org/3';

    getTrending() {
        return this.http.get<{ results: TmdbMovie[] }>(`${this.base}/trending/movie/week?api_key=${environment.tmdb}`);
    }

    getMovie(id: number) {
        return this.http.get<TmdbMovie>(`${this.base}/movie/${id}?api_key=${environment.tmdb}`);
    }
}