import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuentroRoutedNewComponent } from './encuentro-routed-new.component';

describe('EncuentroRoutedNewComponent', () => {
  let component: EncuentroRoutedNewComponent;
  let fixture: ComponentFixture<EncuentroRoutedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuentroRoutedNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuentroRoutedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
