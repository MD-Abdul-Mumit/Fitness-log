export interface WorkoutItem {
  id?: string | number;
  _id?: string;
  bookId?: number;
  name?: string;
  workoutName?: string;
  title?: string;
  image: string;
  category?: string;
  categories?: string[];
  tags?: string[];
  equipment?: string;
  difficulty?: string;
  sets?: number | string;
  reps?: string | number;
  duration: number;
  caloriesBurned?: number;
  calories?: number;
  rating: number;
  description?: string;
  subtitle?: string;
  instructions?: string[];
  completed?: boolean;
}

export type SortCriteria = "duration" | "calories" | "rating";