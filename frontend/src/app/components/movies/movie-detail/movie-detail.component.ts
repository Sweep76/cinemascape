import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';

import { DialogModule } from 'primeng/dialog';

import { ApiService } from '../../../services/api.service';
import { Movie } from '../movie/movie.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, DialogModule],
  templateUrl: './movie-detail.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog-header {
        padding: 8px;
        background-color: #132131;
        color: white;
      }
      :host ::ng-deep .p-dialog-content {
        padding: 16px;
        background-color: #132131;
      }
    `,
  ],
})
export class MovieDetailComponent {
  @Input({ required: true }) movieId!: string;
  movie: Movie | undefined = undefined;
  visible = false;
  constructor(private moviesApiService: ApiService) {}

  ngOnInit() {
    this.fetchMovie();
  }

  fetchMovie() {
    let splittedId = this.movieId.split('-');

    this.moviesApiService
      .getMovieById(splittedId[splittedId.length - 1])
      .then((response) => {
        this.movie = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formatDateCreated() {
    return format(this.movie?.created_at!, 'LLLL dd, y');
  }

  getMovieUrl(): string {
    return this.movie?.image_url
      ? this.movie.image_url
      : 'assets/images/movie-placeholder.jpg';
  }

  onPlayMovie() {
    this.visible = !this.visible;
  }
}
