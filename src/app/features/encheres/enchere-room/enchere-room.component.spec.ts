import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnchereRoomComponent } from './enchere-room.component';

describe('EnchereRoomComponent', () => {
  let component: EnchereRoomComponent;
  let fixture: ComponentFixture<EnchereRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnchereRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnchereRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
