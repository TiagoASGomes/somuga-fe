import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPopUpComponent } from './review-pop-up.component';

describe('ReviewPopUpComponent', () => {
  let component: ReviewPopUpComponent;
  let fixture: ComponentFixture<ReviewPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
