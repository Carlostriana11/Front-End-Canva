import { Component } from '@angular/core';
import { CanvasComponent } from "../canvas/canvas.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CanvasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}
