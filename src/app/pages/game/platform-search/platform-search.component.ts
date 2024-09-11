import { Component } from '@angular/core';
import { PlatformService } from '../../../services/game/platform/platform.service';
import { FormBuilder } from '@angular/forms';
import { GamePropertieSearchParam, Platform } from '../../../../types';

@Component({
  selector: 'app-platform-search',
  templateUrl: './platform-search.component.html',
  styleUrl: './platform-search.component.scss',
})
export class PlatformSearchComponent {
  constructor(
    private platformService: PlatformService,
    private fb: FormBuilder
  ) {}
  searchParams: GamePropertieSearchParam = {
    name: '',
  };
  platforms: Platform[] = [];

  searchForm = this.fb.group({
    name: [''],
  });

  fetchGenres() {
    this.platformService.getPlatforms(this.searchParams).subscribe((res) => {
      this.platforms = res;
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
