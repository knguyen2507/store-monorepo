import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListItemComponent } from './components/list-item/list-item.component';
import { PaginatorAdminComponent } from './components/paginator-admin/paginator.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

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
  FlexLayoutModule,
];

const modules = [
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
];

const components = [
  PaginatorComponent,
  ListItemComponent,
  PaginatorAdminComponent,
];

@NgModule({
  declarations: components,
  imports: [...matModules, ...modules],
  exports: [...matModules, ...modules, ...components],
})
export class SharedModule {}
