import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoNormalViewComponent } from './equipo-normal-view.component';

describe('EquipoNormalViewComponent', () => {
  let component: EquipoNormalViewComponent;
  let fixture: ComponentFixture<EquipoNormalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoNormalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoNormalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
