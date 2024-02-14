import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GeneralStatusEnum } from '../../enum/status.general.enum';
import { AlertService } from '../../services';

@Component({
  selector: 'app-templete-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @ViewChild('createSwal')
  public readonly createSwal!: SwalComponent;
  @ViewChild('updateSwal')
  public readonly updateSwal!: SwalComponent;
  @ViewChild('softDeleteSwal')
  public readonly softDeleteSwal!: SwalComponent;
  @ViewChild('hardDeleteSwal')
  public readonly hardDeleteSwal!: SwalComponent;

  createText!: string;
  updateText!: string;
  softDeleteText!: string;
  hardDeleteText!: string;

  constructor(private alertService: AlertService) {
    this.alertService.create$.subscribe((text: string) => {
      this.createText = `Tạo mới ${text}`;
      setTimeout(() => {
        this.createSwal.fire();
      }, 0);
    });
    this.alertService.update$.subscribe((text: string) => {
      this.updateText = `Cập nhật ${text}`;
      setTimeout(() => {
        this.updateSwal.fire();
      }, 0);
    });

    this.alertService.softDelete$.subscribe(
      ({ text, status }: { text: string; status: GeneralStatusEnum | string }) => {
        if (typeof status === 'string') {
          this.softDeleteText = `Thay đổi trạng thái ${text}`;
        } else {
          this.softDeleteText = `${status === GeneralStatusEnum.Active ? 'Kích hoạt' : 'Ngừng kích hoạt'} ${text}`;
        }
        setTimeout(() => {
          this.softDeleteSwal.fire();
        }, 0);
      },
    );

    this.alertService.hardDelete$.subscribe(({ text }: { text: string }) => {
      this.hardDeleteText = `Xác nhận xóa ${text} (Không thể hoàn tác)`;
      setTimeout(() => {
        this.hardDeleteSwal.fire();
      }, 0);
    });
  }

  createConfirm() {
    this.alertService.createConfirm(true);
  }
  createDismiss() {
    this.alertService.createConfirm(false);
  }
  createDeny() {
    this.alertService.createConfirm(false);
  }

  updateConfirm() {
    this.alertService.updateConfirm(true);
  }
  updateDismiss() {
    this.alertService.updateConfirm(false);
  }
  updateDeny() {
    this.alertService.updateConfirm(false);
  }

  softDeleteConfirm() {
    this.alertService.softDeleteConfirm(true);
  }
  softDeleteDismiss() {
    this.alertService.softDeleteConfirm(false);
  }
  softDeleteDeny() {
    this.alertService.softDeleteConfirm(false);
  }

  hardDeleteConfirm() {
    this.alertService.hardDeleteConfirm(true);
  }
  hardDeleteDismiss() {
    this.alertService.hardDeleteConfirm(false);
  }
  hardDeleteDeny() {
    this.alertService.hardDeleteConfirm(false);
  }
}
