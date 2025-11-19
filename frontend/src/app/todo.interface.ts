export interface Todo {
  _id: string; 
  taskName: string;
  isCompleted: boolean;
  priority: 'Low' | 'Medium' | 'High'; 
  dueDate?: Date; 
  createdAt: Date;
  updatedAt: Date;
}