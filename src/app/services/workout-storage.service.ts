import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { WorkoutSession, PreviousSet } from '../models/workout.models';

@Injectable({
  providedIn: 'root'
})
export class WorkoutStorageService {
  private readonly WORKOUTS_KEY = 'workout_history';
  private storageReady = false;

  constructor(private storage: Storage) {}

  async init(): Promise<void> {
    if (!this.storageReady) {
      await this.storage.create();
      this.storageReady = true;
    }
  }

  async getWorkouts(): Promise<WorkoutSession[]> {
    await this.init();
    return (await this.storage.get(this.WORKOUTS_KEY)) ?? [];
  }

  async saveWorkout(workout: WorkoutSession): Promise<void> {
    await this.init();
    const workouts = await this.getWorkouts();
    workouts.unshift(workout);
    await this.storage.set(this.WORKOUTS_KEY, workouts);
  }

  async getPreviousSetsForExercise(exerciseName: string): Promise<PreviousSet[]> {
    const workouts = await this.getWorkouts();

    for (const workout of workouts) {
      const foundExercise = workout.exercises.find(
        exercise => exercise.name.toLowerCase() === exerciseName.toLowerCase()
      );

      if (foundExercise) {
        return foundExercise.sets
          .filter(set => set.reps !== null && set.weight !== null)
          .map(set => ({
            reps: set.reps as number,
            weight: set.weight as number
          }));
      }
    }

    return [];
  }
}
