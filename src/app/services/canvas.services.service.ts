import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { task } from '../interfaces/canva.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CanvasServicesService {


  constructor(private http: HttpClient, private router: Router) {}


  createTask(description: any){
    console.log('Sending:',description)
    return this.http.post<any>("http://localhost:5000/back-end-canva/us-central1/app/api/canva", description);
  }

  getTasks():Observable<task[]>{
    return this.http.get<any>("http://localhost:5000/back-end-canva/us-central1/app/api/canva");
  }
  getTaskById(id: string){
    return this.http.get<any>(`http://localhost:5000/back-end-canva/us-central1/app/api/canva/${id}`)
  }

  deleteTasks(taskId:string){
    return this.http.delete<any>(`http://localhost:5000/back-end-canva/us-central1/app/api/canva/${taskId}`);
  }
  updateOneTask(id: string, newTask: any){
    return this.http.put<any>(`http://localhost:5000/back-end-canva/us-central1/app/api/canva/${id}`, newTask)
  }
  updateTaskStatus(id: string, status: string):Observable<any>{
    return this.http.put(`http://localhost:5000/back-end-canva/us-central1/app/api/canva/${id}/status `,{status: status})
  }

}
