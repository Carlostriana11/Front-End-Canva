import { Component } from '@angular/core';
import { CanvasComponent } from "../canvas/canvas.component";
import { NewTasksComponent } from "../new-tasks/new-tasks.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CanvasComponent, NewTasksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
