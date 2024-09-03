import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaReviewsComponent } from './media-reviews.component';

describe('MediaReviewsComponent', () => {
  let component: MediaReviewsComponent;
  let fixture: ComponentFixture<MediaReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
