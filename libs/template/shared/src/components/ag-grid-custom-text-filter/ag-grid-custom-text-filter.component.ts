/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-custom-text-filter',
  templateUrl: './ag-grid-custom-text-filter.component.html',
  styleUrls: ['./ag-grid-custom-text-filter.component.scss'],
})
export class AgGridCustomTextFilterComponent implements IFilterAngularComp {
  params!: IFilterParams;
  filterText = '';

  valueType = '';

  isCustom = false;

  agInit(params: IFilterParams): void {
    this.params = params;

    this.valueType = (params as any).valueType;

    this.isCustom = (params as any).isCustom;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    const passed = true;
    return passed;
  }

  isFilterActive(): boolean {
    return this.filterText != null && this.filterText !== '';
  }

  getModel() {
    if (!this.isFilterActive()) {
      return null;
    }

    return {
      value: this.filterText,
      valueType: this.valueType,
      isCustom: this.isCustom,
    };
  }

  setModel(model: any) {
    this.filterText = model == null ? null : model.value;
  }

  onClear() {
    this.filterText = '';
    this.params.filterChangedCallback();
  }
  onApply() {
    this.params.filterChangedCallback();
  }
}
