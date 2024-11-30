import { Injectable } from '@angular/core';
import axios from 'axios';
import { Movie } from '../components/movies/movie/movie.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getAllMovies() {
    return axios.get<Movie[]>('http://localhost:8000/api/movies/');
  }

  createNewMovie(formData: FormData) {
    return axios.post('http://localhost:8000/api/movies/', formData);
  }

  getMovieById(id: string) {
    return axios.get<Movie>(`http://localhost:8000/api/movies/${id}`);
  }

  updateMovieById(id: string, formData: FormData) {
    return axios.put(`http://localhost:8000/api/movies/${id}/`, formData);
  }

  deleteMovieById(id: string) {
    return axios.delete(`http://localhost:8000/api/movies/${id}/`);
  }
}
