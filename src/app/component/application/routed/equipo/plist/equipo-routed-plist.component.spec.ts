import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRoutedPlistComponent } from './equipo-routed-plist.component';

describe('EquipoRoutedPlistComponent', () => {
  let component: EquipoRoutedPlistComponent;
  let fixture: ComponentFixture<EquipoRoutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoRoutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRoutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
