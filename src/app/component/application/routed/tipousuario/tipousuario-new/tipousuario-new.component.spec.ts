import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipousuarioNewComponent } from './tipousuario-new.component';

describe('TipousuarioNewComponent', () => {
  let component: TipousuarioNewComponent;
  let fixture: ComponentFixture<TipousuarioNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipousuarioNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipousuarioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
