import { Component, ViewChild } from '@angular/core';
import { GenreService } from '../../../services/game/genre/genre.service';
import { FormBuilder } from '@angular/forms';
import { GamePropertieSearchParam, Genre } from '../../../../types';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-genre-search',
  templateUrl: './genre-search.component.html',
  styleUrl: './genre-search.component.scss',
})
export class GenreSearchComponent {
  constructor(private genreService: GenreService, private fb: FormBuilder) {}
  searchParams: GamePropertieSearchParam = {
    name: '',
  };
  genres: Genre[] = [];

  searchForm = this.fb.group({
    name: [''],
  });

  fetchGenres() {
    this.genreService.getGenres(this.searchParams).subscribe((res) => {
      this.genres = res;
    });
  }

  changeParams() {
    const { name } = this.searchForm.value;

    this.searchParams = {
      name: name || '',
    };

    this.fetchGenres();
  }

  ngOnInit() {
    this.fetchGenres();
  }
}
