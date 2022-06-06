import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroRoutedPlistComponent } from './encuentro-routed-plist.component';

describe('EncuentroRoutedPlistComponent', () => {
  let component: EncuentroRoutedPlistComponent;
  let fixture: ComponentFixture<EncuentroRoutedPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroRoutedPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroRoutedPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
