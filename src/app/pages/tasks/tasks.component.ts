import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
interface Task {
  name: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  task = new FormControl<string>('', { nonNullable: true});

  tasks = signal<Task[]>([]);

  completedTask = computed(() => this.tasks().filter((t) => t.isCompleted));
  uncompletedTask = computed(() => this.tasks().filter((t) => !t.isCompleted));

  constructor() {
    effect(() => {
      console.log(this.tasks());
      if(this.uncompletedTask().length > 3){
        alert(`Tienes ${this.uncompletedTask().length} tareas pendientes`);
      }
      if(this.completedTask().length > 3){
        alert(`Tienes ${this.completedTask().length} tareas completadas`);
      }
    });
  }

  addTask() {
    this.tasks.update((tasks) => [
      ...tasks,
      { name: this.task.value, isCompleted: false }
    ]);
    //this.task.reset();
    this.task.setValue('');
  }

  deleteTask(task: Task, index?: number) {
    /* //solution one
    this.tasks.update((tasks) => tasks.filter((_, i) => i !== index)); */ 
    //solution two
    this.tasks.update(
      (tasks) => tasks.filter((t) => t.name !== task.name)
    )
  }

  toogleCompletedTask(task: Task) {
    this.tasks.mutate((tasks) => {
      this.tasks().find((t) => t.name === task.name)!.isCompleted = !task.isCompleted;
      return tasks;
    });
  }

  resetTask(){
    this.tasks.update(() => []);
  }
}
