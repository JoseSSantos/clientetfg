import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoUnroutedViewComponent } from './equipo-unrouted-view.component';

describe('EquipoUnroutedViewComponent', () => {
  let component: EquipoUnroutedViewComponent;
  let fixture: ComponentFixture<EquipoUnroutedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoUnroutedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoUnroutedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
