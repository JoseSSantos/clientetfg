import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRoutedRemoveComponent } from './equipo-routed-remove.component';

describe('EquipoRoutedRemoveComponent', () => {
  let component: EquipoRoutedRemoveComponent;
  let fixture: ComponentFixture<EquipoRoutedRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoRoutedRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRoutedRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
