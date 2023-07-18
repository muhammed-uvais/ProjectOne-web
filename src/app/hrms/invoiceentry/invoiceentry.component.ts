import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import * as moment from 'moment';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { TaxgroupService } from 'src/app/services/settings/taxgroup.service';
@Component({
  selector: 'app-invoiceentry',
  templateUrl: './invoiceentry.component.html',
  styleUrls: ['./invoiceentry.component.css']
})
export class InvoiceentryComponent implements OnInit {
  Form: FormGroup | any;
  panelOpenState = false;
  taxList: any[] = [];
  SelectedTaxItem : any
  constructor(private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private service : InvoiceService,
    private taxservice : TaxgroupService,
    private router: Router,){

  }
  get f() { return this.Form.controls; }
  get invitems () { return this.f.InvoiceItems as FormArray; }
  ngOnInit(): void {
    this.LoadTax()
    this.Form = this.formbulider.group({
      Id : [0],
      Number : [0],
      NumberDisplay : [''],
      CreatedDate : [new Date],
      EntryDate : [(new Date)],
      IsActive : [1],
      SelectedTaxId : [0],
      InvoiceItems : new FormArray([]),
      CustomerDetails : this.formbulider.group({
        Id : [0],
        InvoiceHdrId : [0],
        Name : [''],
        Address : [''],
        Vatumber : [''],
        IsActive : [1]
      }),
      InvoiceAmount : this.formbulider.group({
        Id : [0],
        InvoiceHdrId : [0],
        TaxableValue : [0],
        Vatamount : [0],
        TotalAmount : [0],
        IsActive : [1]
      }),
    })
    console.log(this.Form.value)
    this.route.queryParams.subscribe(params => {
      if(params['id'] != null){
        this.LoadById(params['id'])
      }
    })
    this.AddInvoiceItem()
  }
  LoadById(id : any){
    this.service.GetById(id).subscribe(data => {
      console.log(data);
      this.f.Id.setValue(data.id)
      this.f.Number.setValue(data.number)
      this.f.NumberDisplay.setValue(data.numberDisplay)
      this.f.CreatedDate.setValue((data.createdDate))
      this.f.IsActive.setValue(data.isActive)
      this.f.EntryDate.setValue(data.entryDate)
      this.f.CustomerDetails.get('Name').setValue(data.customerDetails.name)
      this.f.CustomerDetails.get('InvoiceHdrId').setValue(data.customerDetails.invoiceHdrId)
      this.f.CustomerDetails.get('Address').setValue(data.customerDetails.address)
      this.f.CustomerDetails.get('Id').setValue(data.customerDetails.id)
      this.f.CustomerDetails.get('Vatumber').setValue(data.customerDetails.vatumber)
      this.f.CustomerDetails.get('IsActive').setValue(data.customerDetails.isActive)
      this.f.InvoiceAmount.get('Id').setValue(data.invoiceAmount.id)
      this.f.InvoiceAmount.get('InvoiceHdrId').setValue(data.invoiceAmount.invoiceHdrId)
      this.f.InvoiceAmount.get('IsActive').setValue(data.invoiceAmount.isActive)
      this.f.InvoiceAmount.get('TaxableValue').setValue(data.invoiceAmount.taxableValue)
      this.f.InvoiceAmount.get('TotalAmount').setValue(data.invoiceAmount.totalAmount)
      this.f.InvoiceAmount.get('Vatamount').setValue(data.invoiceAmount.vatamount)

      this.SetInvoiceItemsList(data.invoiceItems)
     console.log(this.f.value);

    })
  }
DeleteItem(i : any){
  if(this.invitems.length > 1)
  this.invitems.removeAt(i)
}
SetInvoiceItemsList(item : any){
  const arrayFG = item.map((itm : any) => this.formbulider.group({
    Id: [itm.id],
    InvoiceHdrId : [itm.invoiceHdrId],
    Description : [itm.description],
    Date : [itm.date],
    QtyPerDay : [itm.qtyPerDay],
    Vatpercentage : [itm.vatpercentage],
    TaxableValue : [itm.taxableValue],
    Vatamount: [itm.vatamount],
    TotalAmount : [itm.totalAmount],
    IsActive : [itm.isActive]
  }))

  const formArray = this.formbulider.array(arrayFG)
  this.Form.setControl('InvoiceItems', formArray);
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
      IsActive : [1],
    }))
  }
  Submit(){
    console.log(this.Form.value);
    let obj = this.Form.value
    //obj.EntryDate = moment.utc(obj.EntryDate).toISOString();
    this.service.Create(obj).subscribe(data => {
      if(data.isSuccess){
        this.BackToList();
      }
    })

  }
  BackToList(){
    this.router.navigate(['hrms/hrmdashboard'])
  }
  Delete(){
    let FormId = this.f.Id.value
    let deleteList = []
    deleteList.push(FormId)
    console.log(deleteList)
    this.service.Delete(deleteList).subscribe(data =>{
      if(data.isSuccess){
        this.BackToList();
      }
    })
  }

  openDatePicker(datepicker: MatDatepicker<Date>): void {
    datepicker.open();
  }
  ChangeEntryDate(evt : string){
    var dt = evt.split('/')
    var newdate = new Date(dt[2] + "-" + dt[1] + "-" + dt[0])

    this.f.EntryDate.setValue(moment.utc(newdate, "DD/MM/YYYY").toDate())
    console.log(this.f.EntryDate.value);

  }
  ChangeDateInvoiceContents(evt : string , i : number){
    var dt = evt.split('/')
    var newdate = new Date(dt[2] + "-" + dt[1] + "-" + dt[0])
    this.invitems?.at(i)?.get('Date')?.setValue(newdate)
  }
   LoadTax(){
     this.taxservice.GetAll().subscribe(data => {
      this.taxList = data
      var k = this.GetVat5()
      if( k != undefined){
      this.f.SelectedTaxId.setValue(k.id)
      }
      else{
        this.f.SelectedTaxId.setValue(this.taxList[0].id)
      }
      this.SelectedTax()
    })
  }

  GetVat5(){
    var item = this.taxList.find(x => x.name.includes('5' ))
    return item

  }
  SelectedTax(){
   this.SelectedTaxItem = this.taxList.find(x => x.id == this.f.SelectedTaxId.value)
   if(this.SelectedTaxItem != null && this.SelectedTaxItem != undefined){
    return this.SelectedTaxItem.taxGroupChildsList[0].rate
   }else{
    return 0
   }

  }
}
