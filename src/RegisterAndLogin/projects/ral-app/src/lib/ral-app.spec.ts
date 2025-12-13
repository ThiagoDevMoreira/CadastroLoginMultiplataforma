import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RalApp } from './ral-app.';

describe('RalApp', () => {
  let component: RalApp;
  let fixture: ComponentFixture<RalApp>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RalApp],
    }).compileComponents();

    fixture = TestBed.createComponent(RalApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
