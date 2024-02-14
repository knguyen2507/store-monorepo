import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgGridModule } from 'ag-grid-angular';
import { LightgalleryModule } from 'lightgallery/angular';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  AgGridCustomDateFilterComponent,
  AgGridCustomSetFilterComponent,
  AgGridCustomTextFilterComponent,
  AlertComponent,
  ListItemComponent,
  PaginatorAdminComponent,
  PaginatorComponent,
  TemplateRendererComponent,
  UploadAlbumComponent,
} from './components';

const matModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatSelectModule,
  MatPaginatorModule,
  MatCardModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatDialogModule,
];

const modules = [
  FlexLayoutModule,
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
  NgSelectModule,
  NgxPaginationModule,
  GalleryModule,
  LightboxModule,
  ReactiveFormsModule,
  AgGridModule,
  LightgalleryModule,
];

const components = [
  PaginatorComponent,
  ListItemComponent,
  PaginatorAdminComponent,
  AgGridCustomTextFilterComponent,
  AgGridCustomSetFilterComponent,
  AgGridCustomDateFilterComponent,
  TemplateRendererComponent,
  UploadAlbumComponent,
  AlertComponent,
];

@NgModule({
  declarations: components,
  imports: [...matModules, ...modules, SweetAlert2Module.forRoot()],
  exports: [...matModules, ...modules, ...components],
})
export class SharedModule {}
