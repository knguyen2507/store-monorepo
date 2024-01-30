import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import * as Notiflix from 'notiflix';
import { AlertService } from '../../services';

@Component({
  selector: 'app-upload-album',
  templateUrl: './upload-album.component.html',
  styleUrls: ['./upload-album.component.scss'],
})
export class UploadAlbumComponent implements OnChanges, AfterViewChecked {
  // Số hình ảnh được hiển thị: chỉ nhận 3 (chưa code thêm :>);
  @Input()
  numShowedImages!: number;
  // 'row' nếu danh sách hình ảnh nằm bên phải ảnh chi tiết
  // 'column' nếu danh sách hình ảnh nằm dưới ảnh chi tiết
  // Hiện tại truyền mặc định là 'row' (chưa code thêm :>)
  @Input()
  directionComponent!: string;
  // Tiêu đề
  @Input() title = '';
  @Input() required = false;

  @Input() productImages: any = [];
  @Output() avt = new EventEmitter();
  @Output() listImages = new EventEmitter();
  @Output() imagesUpdated = new EventEmitter();

  imagesUpdate: any[] = [];
  images: any[] = [];
  @ViewChild('listImages') lightGallery0!: any;
  @ViewChild('mainImage') lightGallery1!: any;
  private needRefresh = false;
  hide = 'hideList';

  constructor(private alertService: AlertService) {}

  settings0 = {
    counter: true,
    plugins: [lgZoom],
  };
  onBeforeSlide0 = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
  onInit0 = (detail: any): void => {
    this.lightGallery0 = detail.instance;
  };
  settings1 = {
    counter: true,
    plugins: [lgZoom],
  };
  onBeforeSlide1 = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
  onInit1 = (detail: any): void => {
    this.lightGallery1 = detail.instance;
  };
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery0.refresh(this.images);
      this.lightGallery1.refresh(this.images);
      this.needRefresh = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes['productImages'].currentValue) {
        changes['productImages'].currentValue.forEach(
          (i: { id: any; url: any; name: any; isMain: any; compressUrl: any }) => {
            if (i.isMain) {
              this.avt.emit(i.name);
            }
            this.images.push({
              id: i.id,
              src: i.url,
              thumb: i.compressUrl,
              subHtml: i.name,
              show: this.images.length < 3 ? '' : 'hide',
              showDetail: this.images.length === 0 ? '' : 'hide',
              isAvt: i.isMain,
            });
          },
        );
        if (this.images.length > 0) {
          this.hide = '';
        }
        this.needRefresh = true;
      }
    });
  }

  onImageSelected(e: any) {
    if (e.target.files) {
      if (e.target.files.length + this.images.length > 10) {
        Notiflix.Notify.failure('Chỉ được tải tối đa 10 hình ảnh');
        return;
      }
      const listFiles: any[] = [];
      if (this.imagesUpdate.length > 0) {
        this.imagesUpdated.emit(this.imagesUpdate);
      }
      for (let i = 0; i < e.target.files.length; i++) {
        const str = e.target.files[i].name.split('.');
        if (str[str.length - 1] !== 'png' && str[str.length - 1] !== 'jpg') {
          Notiflix.Notify.failure('Chỉ nhận hình ảnh có phần mở rộng là .png hoặc .jpg');
          return;
        }
      }
      for (let i = 0; i < e.target.files.length; i++) {
        listFiles.push(e.target.files[i]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (event: any) => {
          this.images.push({
            src: event.target.result,
            thumb: event.target.result,
            file: e.target.files[i],
            subHtml: e.target.files[i].name,
            show: this.images.length < 3 ? '' : 'hide',
            showDetail: this.images.length === 0 ? '' : 'hide',
            isAvt: this.images.length === 0 ? true : false,
          });
          this.needRefresh = true;
          if (this.images[this.images.length - 1].isAvt) {
            this.avt.emit(e.target.files[i].name);
          }
        };
      }
      this.hide = '';
      this.listImages.emit(listFiles);
    }
  }

  checkShow(i: any | undefined) {
    if (i) {
      return i.show;
    }
    return 'hide';
  }

  getSrc(i: any) {
    if (i) {
      return i?.src;
    }
    return '';
  }

  checkAction(i: number) {
    const idx = this.images.findIndex((item) => item.show === '');
    if (idx === -1) {
      return 'hide';
    }
    if (!this.images[idx + i]) {
      return 'hide';
    }
    return '';
  }

  checkAvt(i: number) {
    const idx = this.images.findIndex((item) => item.show === '');
    if (idx === -1) return false;
    if (this.images[idx + i]) return this.images[idx + i].isAvt;
    return false;
  }

  changeShowImage(i: number) {
    const idx = this.images.findIndex((item) => item.showDetail === '');
    this.images[idx].showDetail = 'hide';
    this.images[i].showDetail = '';
  }

  changeAvtImage(i: number) {
    this.images.forEach((item) => {
      item.isAvt = false;
    });
    const idx = this.images.findIndex((item) => item.show === '');
    this.images[idx + i].isAvt = true;
    this.avt.emit(this.images[idx + i].subHtml);
  }

  prevImages() {
    const idx = this.images.findIndex((item) => item.show === '');
    if (idx === 0) return;
    this.images[idx - 1].show = '';
    this.images[idx + 2].show = 'hide';
  }

  nextImages() {
    const idx = this.images.findIndex((item) => item.show === '');
    if (idx + 3 >= this.images.length) return;
    this.images[idx].show = 'hide';
    this.images[idx + 3].show = '';
  }

  removeImage(i: number) {
    const idx = this.images.findIndex((item) => item.show === '');
    if (this.images[idx + i].isAvt) {
      Notiflix.Notify.failure('Không thể xóa hình đại diện');
      return;
    }
    const text = this.images[idx + i].subHtml;
    this.alertService.fireHardDelete({ text });
    const sub = this.alertService.hardDeleteConfirm$.subscribe((confirm) => {
      if (confirm) {
        if (this.images[idx + i].showDetail === '') {
          if (idx + i === this.images.length - 1) {
            this.images[idx + i - 1].showDetail = '';
          } else {
            this.images[idx + i + 1].showDetail = '';
          }
        }

        if (this.images.length > 3) {
          if (idx === this.images.length - 3) {
            this.images[idx - 1].show = '';
          } else {
            this.images[idx + 3].show = '';
          }
        }

        if (this.images[idx + i].id) this.imagesUpdate.push(this.images.splice(idx + i, 1)[0].id);
        //
        // ----------------------------------
        //
        // // const lastIdx = this.images.findIndex((item) => item.src === this.showImages[this.showImages.length - 1]);
        // // if (this.images[idx + i].id) {
        // //   this.uploadImagesService.deleteImageById(this.images[idx + i].id as number).subscribe();
        // // }
        // if (this.images[idx + i].showDetail === '') {
        //   if (idx + i === this.images.length - 1) {
        //     this.images[idx + i - 1].showDetail = '';
        //   } else {
        //     this.images[idx + i + 1].showDetail = '';
        //   }
        // }
        // if (idx + i === this.images.length - 1) {
        //   if (idx !== 0) {
        //     this.images[idx - 1].show = '';
        //   }
        // } else {
        //   if (this.images.length > 3) {
        //     this.images[idx + 3].show = '';
        //   }
        // }
        // // this.showImages.splice(this.showImages.indexOf(i), 1);
        // this.images.splice(idx + i, 1);
        this.needRefresh = true;
        this.imagesUpdated.emit(this.imagesUpdate);
      }
      sub.unsubscribe();
    });
  }
}
