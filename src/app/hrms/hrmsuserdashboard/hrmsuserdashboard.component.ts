import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseInterceptor } from 'src/app/Core/Helpers/response.interceptor';
import { InvoiceService } from 'src/app/services/invoice.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-hrmsuserdashboard',
  templateUrl: './hrmsuserdashboard.component.html',
  styleUrls: ['./hrmsuserdashboard.component.css']
})
export class HrmsuserdashboardComponent implements OnInit,AfterContentInit,AfterContentChecked {
  datatoshow :any
  invoiceList: any[]=[];
  filteredData :any;
  searchTerm: string = "";
  FromDate! : Date
  ToDate! : Date
constructor(private loginservice : LoginService,
  private ref: ChangeDetectorRef,
  private service : InvoiceService,
  private route: ActivatedRoute,
private loaderservice :LoaderService,
   private router: Router,){

}
  ngAfterContentInit(): void {
    this.ref.detectChanges();
  }
  ngOnInit(): void {
  //this.Login()
  this.GetAll()
}
Login(){
  this.loginservice.GetById(1).subscribe(
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
GetAll(){
  let frmdate = this.FromDate != undefined ? this.FromDate.toDateString() : ""
  let todate = this.ToDate != undefined ? this.ToDate.toDateString() : ""
  this.service.GetAll(frmdate ,todate).subscribe(data =>{
    this.invoiceList = data
    this.filteredData =data
    console.log(this.invoiceList);

  }
    )
}
NavToInvCreate(){
  this.router.navigate(['hrms/invoicecreate'])
}
Logout(){
  localStorage.removeItem('currentUser')
  this.router.navigate(['/'])
}
NavigateToCompany(){
  this.router.navigate(['/settings/company'])
}
NavigateToTax(){
  this.router.navigate(['/settings/taxgrouplist'])
}
OnitemClicked(item:any){
this.router.navigate(['hrms/invoicecreate'],{queryParams : {id : item.id}})

}
search(): void {
  const searchFields = ['numberDisplay', 'customerName','entryDate'];
  if(this.searchTerm != ""){
    this.filteredData = this.filteredData.filter((item: any) =>
    searchFields.some(field =>
      item[field].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  );
  }
  else{
    this.filteredData = this.invoiceList
  }
}
openDatePicker(datepicker: MatDatepicker<Date>): void {
  datepicker.open();
}
ChangeFromDate(evt : string){
  var dt = evt.split('/')
  var newdate = new Date(dt[2] + "-" + dt[1] + "-" + dt[0])
this.FromDate = newdate
}
ChangeToDate(evt : string){
  var dt = evt.split('/')
  var newdate = new Date(dt[2] + "-" + dt[1] + "-" + dt[0])
this.ToDate = newdate
}
CurrentDate(){
  var today = new Date();

// Get the day, month, and year from the current date
var day = today.getDate().toString().padStart(2, '0');
var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
var year = today.getFullYear();

// Format the date as "dd-mm-yyyy"
var formattedDate = new Date(day + "-" + month + "-" + year);

// Output the formatted date
return formattedDate
}
ngAfterContentChecked(){
  this.ref.detectChanges();
}

}
