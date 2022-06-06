import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoUnroutedPlistComponent } from './equipo-unrouted-plist.component';

describe('EquipoUnroutedPlistComponent', () => {
  let component: EquipoUnroutedPlistComponent;
  let fixture: ComponentFixture<EquipoUnroutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoUnroutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoUnroutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
