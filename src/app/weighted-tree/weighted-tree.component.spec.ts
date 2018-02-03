import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightedTreeComponent } from './weighted-tree.component';

describe('WeightedTreeComponent', () => {
  let component: WeightedTreeComponent;
  let fixture: ComponentFixture<WeightedTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightedTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightedTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
