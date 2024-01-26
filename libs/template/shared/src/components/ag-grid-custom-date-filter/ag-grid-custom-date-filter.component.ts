import { Component } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-ag-grid-custom-date-filter',
  templateUrl: './ag-grid-custom-date-filter.component.html',
  styleUrls: ['./ag-grid-custom-date-filter.component.scss'],
})
export class AgGridCustomDateFilterComponent implements IFilterAngularComp {
  params!: IFilterParams;
  valueType = 'date';
  range = false;
  fromDate!: Moment | null;
  toDate!: Moment | null;
  picker!: Moment | null;
  pickerRange!: DateRange<Moment> | null;
  rangePickPosition: 'start' | 'end' = 'start';

  isCustom = false;

  constructor() {
    this.resetPicker();
  }

  resetPicker() {
    this.picker = null;
    this.pickerRange = null;
    this.fromDate = null;
    this.toDate = null;
  }

  agInit(params: IFilterParams): void {
    this.params = params;

    this.isCustom = (params as any).isCustom;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doesFilterPass(params: IDoesFilterPassParams) {
    const passed = true;
    return passed;
  }

  isFilterActive(): boolean {
    if (this.range) {
      if (this.fromDate && this.toDate) {
        return true;
      }
    } else {
      if (this.picker) {
        return true;
      }
    }
    return false;
  }

  getModel() {
    if (!this.isFilterActive()) {
      return null;
    }
    let fromDate, toDate;
    if (this.range) {
      fromDate = this.fromDate?.startOf('day').toDate();
      toDate = this.toDate?.endOf('day').toDate();
    } else {
      fromDate = this.picker?.startOf('day').toDate();
      toDate = this.picker?.endOf('day').toDate();
    }

    return {
      valueType: this.valueType,
      fromDate,
      toDate,
      isCustom: this.isCustom,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setModel(model: any) {}

  onSelectedChange(selectedDate: Moment) {
    if (this.range) {
      if (this.rangePickPosition === 'start') {
        this.fromDate = selectedDate;
        this.toDate = null;
        this.rangePickPosition = 'end';
      } else {
        if (moment(selectedDate).isBefore(this.fromDate)) {
          this.fromDate = selectedDate;
          this.toDate = null;
          this.rangePickPosition = 'end';
        } else {
          this.toDate = selectedDate;
          this.rangePickPosition = 'start';
        }
      }
      this.pickerRange = new DateRange(this.fromDate, this.toDate);
    } else {
      this.picker = selectedDate;
    }
  }

  onClear() {
    this.resetPicker();
    this.params.filterChangedCallback();
  }
  onApply() {
    this.params.filterChangedCallback();
  }
}
