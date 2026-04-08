import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonSearchbar} from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { ExerciseService } from '../services/exercise.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonBackButton, IonCardHeader, IonCardTitle, IonCardContent, IonCard, IonSearchbar]
})
export class ExercisesPage implements OnInit {

  searchTerm: string = '';
  exercises: any[] = [];

  constructor(private exerciseService: ExerciseService, private router: Router) {}

  ngOnInit(): void {
        this.exerciseService.getExercises().subscribe((data: any) =>{
      this.exercises = data;
    });
  }

  onSearchChange() {
  if (this.searchTerm.trim() === '') {
    this.exerciseService.getExercises().subscribe((data: any) => {
      this.exercises = data;
    });
    return;
  }
  this.exerciseService.searchExercises(this.searchTerm).subscribe((data: any) => {
    this.exercises = data;
  });
}

addExerciseToWorkout(exercise: any): void {
  this.router.navigate(['/log-workout'], {
    state: {
      selectedExercise: exercise
    }
  });
}

}
