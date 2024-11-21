import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncherePageComponent } from './enchere-page.component';

describe('EncherePageComponent', () => {
  let component: EncherePageComponent;
  let fixture: ComponentFixture<EncherePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncherePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncherePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
