import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRoutedNewComponent } from './usuario-routed-new.component';

describe('UsuarioRoutedNewComponent', () => {
  let component: UsuarioRoutedNewComponent;
  let fixture: ComponentFixture<UsuarioRoutedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRoutedNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRoutedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
