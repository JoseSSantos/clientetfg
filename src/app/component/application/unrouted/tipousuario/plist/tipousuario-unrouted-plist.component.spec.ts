import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipousuarioUnroutedPlistComponent } from './tipousuario-unrouted-plist.component';

describe('TipousuarioUnroutedPlistComponent', () => {
  let component: TipousuarioUnroutedPlistComponent;
  let fixture: ComponentFixture<TipousuarioUnroutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipousuarioUnroutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipousuarioUnroutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
