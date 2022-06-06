import { ComponentFixture, TestBed } from '@angular/core/testing';

import { usuarioroutedViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: usuarioroutedViewComponent;
  let fixture: ComponentFixture<usuarioroutedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ usuarioroutedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(usuarioroutedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
