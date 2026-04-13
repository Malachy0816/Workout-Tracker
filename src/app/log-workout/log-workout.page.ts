import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonInput, IonButtons } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { WorkoutStorageService } from '../services/workout-storage.service';
import { WorkoutExercise, WorkoutSession, WorkoutSet } from '../models/workout.models';


@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonBackButton, IonInput, IonButtons]
})

export class LogWorkoutPage implements OnInit, OnDestroy {
  workoutStarted = false;
  elapsedSeconds = 0;
  timerInterval: any = null;

  currentWorkout: WorkoutSession = {
    id: '',
    startedAt: '',
    durationSeconds: 0,
    exercises: [],
    totalVolume: 0
  };

  constructor(private workoutStorage: WorkoutStorageService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.workoutStorage.init();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  async ionViewWillEnter(): Promise<void> {
    const selectedExercise = history.state?.selectedExercise;

    console.log('selectedExercise:', selectedExercise);

    if (selectedExercise) {
      await this.addExerciseFromApi(selectedExercise);

      history.replaceState({}, '');
    }
  }

  goToExercises(): void {
    this.router.navigate(['/exercises'], {
      state: { fromWorkout: true }
    });
  }

  startWorkout(): void {
    this.workoutStarted = true;
    this.elapsedSeconds = 0;

    this.currentWorkout = {
      id: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      exercises: [],
      totalVolume: 0
    };

    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.currentWorkout.durationSeconds = this.elapsedSeconds;
    }, 1000);
  }

  formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }

  async addExercise(): Promise<void> {
    const exerciseName = prompt('Enter exercise name');

    if (!exerciseName || !exerciseName.trim()) {
      return;
    }

    const previousSession = await this.workoutStorage.getPreviousSetsForExercise(exerciseName);

    const newExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      name: exerciseName.trim(),
      sets: [
        {
          reps: null,
          weight: null,
          completed: false
        }
      ],
      previousSession
    };

    this.currentWorkout.exercises.push(newExercise);
  }

  async addExerciseFromApi(exercise: any): Promise<void> {

    const previousSession = await this.workoutStorage.getPreviousSetsForExercise(exercise.name);

    const newExercise: WorkoutExercise = {
      id: exercise.id,
      name: exercise.name,
      bodyPart: exercise.bodyPart,
      equipment: exercise.equipment,
      sets: [
        {
          reps: null,
          weight: null,
          completed: false
        }
      ],
      previousSession
    };

    this.currentWorkout.exercises.push(newExercise);
  }

  addSet(exercise: WorkoutExercise): void {
    const newSet: WorkoutSet = {
      reps: null,
      weight: null,
      completed: false
    };

    exercise.sets.push(newSet);
  }

  toggleSetComplete(set: WorkoutSet): void {
    set.completed = !set.completed;
  }

  getExerciseVolume(exercise: WorkoutExercise): number {
    return exercise.sets.reduce((total, set) => {
      const reps = set.reps ?? 0;
      const weight = set.weight ?? 0;
      return total + reps * weight;
    }, 0);
  }

  getTotalVolume(): number {
    return this.currentWorkout.exercises.reduce((total, exercise) => {
      return total + this.getExerciseVolume(exercise);
    }, 0);
  }

  async finishWorkout(): Promise<void> {
    if (!this.workoutStarted) {
      return;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.currentWorkout.endedAt = new Date().toISOString();
    this.currentWorkout.durationSeconds = this.elapsedSeconds;
    this.currentWorkout.totalVolume = this.getTotalVolume();

    await this.workoutStorage.saveWorkout(this.currentWorkout);

    this.workoutStarted = false;
    this.elapsedSeconds = 0;

    this.currentWorkout = {
      id: '',
      startedAt: '',
      durationSeconds: 0,
      exercises: [],
      totalVolume: 0
    };

    alert('Workout saved');
  }
}


