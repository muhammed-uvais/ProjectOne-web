import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxgroupService } from 'src/app/services/settings/taxgroup.service';

@Component({
  selector: 'app-taxgroup',
  templateUrl: './taxgroup.component.html',
  styleUrls: ['./taxgroup.component.css']
})
export class TaxgroupComponent implements OnInit {
  Form: FormGroup | any;
  TaxTypeList : any[] = []
  constructor(private formbulider: FormBuilder,
    private route: ActivatedRoute,
    private service: TaxgroupService,
    private router: Router,){}
    get f() { return this.Form.controls; }
    get child() { return this.f.TaxGroupChildsList as FormArray; }
  ngOnInit(): void {
    this.Form = this.formbulider.group({
      Id : [0],
      Name : ['',],
      TaxTypeId : ['1'],
      IsActive : [1],
      TaxGroupChildsList: new FormArray([])
    })
    this.AddTaxGroupChildsList()
    this.route.queryParams.subscribe(params => {
      if(params['id'] != null){
        this.LoadTaxGroup(params['id'])
      }
    })
  }
  AddTaxGroupChildsList() {
    this.child.push(this.formbulider.group({
      Id: [0],
      TaxGroupId: [this.Form.value.Id],
      //Name: ['', [Validators.required]],
      Name: ['VAT'],
      Rate: [''],
      IsActive: [1]
    }));
  }
  LoadTaxGroup(id: string) {
    this.service.GetById(id).subscribe(data => {
      debugger
      if(data.id > 0){
        this.Form.controls['Id'].setValue(data.id)
        this.Form.controls['Name'].setValue(data.name)
        this.Form.controls['TaxTypeId'].setValue(data.taxTypeId)
        this.Form.controls['IsActive'].setValue('1')
        //this.selectedItems.push(data)
        this.setTaxGroupChildsList(data.taxGroupChildsList)
      }
    });
  }
  setTaxGroupChildsList(item : any) {
    const arrayFG = item.map((itm: { id: any; name: any; rate: any; }) => this.formbulider.group({
      Id: itm.id,
      TaxGroupId: [this.Form.value.Id],
      Name: [itm.name],
      Rate: [itm.rate],
      IsActive: [1]
    }))
    const formArray = this.formbulider.array(arrayFG)
    this.Form.setControl('TaxGroupChildsList', formArray);
  }
  RemoveTaxGroupChildsList(i : number) {
    this.child.removeAt(i);
  }
  onRestForm() {


  }
  Submit(){
    const obj = this.Form.value;
    this.Create(obj)
  }
  Create(obj: any) {
    this.service.Create(obj).subscribe(data => {
      console.log(data);
      if(data.isSuccess){
        this.backToList()
      }

  })}
  backToList() {
    this.router.navigate(["/settings/taxgrouplist"]);
  }
  DeleteByID(){
    const deleteId = (this.Form.value.Id)
    this.service.DeleteByID(deleteId).subscribe(data => {
      this.backToList()
    })
  }
}
