import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogWorkoutPage } from './log-workout.page';

describe('LogWorkoutPage', () => {
  let component: LogWorkoutPage;
  let fixture: ComponentFixture<LogWorkoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
