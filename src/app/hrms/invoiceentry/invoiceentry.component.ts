import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoiceentry',
  templateUrl: './invoiceentry.component.html',
  styleUrls: ['./invoiceentry.component.css']
})
export class InvoiceentryComponent implements OnInit {
  Form: FormGroup | any;
  panelOpenState = false;
  constructor(private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private service : InvoiceService,
    private router: Router,){

  }
  get f() { return this.Form.controls; }
  get invitems () { return this.f.InvoiceItems as FormArray; }
  ngOnInit(): void {
    this.Form = this.formbulider.group({
      Id : [0],
      Number : [0],
      NumberDisplay : [''],
      CreatedDate : [new Date],
      EntryDate : [new Date],
      IsActive : [1],
      InvoiceItems : new FormArray([])
    })
    this.AddInvoiceItem()
  }
DeleteItem(i : any){
  if(this.invitems.length > 1)
  this.invitems.removeAt(i)
}
  AddInvoiceItem(){
    this.invitems.push(this.formbulider.group({
      Id: [0],
      InvoiceHdrId : [0],
      Description : [''],
      Date : [new Date()],
      QtyPerDay : [0],
      Vatpercentage : [0],
      TaxableValue : [0],
      Vatamount: [0],
      TotalAmount : [0],
      IsActive : [1]
    }))
  }
  Submit(){
    console.log(this.Form.value);
    let obj = this.Form.value
    this.service.Create(obj).subscribe(data => {
      console.log(data);

    })

  }
}
