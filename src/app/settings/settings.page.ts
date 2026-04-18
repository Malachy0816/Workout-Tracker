import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons, IonItem, IonLabel, IonSelectOption, IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonToggle} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { WorkoutStorageService } from '../services/workout-storage.service'; 
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonBackButton, IonButtons, IonItem, IonLabel, IonSelectOption, IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonToggle]
})
export class SettingsPage implements OnInit {

  constructor(private workoutStorage: WorkoutStorageService, private alertController: AlertController, private toastController: ToastController) {}

  confirmFinish = true;


  ngOnInit() {
  }

  async clearWorkoutHistory(): Promise<void>{
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
          role: 'confirm',
        }
      ]
    });

    await alert.present();

    const result = await alert.onDidDismiss();
    
    if(result.role === 'confirm') {
      await this.workoutStorage.clearWorkouts();

      const toast = await this.toastController.create({
        message: 'Workout history cleared',
        duration: 2000,
        position: 'bottom'
      });

      await toast.present();
    }
  }

  async ionViewWillEnter(): Promise<void> {
  this.confirmFinish = await this.workoutStorage.getConfirmFinish();
}

async onConfirmFinishChange(): Promise<void> {
  await this.workoutStorage.setConfirmFinish(this.confirmFinish);
}

}
