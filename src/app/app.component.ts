import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked  {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  title = 'projectone';
  constructor(private loaderService: LoaderService,
    private ref: ChangeDetectorRef,) {
  }
  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

}
