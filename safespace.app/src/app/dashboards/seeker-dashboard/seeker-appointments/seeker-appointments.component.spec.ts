import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerAppointmentsComponent } from './seeker-appointments.component';

describe('SeekerAppointmentsComponent', () => {
  let component: SeekerAppointmentsComponent;
  let fixture: ComponentFixture<SeekerAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerAppointmentsComponent]
    });
    fixture = TestBed.createComponent(SeekerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
