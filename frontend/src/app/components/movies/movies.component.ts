import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MovieComponent } from './movie/movie.component';
import { Movie } from './movie/movie.model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieComponent],
  templateUrl: './movies.component.html',
})
export class MoviesComponent {
  @Input({ required: true }) movies!: Movie[];
  @Output() movieReFetch = new EventEmitter<void>();

  onMovieReFetch() {
    this.movieReFetch.emit();
  }
}
