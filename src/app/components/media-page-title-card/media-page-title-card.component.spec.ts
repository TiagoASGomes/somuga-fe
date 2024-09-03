import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPageTitleCardComponent } from './media-page-title-card.component';

describe('MediaPageTitleCardComponent', () => {
  let component: MediaPageTitleCardComponent;
  let fixture: ComponentFixture<MediaPageTitleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPageTitleCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPageTitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
