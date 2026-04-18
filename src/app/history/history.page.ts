import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { WorkoutSession } from '../models/workout.models';
import { WorkoutStorageService } from '../services/workout-storage.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class HistoryPage implements OnInit {

  workouts: WorkoutSession[] = [];
  expandedWorkoutId: string | number | null = null;

  constructor(private workoutStorage: WorkoutStorageService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
  }

  async ionViewWillEnter(): Promise<void> {
    this.workouts = await this.workoutStorage.getWorkouts();
  }

  
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


  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  async clearHistory(): Promise<void> {
   const alert = await this.alertController.create({
    header: 'Clear History',
    message: 'Are you sure you want to delete all workout history?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'confirm'
      }
    ]
  });

  await alert.present();

  const result = await alert.onDidDismiss();

  if (result.role === 'confirm') {
    await this.workoutStorage.clearWorkouts();
    this.workouts = [];

    const toast = await this.toastController.create({
      message: 'Workout history cleared',
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();
  }
  }

  toggleWorkoutDetails(workoutId: string | number): void {
    if (this.expandedWorkoutId === workoutId) {
      this.expandedWorkoutId = null;
    } else {
      this.expandedWorkoutId = workoutId;
    }
  }

}
