import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneralStatusEnum } from '../enum/status.general.enum';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  create$: Subject<string> = new Subject<string>();
  createConfirm$: Subject<boolean> = new Subject<boolean>();
  fireCreate(data: string) {
    this.create$.next(data);
  }
  createConfirm(data: boolean) {
    this.createConfirm$.next(data);
  }

  update$ = new Subject<string>();
  updateConfirm$ = new Subject<boolean>();
  fireUpdate(data: string) {
    this.update$.next(data);
  }
  updateConfirm(data: boolean) {
    this.updateConfirm$.next(data);
  }

  softDelete$ = new Subject<{
    text: string;
    status: GeneralStatusEnum | string;
  }>();
  softDeleteConfirm$ = new Subject<boolean>();
  fireSoftDelete(data: { text: string; status: GeneralStatusEnum | string }) {
    this.softDelete$.next(data);
  }
  softDeleteConfirm(data: boolean) {
    this.softDeleteConfirm$.next(data);
  }

  hardDelete$ = new Subject<{ text: string }>();
  hardDeleteConfirm$ = new Subject<boolean>();
  fireHardDelete(data: { text: string }) {
    this.hardDelete$.next(data);
  }
  hardDeleteConfirm(data: boolean) {
    this.hardDeleteConfirm$.next(data);
  }
}
