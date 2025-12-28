export interface ITodo extends Document {
  title: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}