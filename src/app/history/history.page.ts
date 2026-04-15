import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { WorkoutSession } from '../models/workout.models';
import { WorkoutStorageService } from '../services/workout-storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonBackButton, IonButtons]
})
export class HistoryPage implements OnInit {

  workouts: WorkoutSession[] = [];
  expandedWorkoutId: string | number | null = null;

  constructor(private workoutStorage: WorkoutStorageService) { }

  ngOnInit() {
  }

  async ionViewWillEnter(): Promise<void> {
    this.workouts = await this.workoutStorage.getWorkouts();
  }

  //this function formats the duration of the workout
  formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }

  //formats the date of the workout
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  async clearHistory(): Promise<void> {
    const confirmed = confirm('Are you sure you want to clear all workout history?');

    if (!confirmed) {
      return;
    }

    await this.workoutStorage.clearWorkouts();
    this.workouts = [];
  }

  toggleWorkoutDetails(workoutId: string | number): void {
    if (this.expandedWorkoutId === workoutId) {
      this.expandedWorkoutId = null;
    } else {
      this.expandedWorkoutId = workoutId;
    }
  }

}
