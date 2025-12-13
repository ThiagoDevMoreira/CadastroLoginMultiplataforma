import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RalUi } from './ral-ui.';

describe('RalUi', () => {
  let component: RalUi;
  let fixture: ComponentFixture<RalUi>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RalUi],
    }).compileComponents();

    fixture = TestBed.createComponent(RalUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
