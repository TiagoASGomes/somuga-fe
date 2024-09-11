import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastSearchComponent } from './cast-search.component';

describe('CastSearchComponent', () => {
  let component: CastSearchComponent;
  let fixture: ComponentFixture<CastSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
