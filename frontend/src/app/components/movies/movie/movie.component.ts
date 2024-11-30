import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { type Movie } from './movie.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    MenuModule,
    DialogModule,
    CalendarModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './movie.component.html',
  styles: [
    `
      :host ::ng-deep .p-menu {
        width: 8rem;
        position: absolute;
        opacity: 0.9;
      }

      :host ::ng-deep .p-element {
        padding: 4px 8px;
        font-size: 14px;
      }
    `,
  ],
})
export class MovieComponent {
  constructor(
    private router: Router,
    private moviesApiService: ApiService,
    private messageService: MessageService
  ) {}

  @Input({ required: true }) movie!: Movie;
  @Output() movieReFetch = new EventEmitter<void>();
  items: MenuItem[] | undefined;
  visible = false;
  selectedImageFile: File | null = null;
  selectedVideoFile: File | null = null;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1024),
    ]),
    yearRelease: new FormControl('', [
      Validators.required,
      Validators.maxLength(4),
    ]),
    genre: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
  });

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
        .updateMovieById(this.movie.id, formData)
        .then((response) => {
          this.movieReFetch.emit();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      this.visible = false;
      this.form.reset();
    }
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            command: () => {
              this.setFormValues();
              this.visible = true;
            },
          },
          {
            label: 'Delete',
            icon: PrimeIcons.TRASH,
            command: () => {
              this.moviesApiService
                .deleteMovieById(this.movie.id)
                .then((response) => {
                  this.messageService.add({
                    key: 'main-toast',
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Movie Successfully Deleted!',
                  });
                  console.log(response.data);
                  this.movieReFetch.emit();
                })
                .catch((error) => {
                  this.messageService.add({
                    key: 'main-toast',
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Error movie delete!',
                  });
                  console.log(error);
                });
            },
          },
        ],
      },
    ];
  }

  setFormValues() {
    this.form.setValue({
      title: this.movie.title,
      description: this.movie.description,
      yearRelease: this.movie.year_release!,
      country: this.movie.country!,
      genre: this.movie.genre!,
    });
  }

  isShow = false;

  onMouseHover() {
    this.isShow = !this.isShow;
  }

  onSelectMovie() {
    let formattedUrl =
      this.movie.title.replace(' ', '-').toLowerCase().trim() +
      '-' +
      this.movie.id;

    this.router.navigate(['/movies', formattedUrl]);
  }

  getMovieUrl(): string {
    return this.movie.image_url
      ? this.movie.image_url
      : 'assets/images/movie-placeholder.jpg';
  }
}
