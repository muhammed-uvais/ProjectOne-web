import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Documentmanagerhdr } from 'src/app/Core/Models/Documentmanagerhdr';
import { CompanyService } from 'src/app/services/settings/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent  implements OnInit{
  Form: FormGroup | any;
  constructor(
    private formbulider: FormBuilder,
    private router: Router,
    private cmpnyservive : CompanyService,
    private route: ActivatedRoute,) { }
    get f() { return this.Form.controls; }
    get bank() { return this.f.CompanyMasterBankDetails as FormArray; }
  ngOnInit(): void {

    this.Form = this.FormConfig()
   this.AddBank()
   this.GetDefaultCompany()
  }
  FormConfig() {
    return this.formbulider.group({
      Id: [0],
      Name: [''],
      Website: [''],
      Phone: [''],
      Fax: [''],
      Email: [''],
      IsDefault: [1],
      VatNumber: [''],
      IsActive: ['1'],
      CompanyMasterBankDetails: new FormArray([])

    })
  }
  AddBank() {
    this.bank.push(this.formbulider.group({
      Id: [0],
      CompanyMasterId: [this.Form.value.Id],
      BankName: [''],
      BankAccountName: [''],
      BankAccountNumber: [''],
      IBANNumber: [''],
      BankIFSC: [''],
      IsActive: [1]
    }));
  }
  setList(item : any) {

    const arrayFG = item.map
    ((itm: any
      ) => this.formbulider.group({
      Id: [itm.id],
      CompanyMasterId: [itm.companyMasterId],
      BankName: [itm.bankName],
      BankAccountName: [itm.bankAccountName],
      BankAccountNumber: [itm.bankAccountNumber],
      IBANNumber: [itm.ibannumber],
      BankIFSC: [itm.bankIfsc],
      IsActive: [itm.isActive],
    }))

    const formArray = this.formbulider.array(arrayFG)
    this.Form.setControl('CompanyMasterBankDetails', formArray);
  }





Submit(){
  let obj = (this.Form.value);
  this.cmpnyservive.CreateDefaultCompany(obj).subscribe(data => {
    console.log(data);

  })
}
GetDefaultCompany(){
  this.cmpnyservive.GetDefaultCompany().subscribe(data => {
    console.log(data);
     this.Form.controls['Name'].setValue(data.name)
     this.Form.controls['Email'].setValue(data.email)
     this.Form.controls['Fax'].setValue(data.fax)
     this.Form.controls['Id'].setValue(data.id)
     this.Form.controls['IsActive'].setValue(data.isActive)
     this.Form.controls['IsDefault'].setValue(data.isDefault)
     this.Form.controls['Phone'].setValue(data.phone)
     this.Form.controls['VatNumber'].setValue(data.vatNumber)
     this.Form.controls['Website'].setValue(data.website)
    this.setList(data.companyMasterBankDetails)


  })
}
BackTo(){
  this.router.navigate(['/hrms/hrmdashboard'])
}
}
