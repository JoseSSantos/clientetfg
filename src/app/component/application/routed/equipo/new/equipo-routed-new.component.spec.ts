import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoRoutedNewComponent } from './equipo-routed-new.component';

describe('EquipoRoutedNewComponent', () => {
  let component: EquipoRoutedNewComponent;
  let fixture: ComponentFixture<EquipoRoutedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoRoutedNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoRoutedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
