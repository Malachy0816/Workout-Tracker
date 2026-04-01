import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {

  constructor(private http: HttpClient) {}

  getExercises(): Observable<any> {
    const headers = new HttpHeaders({
       'X-RapidAPI-Key': '6c569af8fcmsh60686c441142e5ep162191jsn0d6e5244f734',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    });

      return this.http.get(
      'https://exercisedb.p.rapidapi.com/exercises',
      { headers} 
    );
  }

  searchExercises(searchTerm: string): Observable<any> {
  const headers = new HttpHeaders({
    'X-RapidAPI-Key': '6c569af8fcmsh60686c441142e5ep162191jsn0d6e5244f734',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  });

  return this.http.get(
    `https://exercisedb.p.rapidapi.com/exercises/name/${searchTerm}`,
    { headers }
  );
}
}
