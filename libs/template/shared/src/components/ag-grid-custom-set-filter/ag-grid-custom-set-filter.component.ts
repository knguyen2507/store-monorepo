import { Component, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-custom-set-filter',
  templateUrl: './ag-grid-custom-set-filter.component.html',
  styleUrls: ['./ag-grid-custom-set-filter.component.scss'],
})
export class AgGridCustomSetFilterComponent implements IFilterAngularComp {
  params!: IFilterParams;
  filterText = '';

  valueType = 'set';

  originalList = [] as any[];
  filteredList = [] as any[];

  selectedIds = [] as any[];
  searchDisabled = false;

  allSelect = false;

  @ViewChild('selection') private selection!: MatSelectionList;

  isCustom = false;

  agInit(params: IFilterParams): void {
    this.params = params;

    this.originalList = (params as any).itemList;
    this.filteredList = (params as any).itemList;

    this.isCustom = (params as any).isCustom;
    this.searchDisabled = (params as any).searchDisabled;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doesFilterPass(params: IDoesFilterPassParams) {
    const passed = true;
    return passed;
  }

  isFilterActive(): boolean {
    return this.selectedIds != null && this.selectedIds.length > 0;
  }

  getModel() {
    if (!this.isFilterActive()) {
      return null;
    }

    return {
      value: this.selectedIds,
      valueType: this.valueType,
      isCustom: this.isCustom,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setModel(model: any) {}

  onFilterChanged() {
    this.filterText
      ?.toLowerCase()
      .split(' ')
      .forEach((filterWord) => {
        this.filteredList = this.originalList.filter((i) =>
          i.label.toLowerCase().includes(filterWord)
        );
      });
  }
  onAllSelectChange() {
    this.allSelect ? this.selection.selectAll() : this.selection.deselectAll();
  }
  onSelectionChange() {
    this.allSelect = this.selectedIds.length === this.filteredList.length;
  }
  onClear() {
    this.filterText = '';
    this.onFilterChanged();
    this.selectedIds = [];
    this.allSelect = false;
    this.params.filterChangedCallback();
  }
  onApply() {
    this.params.filterChangedCallback();
  }
}
