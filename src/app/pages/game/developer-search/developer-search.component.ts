import { Component, ViewChild } from '@angular/core';
import { DeveloperService } from '../../../services/game/developer/developer.service';
import { FormBuilder } from '@angular/forms';
import { Developer, DeveloperSearchParams } from '../../../../types';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-developer-search',
  templateUrl: './developer-search.component.html',
  styleUrl: './developer-search.component.scss',
})
export class DeveloperSearchComponent {
  @ViewChild('paginator') paginator: Paginator | undefined;

  constructor(
    private developerService: DeveloperService,
    private fb: FormBuilder
  ) {}

  searchParams: DeveloperSearchParams = {
    name: '',
  };
  developers: Developer[] = [];
  totalRecords: number = 0;
  size = 25;

  searchForm = this.fb.group({
    name: [''],
  });

  fetchDevelopers(page: number, size: number) {
    this.developerService
      .getDevelopers({ page, size }, this.searchParams)
      .subscribe((res) => {
        this.developers = res.developers;
        this.totalRecords = res.count;
      });
  }

  onPageChange(event: any) {
    this.fetchDevelopers(event.page, event.rows);
  }

  changeParams() {
    const { name } = this.searchForm.value;

    this.searchParams = {
      name: name || '',
    };
    this.resetPaginator();
    this.fetchDevelopers(0, this.size);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  ngOnInit() {
    this.fetchDevelopers(0, this.size);
  }
}
