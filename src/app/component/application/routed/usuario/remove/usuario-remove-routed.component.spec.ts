import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRemoveRoutedComponent } from './usuario-remove-routed.component';

describe('UsuarioRemoveRoutedComponent', () => {
  let component: UsuarioRemoveRoutedComponent;
  let fixture: ComponentFixture<UsuarioRemoveRoutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRemoveRoutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRemoveRoutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
