import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRoutedEditComponent } from './equipo-routed-edit.component';

describe('EquipoRoutedEditComponent', () => {
  let component: EquipoRoutedEditComponent;
  let fixture: ComponentFixture<EquipoRoutedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoRoutedEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRoutedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
