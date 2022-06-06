import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRoutedEditComponent } from './usuario-routed-edit.component';

describe('UsuarioRoutedEditComponent', () => {
  let component: UsuarioRoutedEditComponent;
  let fixture: ComponentFixture<UsuarioRoutedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRoutedEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRoutedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
