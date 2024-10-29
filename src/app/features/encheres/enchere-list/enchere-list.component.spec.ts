import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchereListComponent } from './enchere-list.component';

describe('EnchereListComponent', () => {
  let component: EnchereListComponent;
  let fixture: ComponentFixture<EnchereListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchereListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchereListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
