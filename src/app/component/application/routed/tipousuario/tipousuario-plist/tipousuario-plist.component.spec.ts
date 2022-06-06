import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipousuarioPlistComponent } from './tipousuario-plist.component';

describe('TipousuarioPlistComponent', () => {
  let component: TipousuarioPlistComponent;
  let fixture: ComponentFixture<TipousuarioPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipousuarioPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipousuarioPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
