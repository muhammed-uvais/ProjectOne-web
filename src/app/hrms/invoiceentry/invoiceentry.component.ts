import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoiceentry',
  templateUrl: './invoiceentry.component.html',
  styleUrls: ['./invoiceentry.component.css']
})
export class InvoiceentryComponent implements OnInit {
  Form: FormGroup | any;
  constructor(private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,){

  }
  ngOnInit(): void {
    this.Form = this.formbulider.group({
      Id : [0],
      Name : ['',],
      TaxTypeId : ['1'],
      IsActive : [1],
     InvoiceItems : new FormArray([])
    })
  }
  panelOpenState = false;
}
