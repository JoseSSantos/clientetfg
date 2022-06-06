import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipousuarioEditComponent } from './tipousuario-edit.component';

describe('TipousuarioEditComponent', () => {
  let component: TipousuarioEditComponent;
  let fixture: ComponentFixture<TipousuarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipousuarioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipousuarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
