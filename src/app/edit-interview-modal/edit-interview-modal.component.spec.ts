import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterviewModalComponent } from './edit-interview-modal.component';

describe('EditInterviewModalComponent', () => {
  let component: EditInterviewModalComponent;
  let fixture: ComponentFixture<EditInterviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInterviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInterviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
