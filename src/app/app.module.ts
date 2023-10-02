import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HrmsModule } from './hrms/hrms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './Core/Helpers/jwt.interceptor';
import { ResponseInterceptor } from './Core/Helpers/response.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,ReactiveFormsModule, BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },

      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
