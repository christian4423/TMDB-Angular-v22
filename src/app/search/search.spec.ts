import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Search } from './search';
import { MovieService } from '../movie.service';

describe('Search', () => {
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    const movieService = {
      getTrending: () => of({
        results: [{ id: 42, title: 'Test Movie', release_date: '2024-05-01', poster_path: null, overview: '' }],
      }),
    };

    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [provideRouter([]), { provide: MovieService, useValue: movieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    await fixture.whenStable();
  });

  it('should link each trending movie to its detail page', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');
    expect(link?.textContent).toContain('Test Movie');
    expect(link?.getAttribute('href')).toBe('/movie/42');
  });
});
