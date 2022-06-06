import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRoutedPlistComponent } from './usuario-routed-plist.component';

describe('UsuarioRoutedPlistComponent', () => {
  let component: UsuarioRoutedPlistComponent;
  let fixture: ComponentFixture<UsuarioRoutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRoutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRoutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
