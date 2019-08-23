import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneInterviewComponent } from './done-interview.component';

describe('DoneInterviewComponent', () => {
  let component: DoneInterviewComponent;
  let fixture: ComponentFixture<DoneInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
