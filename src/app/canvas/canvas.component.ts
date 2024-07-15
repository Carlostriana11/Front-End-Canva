import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
// import { CanvaInterfaces } from '../interfaces/canva.interfaces';
import { CanvasServicesService } from '../services/canvas.services.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCanvaComponent } from '../update-canva/update-canva.component';
import { task } from '../interfaces/canva.interfaces';


@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {
  todo: task[] = [];
  process:task[] = [];
  done: task[] = [];
  dato: any

  constructor(private canvaServices: CanvasServicesService, private _matDiaLog: MatDialog){}

  ngOnInit(){
    this.canvaServices.getTasks().subscribe((data: task[]) =>{
      console.log(data)

      this.todo = data.filter( task => task.status === 'todo');
      this.process = data.filter( task => task.status === 'process');
      this.done = data.filter( task => task.status === 'done');

    })
  }


  drop(event: CdkDragDrop<task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedTask = event.container.data[event.currentIndex]

      let newStatus: 'todo' | 'process' | 'done' = 'todo';
      if(event.container.id === 'cdk-drop-list-1'){
          newStatus = 'process';
      }else if (event.container.id === 'cdk-drop-list-2'){
          newStatus = 'done'
      }

      if (movedTask && movedTask.id && movedTask.description) {
        this.canvaServices.updateTaskStatus(movedTask.id, newStatus).subscribe({
          next: (data) => {
            console.log('Task updated successfully:', data);
          },
          error: (error) => {
            console.error('Error updating task status:', error);
          }
        });
      } else {
        console.error('Invalid task data', movedTask);
      }
    }
  }

  deleteTasks(id: string){
    console.log(id)
    this.canvaServices.deleteTasks(id).subscribe(data => {
      console.log(data)
      location.reload();
    })
  }
  openMode(id: string):void{
    this._matDiaLog.open(UpdateCanvaComponent, {
      width: "900px",
      data:{ id: id }
      
    })
  }
}
