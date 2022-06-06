import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUnroutedPlistComponent } from './usuario-unrouted-plist.component';

describe('UsuarioUnroutedPlistComponent', () => {
  let component: UsuarioUnroutedPlistComponent;
  let fixture: ComponentFixture<UsuarioUnroutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioUnroutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioUnroutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
