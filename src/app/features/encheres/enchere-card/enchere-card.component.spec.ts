import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchereCardComponent } from './enchere-card.component';

describe('EnchereCardComponent', () => {
  let component: EnchereCardComponent;
  let fixture: ComponentFixture<EnchereCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchereCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchereCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
