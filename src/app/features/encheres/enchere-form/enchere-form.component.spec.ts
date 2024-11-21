import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchereFormComponent } from './enchere-form.component';

describe('EnchereFormComponent', () => {
  let component: EnchereFormComponent;
  let fixture: ComponentFixture<EnchereFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchereFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchereFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
