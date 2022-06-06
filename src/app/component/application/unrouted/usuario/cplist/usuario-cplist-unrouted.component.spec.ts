import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCplistUnroutedComponent } from './usuario-cplist-unrouted.component';

describe('UsuarioCplistUnroutedComponent', () => {
  let component: UsuarioCplistUnroutedComponent;
  let fixture: ComponentFixture<UsuarioCplistUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCplistUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCplistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
