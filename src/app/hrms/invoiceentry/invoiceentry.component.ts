import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import * as moment from 'moment';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { TaxgroupService } from 'src/app/services/settings/taxgroup.service';
import { CompanyService } from 'src/app/services/settings/company.service';
import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
interface CustomerDetailsList {
  Id: number;
  Name: string;
  Address: string;
  Email: string;
  Phone: string;
  Vatumber: string;
}
@Component({
  selector: 'app-invoiceentry',
  templateUrl: './invoiceentry.component.html',
  styleUrls: ['./invoiceentry.component.css']
})
export class InvoiceentryComponent implements OnInit,AfterContentChecked {
  AutocmpCtrl = new FormControl();
  Form: FormGroup | any;
  panelOpenState = false;
  taxList: any[] = [];
  customerList : any[]=[]
  SelectedTaxItem : any
  vatrate: any;
  pdfData!: Blob;
  vatNumber: any;
  CustomerDetailList!: Observable<any[]>;
  constructor(private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private companyservice : CompanyService,
    private service : InvoiceService,
    private taxservice : TaxgroupService,
    private cdref: ChangeDetectorRef,
    private router: Router,){

  }
  get f() { return this.Form.controls; }
  get invitems () { return this.f.InvoiceItems as FormArray; }
  async ngOnInit() {
    this.GetCustomerByName('fetchall')
    this.CustomerDetailList = this.AutocmpCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.GetVAT()
   // this.LoadTax()

    //this.LoadTaxasync()
    this.Form = this.formbulider.group({
      Id : [0],
      Number : [0],
      DisableTRN : [false],
      InvoiceCustomerDetailsId : [0],
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
        Phone : [''],
        Email : [''],
        IsActive : [1]
      }),
      InvoiceAmount : this.formbulider.group({
        Id : [0],
        InvoiceHdrId : [0],
        TaxableValue : [0],
        Vatamount : [0],
        Vatexcludedamount : [0],
        TotalAmount : [0],
        IsActive : [1]
      }),
    })
    await this.LoadTaxsync()
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
      this.f.DisableTRN.setValue(data.disableTrn == 1 ? true : false)
      this.f.Number.setValue(data.number)
      this.f.NumberDisplay.setValue(data.numberDisplay)
      this.f.InvoiceCustomerDetailsId.setValue(data.invoiceCustomerDetailsId)
      this.f.CreatedDate.setValue((data.createdDate))
      this.f.IsActive.setValue(data.isActive)
      this.f.EntryDate.setValue(data.entryDate)
      this.f.CustomerDetails.get('Name').setValue(data.customerDetails.name)
      this.f.CustomerDetails.get('Address').setValue(data.customerDetails.address)
      this.f.CustomerDetails.get('Id').setValue(data.customerDetails.id)
      this.f.CustomerDetails.get('Vatumber').setValue(data.customerDetails.vatumber)
      this.f.CustomerDetails.get('Phone').setValue(data.customerDetails.phone)
      this.f.CustomerDetails.get('Email').setValue(data.customerDetails.email)
      this.f.CustomerDetails.get('IsActive').setValue(data.customerDetails.isActive)
      this.f.InvoiceAmount.get('Id').setValue(data.invoiceAmount.id)
      this.f.InvoiceAmount.get('InvoiceHdrId').setValue(data.invoiceAmount.invoiceHdrId)
      this.f.InvoiceAmount.get('IsActive').setValue(data.invoiceAmount.isActive)
      this.f.InvoiceAmount.get('TaxableValue').setValue(data.invoiceAmount.taxableValue)
      this.f.InvoiceAmount.get('TotalAmount').setValue(data.invoiceAmount.totalAmount)
      this.f.InvoiceAmount.get('Vatamount').setValue(data.invoiceAmount.vatamount)
      this.f.InvoiceAmount.get('Vatexcludedamount').setValue(data.invoiceAmount.vatexcludedamount)
      this.SetInvoiceItemsList(data.invoiceItems)
      this.CalculateWholeAmounts()
     // this.disableControlByName('Vatamount')
    })
  }
DeleteItem(i : any){
  if(this.invitems.length > 1)
  this.invitems.removeAt(i)
  this.CalculateWholeAmounts()
}
SetInvoiceItemsList(item : any){
  const arrayFG = item.map((itm : any) => this.formbulider.group({
    Id: [itm.id],
    InvoiceHdrId : [itm.invoiceHdrId],
    Description : [itm.description],
    Date : [itm.date],
    QtyPerDay : [itm.qtyPerDay],
    Price : [itm.price],
    Parking : [itm.parking],
    Salik : [itm.salik],
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
      Parking : [0],
      Salik : [0],
      Price : [0],
      Vatpercentage : [this.vatrate],
      TaxableValue : [0],
      Vatamount:  [0],
      TotalAmount : [0],
      IsActive : [1],
    }))
  }
  Submit(){
    debugger
    console.log(this.Form.value);
    let obj = this.Form.value
    obj.DisableTRN = obj.DisableTRN == true ? 1 : 0
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
      this.vatrate = this.SelectedTax()
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

async LoadTaxsync() {


  try {
    this.taxList = await this.taxservice.GetAll1();
    console.log('1');
    if(this.taxList){
      var k = this.GetVat5()
      if( k != undefined){
        this.f.SelectedTaxId.setValue(k.id)
        this.vatrate = this.SelectedTax()
      }
      else{
        this.f.SelectedTaxId.setValue(this.taxList[0].id)
      }
    }

  } catch (error) {

    // Handle the error
  }
}
ngAfterContentChecked(){
  this.cdref.detectChanges();
}
 calculateSumOfProperty(formArray: FormArray, propertyName: string): number {
  let sum = 0;

  // Loop through each control in the FormArray
  for (let i = 0; i < formArray.length; i++) {
    const control = formArray.at(i);

    // Get the value of the specified property and add it to the sum
    const propertyValue = control.get(propertyName)?.value;
    if (typeof propertyValue === 'number') {
      sum += propertyValue;
    }
  }

  return sum;
}
PriceChange(item : any , i : number){
let itemPrice = 0;
let itemTaxableTotal = 0;
itemPrice = (item.value.QtyPerDay  * item.value.Price);
itemTaxableTotal = itemPrice + item.value.Parking;

this.invitems?.at(i)?.get('TaxableValue')?.setValue(itemTaxableTotal);
this.CalculateInlineAmount(item,i)
}
CalculateInlineAmount(item : any , i : number){

let vatAmt = 0;
let TotalAmt = 0;
vatAmt = ((item.value.Vatpercentage / 100 ) * item.value.TaxableValue );
TotalAmt = item.value.TaxableValue + vatAmt + item.value.Salik;
this.invitems?.at(i)?.get('Vatamount')?.setValue(vatAmt)
this.invitems?.at(i)?.get('TotalAmount')?.setValue(TotalAmt)
this.CalculateWholeAmounts()
}
CalculateWholeAmounts(){
  let TotalTaxableAmt = 0;
  let totalVatAmt = 0;
  let totalTotalAmt = 0;
  let totalTotalAmtFinal = 0;
  let totalVAtExclued = 0;
  TotalTaxableAmt = this.calculateSumOfProperty(this.invitems,'TaxableValue')
  totalVatAmt = this.calculateSumOfProperty(this.invitems,'Vatamount')
  totalTotalAmt = this.calculateSumOfProperty(this.invitems,'TotalAmount')
  totalVAtExclued = this.calculateSumOfProperty(this.invitems,'Salik')

  this.f.InvoiceAmount.get('TaxableValue').setValue(TotalTaxableAmt)
  this.f.InvoiceAmount.get('Vatamount').setValue(totalVatAmt)
  this.f.InvoiceAmount.get('Vatexcludedamount').setValue(totalVAtExclued)
  this.f.InvoiceAmount.get('TotalAmount').setValue(totalTotalAmt)
}
disableControlByName(controlName: string) {
  this.invitems.controls.forEach(element => {
    element.get(controlName)?.disable()
  });
}

PDF() {
  this.service.GetPdf(this.f.Id.value).subscribe(response => {
    this.pdfData = response;this.downloadPDF()
    //this.displayPDF();
  }, error => {
    console.error('Error fetching PDF:', error);
  });
}

displayPDF() {
  const fileURL = URL.createObjectURL(this.pdfData);
}
downloadPDF() {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(this.pdfData);
  downloadLink.download = 'Invoice.pdf'; // Replace 'your-pdf-file-name' with the desired file name
  downloadLink.click();
}
GetVAT(){

  this.companyservice.GetDefaultCompany().subscribe(data => {
    console.log(data);
    this.vatNumber = data.vatNumber
  })
}
GetCustomerByName(name : string){
  this.service.GetCustomerSearchByName(name).subscribe(data =>{
    console.log(data);
    this.customerList = []
    this.customerList = data

  })
}
// get CustomerDetailList() : CustomerDetailsList[]{
// const ip = this.AutocmpCtrl.value
// const filterValue = ip ? ip.toLowerCase() : '';
// if(filterValue != ""){
//   this.GetCustomerByName(filterValue)
//   return this.customerList
// //   return this.customerList.filter((option: any) =>
// //   option.name.trim().toLowerCase().includes(filterValue)
// // );
// }
// else{
//   return this.customerList
// }
// }

private _filter(value: string): string[] {
  const filterValue = this._normalizeValue(value);
  return this.customerList.filter(street => this._normalizeValue(street.name).includes(filterValue));
}

private _normalizeValue(value: string): string {
  if(typeof(value) === 'object'){
    return ""
  }
  return value.toLowerCase().replace(/\s/g, '');
}
handleOptionSelected(event : MatAutocompleteSelectedEvent){
this.customerDetailsClear()
this.AutocmpCtrl.setValue(event.option.value.name)
let customerDetails = event.option.value
this.f.CustomerDetails.get('Name').setValue(customerDetails.name)
this.f.CustomerDetails.get('InvoiceHdrId').setValue(customerDetails.invoiceHdrId)
this.f.CustomerDetails.get('Address').setValue(customerDetails.address)
this.f.CustomerDetails.get('Id').setValue(customerDetails.id)
this.f.CustomerDetails.get('Vatumber').setValue(customerDetails.vatumber)
this.f.CustomerDetails.get('Phone').setValue(customerDetails.phone)
this.f.CustomerDetails.get('Email').setValue(customerDetails.email)
this.f.CustomerDetails.get('IsActive').setValue(customerDetails.isActive)


}
customerDetailsClear(){
this.AutocmpCtrl.setValue('')
this.f.CustomerDetails.get('Name').setValue('')
this.f.CustomerDetails.get('InvoiceHdrId').setValue('')
this.f.CustomerDetails.get('Address').setValue('')
this.f.CustomerDetails.get('Id').setValue('')
this.f.CustomerDetails.get('Vatumber').setValue('')
this.f.CustomerDetails.get('Phone').setValue('')
this.f.CustomerDetails.get('Email').setValue('')
this.f.CustomerDetails.get('IsActive').setValue('')
}
}

