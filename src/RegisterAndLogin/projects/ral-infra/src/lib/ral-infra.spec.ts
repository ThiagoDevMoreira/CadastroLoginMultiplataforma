import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RalInfra } from './ral-infra.';

describe('RalInfra', () => {
  let component: RalInfra;
  let fixture: ComponentFixture<RalInfra>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RalInfra],
    }).compileComponents();

    fixture = TestBed.createComponent(RalInfra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
