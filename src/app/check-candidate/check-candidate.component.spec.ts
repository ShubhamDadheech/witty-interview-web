import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCandidateComponent } from './check-candidate.component';

describe('CheckCandidateComponent', () => {
  let component: CheckCandidateComponent;
  let fixture: ComponentFixture<CheckCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
