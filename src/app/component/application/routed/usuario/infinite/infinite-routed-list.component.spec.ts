import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteRoutedListComponent } from './infinite-routed-list.component';

describe('InfiniteRoutedListComponent', () => {
  let component: InfiniteRoutedListComponent;
  let fixture: ComponentFixture<InfiniteRoutedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfiniteRoutedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteRoutedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
