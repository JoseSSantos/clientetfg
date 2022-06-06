import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRoutedViewComponent } from './equipo-routed-view.component';

describe('EquipoRoutedViewComponent', () => {
  let component: EquipoRoutedViewComponent;
  let fixture: ComponentFixture<EquipoRoutedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoRoutedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRoutedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
