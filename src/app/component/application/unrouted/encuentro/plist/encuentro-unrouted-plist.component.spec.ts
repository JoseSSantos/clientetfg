import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroUnroutedPlistComponent } from './encuentro-unrouted-plist.component';

describe('EncuentroUnroutedPlistComponent', () => {
  let component: EncuentroUnroutedPlistComponent;
  let fixture: ComponentFixture<EncuentroUnroutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroUnroutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroUnroutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
