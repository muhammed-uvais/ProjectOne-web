import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.css']
})
export class CreateinvoiceComponent implements OnInit  {
  @ViewChild('content') content: ElementRef | any;
  ngOnInit(): void {

  }
  public convetToPDF()
  {
  var data = document.getElementById('mac') as HTMLElement;
  html2canvas(data,{ scale: 2 }).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var pageHeight = 295;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;

  const contentDataURL = canvas.toDataURL('image/png',1.0)
  let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  pdf.save('invoice.pdf'); // Generated PDF
  });
  }



}
