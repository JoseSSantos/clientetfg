import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroRoutedEditComponent } from './encuentro-routed-edit.component';

describe('EncuentroRoutedEditComponent', () => {
  let component: EncuentroRoutedEditComponent;
  let fixture: ComponentFixture<EncuentroRoutedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroRoutedEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroRoutedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
