import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaxgroupService } from 'src/app/services/settings/taxgroup.service';

@Component({
  selector: 'app-taxgrouplist',
  templateUrl: './taxgrouplist.component.html',
  styleUrls: ['./taxgrouplist.component.css']
})
export class TaxgrouplistComponent implements OnInit{
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['SerialNo','Name','ActionSection'];
  ListItems: any[] = [];
  constructor(
    private service: TaxgroupService,
    private router: Router,) { }
  ngOnInit(): void {
    this.onLoad()
  }
  applyFilter(event: Event) {
    var value = (event.target as HTMLInputElement).value;
    value = value.trim().toLowerCase();
    this.dataSource.filter = value;
  }
  onLoad() {
    this.service.GetAll().subscribe(data =>{
      this.ListItems = data;
      console.log(data);

      this.dataSource = new MatTableDataSource<any>(data);
    })
  }
  OnAdd() {
    this.router.navigate(["/settings/taxgroup"]);
  }
  OnEditClicked(element : any){
    console.log(element);
    this.router.navigate(["/settings/taxgroup"],{ queryParams: { id: element.id } })

  }
  Onback(){
    this.router.navigate(["/hrms/hrmdashboard"])
  }
  ForDeleteClicked(item : any){
    this.service.DeleteByID(item.id).subscribe(data => {
      console.log(data);
      this.onLoad()

    })
  }
}
