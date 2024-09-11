import { Component, ViewChild } from '@angular/core';
import { CrewService } from '../../../services/movie/crew/crew.service';
import { FormBuilder } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { CastSearchParam, MovieCrew } from '../../../../types';

@Component({
  selector: 'app-cast-search',
  templateUrl: './cast-search.component.html',
  styleUrl: './cast-search.component.scss',
})
export class CastSearchComponent {
  @ViewChild('paginator') paginator: Paginator | undefined;
  constructor(private castService: CrewService, private fb: FormBuilder) {}
  searchParams: CastSearchParam = {
    name: '',
  };
  castMembers: MovieCrew[] = [];
  totalRecords: number = 0;
  size = 100;
  displayAddCrew = false;

  searchForm = this.fb.group({
    name: [''],
  });

  fetchCast(page: number) {
    this.castService
      .getCast({ page, size: this.size }, this.searchParams)
      .subscribe((res) => {
        this.castMembers = res.movieCrews;
        this.totalRecords = res.count;
      });
  }

  onPageChange(event: any) {
    this.fetchCast(event.page);
  }

  changeParams() {
    const { name } = this.searchForm.value;

    this.searchParams = {
      name: name || '',
    };
    this.resetPaginator();
    this.fetchCast(0);
  }

  toggleAddCrew() {
    this.displayAddCrew = true;
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  ngOnInit() {
    this.fetchCast(0);
  }
}
