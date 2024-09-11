import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieCrewComponent } from './add-movie-crew.component';

describe('AddMovieCrewComponent', () => {
  let component: AddMovieCrewComponent;
  let fixture: ComponentFixture<AddMovieCrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMovieCrewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMovieCrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
