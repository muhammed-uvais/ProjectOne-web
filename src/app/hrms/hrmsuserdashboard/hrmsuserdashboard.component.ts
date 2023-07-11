import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-hrmsuserdashboard',
  templateUrl: './hrmsuserdashboard.component.html',
  styleUrls: ['./hrmsuserdashboard.component.css']
})
export class HrmsuserdashboardComponent implements OnInit {
  datatoshow :any
constructor(private service : LoginService, private router: Router,){

}
  ngOnInit(): void {

    this.service.GetById(1).subscribe(
      {
        next: value => {
          this.datatoshow = value
        },
        error: error => {
          console.log(error)
        this.datatoshow = error.statusText
        if(error.status == 401)
          localStorage.clear()
         this.router.navigate(['/'])
      },
      complete: () => {
        console.log('complete')
      }

      }
    )

  }

}
