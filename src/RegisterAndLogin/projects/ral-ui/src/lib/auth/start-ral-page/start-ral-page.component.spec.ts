import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartRalPageComponent } from './start-ral-page.component';

describe('StartRalPageComponent', () => {
  let component: StartRalPageComponent;
  let fixture: ComponentFixture<StartRalPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [StartRalPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartRalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
