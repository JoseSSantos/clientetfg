import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInfiniteListComponent } from './usuario-infinite-list.component';

describe('UsuarioInfiniteListComponent', () => {
  let component: UsuarioInfiniteListComponent;
  let fixture: ComponentFixture<UsuarioInfiniteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioInfiniteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInfiniteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
