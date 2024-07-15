import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CanvasServicesService } from '../services/canvas.services.service';

@Component({
  selector: 'app-update-canva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-canva.component.html',
  styleUrl: './update-canva.component.css'
})
export class UpdateCanvaComponent {

  updateTask!: FormGroup;
  taskId: string;

  constructor(
    private matDiaLogRef: MatDialogRef<UpdateCanvaComponent>, 
    private canvaServices: CanvasServicesService, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.taskId = data.id;
    console.log(this.taskId)
    this.updateTask = new FormGroup({
      description: new FormControl("", Validators.required)
    })
  }

  ngOnInit(){
    this.canvaServices.getTaskById(this.taskId).subscribe(data =>{
      const task = data
      
      this.updateTask.setValue({
        description: task.description
      })
    })
  }
  updateTasks(){
    if(this.updateTask.valid){
      this.canvaServices.updateOneTask(this.taskId, this.updateTask.value).subscribe(data =>{
        console.log(data)
        location.reload();
      })
    }
  }

}
