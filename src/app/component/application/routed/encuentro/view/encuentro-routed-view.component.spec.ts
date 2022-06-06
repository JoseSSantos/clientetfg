import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroRoutedViewComponent } from './encuentro-routed-view.component';

describe('EncuentroRoutedViewComponent', () => {
  let component: EncuentroRoutedViewComponent;
  let fixture: ComponentFixture<EncuentroRoutedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroRoutedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroRoutedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
