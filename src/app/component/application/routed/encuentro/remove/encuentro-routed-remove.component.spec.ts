import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroRoutedRemoveComponent } from './encuentro-routed-remove.component';

describe('EncuentroRoutedRemoveComponent', () => {
  let component: EncuentroRoutedRemoveComponent;
  let fixture: ComponentFixture<EncuentroRoutedRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroRoutedRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroRoutedRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
