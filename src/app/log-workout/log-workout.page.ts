import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-workout',
  templateUrl: './log-workout.page.html',
  styleUrls: ['./log-workout.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonBackButton]
})
export class LogWorkoutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
