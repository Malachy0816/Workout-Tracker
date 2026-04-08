export interface WorkoutSet {
  reps: number | null;
  weight: number | null;
  completed: boolean;
}

export interface PreviousSet {
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  id: string | number;
  name: string;
  bodyPart?: string;
  equipment?: string;
  sets: WorkoutSet[];
  previousSession?: PreviousSet[];
}

export interface WorkoutSession {
  id: string | number;
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  exercises: WorkoutExercise[];
  totalVolume: number;
}