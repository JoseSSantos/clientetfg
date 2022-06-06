import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipousuarioDeleteComponent } from './tipousuario-delete.component';

describe('TipousuarioDeleteComponent', () => {
  let component: TipousuarioDeleteComponent;
  let fixture: ComponentFixture<TipousuarioDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipousuarioDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipousuarioDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
