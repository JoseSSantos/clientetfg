import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroUnroutedViewComponent } from './encuentro-unrouted-view.component';

describe('EncuentroUnroutedViewComponent', () => {
  let component: EncuentroUnroutedViewComponent;
  let fixture: ComponentFixture<EncuentroUnroutedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroUnroutedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroUnroutedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
