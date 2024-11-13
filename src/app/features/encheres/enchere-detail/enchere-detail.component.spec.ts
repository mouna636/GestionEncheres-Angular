import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchereDetailComponent } from './enchere-detail.component';

describe('EnchereDetailComponent', () => {
  let component: EnchereDetailComponent;
  let fixture: ComponentFixture<EnchereDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchereDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchereDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
