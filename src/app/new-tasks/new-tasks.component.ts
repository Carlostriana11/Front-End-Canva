import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CanvasServicesService } from '../services/canvas.services.service';

@Component({
  selector: 'app-new-tasks',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-tasks.component.html',
  styleUrl: './new-tasks.component.css'
})
export class NewTasksComponent {

  newtasks!: FormGroup
  
  constructor(private canvaServices: CanvasServicesService){
    this.newtasks = new FormGroup({
      description: new FormControl("", Validators.required)
    })
  }

  createOneTasks(){
    if(this.newtasks.valid){

      this.canvaServices.createTask(this.newtasks.value).subscribe(data =>{
        console.log(data)
        this.newtasks.reset()
        location.reload();

      })

    }
  }
}
