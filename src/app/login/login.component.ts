import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  Form: FormGroup | any
  constructor(private formbulider: FormBuilder, private service : LoginService,
    private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.Form = this.formbulider.group({
      Username: [''],
      Password: [''],
     });
     this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
     // if (params.status == null || params.status ==undefined)
      {
        if (localStorage.getItem('currentUser') != null) {
          //let userlanguage = JSON.parse(localStorage.getItem('currentUser'));
          this.router.navigate(['/hrms/hrmdashboard']);
        }
      }
    })
  }
  onSubmit(){
    this.service.CheckAuthentication(this.Form.value).subscribe(data => {
      if (data && data.token) {
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('username',data.LoginName);
      this.router.navigate(['/hrms/hrmdashboard'])
    }
    else{
      localStorage.clear()
    }
    })

  }
}
