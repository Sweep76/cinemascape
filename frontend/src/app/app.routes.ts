import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './components/movies/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movies/:movieId',
    component: MovieDetailComponent,
  },
];
