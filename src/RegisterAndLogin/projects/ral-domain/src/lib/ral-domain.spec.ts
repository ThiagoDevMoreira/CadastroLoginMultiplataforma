import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RalDomain } from './ral-domain.';

describe('RalDomain', () => {
  let component: RalDomain;
  let fixture: ComponentFixture<RalDomain>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RalDomain],
    }).compileComponents();

    fixture = TestBed.createComponent(RalDomain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
