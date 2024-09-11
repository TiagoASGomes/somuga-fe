import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSearchComponent } from './platform-search.component';

describe('PlatformSearchComponent', () => {
  let component: PlatformSearchComponent;
  let fixture: ComponentFixture<PlatformSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlatformSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlatformSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
