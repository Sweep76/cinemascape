import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { MoviesComponent } from '../components/movies/movies.component';
import { ApiService } from '../services/api.service';
import { Movie } from '../components/movies/movie/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MoviesComponent,
    DialogModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    ToastModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  visible = false;
  selectedImageFile: File | null = null;
  selectedVideoFile: File | null = null;
  isLoading = false;

  constructor(
    private moviesApiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.isLoading = true;
    this.moviesApiService
      .getAllMovies()
      .then((response) => {
        this.movies = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
  }

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1024),
    ]),
    genre: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    yearRelease: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
    ]),
  });

  get titleIsInvalid() {
    return (
      this.form.controls.title.touched &&
      this.form.controls.title.dirty &&
      this.form.controls.title.invalid
    );
  }
  get yearReleaseIsInvalid() {
    return (
      this.form.controls.yearRelease.touched &&
      this.form.controls.yearRelease.dirty &&
      this.form.controls.yearRelease.invalid
    );
  }
  get genreIsInvalid() {
    return (
      this.form.controls.genre.touched &&
      this.form.controls.genre.dirty &&
      this.form.controls.genre.invalid
    );
  }
  get countryIsInvalid() {
    return (
      this.form.controls.country.touched &&
      this.form.controls.country.dirty &&
      this.form.controls.country.invalid
    );
  }
  get descriptionIsInvalid() {
    return (
      this.form.controls.description.touched &&
      this.form.controls.description.dirty &&
      this.form.controls.description.invalid
    );
  }

  onFileImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

  onFileVideoSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedVideoFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.value.title!);
      formData.append('year_release', this.form.value.yearRelease!);
      formData.append('country', this.form.value.country!);
      formData.append('genre', this.form.value.genre!);
      formData.append('description', this.form.value.description!);

      if (this.selectedImageFile) {
        formData.append('image', this.selectedImageFile);
      }

      if (this.selectedVideoFile) {
        formData.append('video', this.selectedVideoFile);
      }

      this.moviesApiService
        .createNewMovie(formData)
        .then((response) => {
          this.messageService.add({
            key: 'main-toast',
            severity: 'success',
            summary: 'Success',
            detail: 'Movie Successfully Added!',
          });
          this.fetchMovies();
        })
        .catch((error) => {
          console.log(error);
        });

      this.visible = false;
      this.form.reset();
    }
  }

  onAddMovie() {
    this.visible = true;
  }

  onMovieReFetch() {
    this.fetchMovies();
  }
}
