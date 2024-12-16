import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode = false;
  http = inject(HttpClient);
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('http://localhost:5001/api/users').subscribe({
      next:(response)=>{
        this.users = response;
      },
      error:(err)=>{console.log(err)},
      complete:() =>{console.log('Request has completed')}

    })
  }

  CancelRegisterMode(event: boolean) {
      this.registerMode= event;
    }
}
