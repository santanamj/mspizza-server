import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';

@Component({
  selector: 'upload-product',
  templateUrl: 'upload-product.html'
})
export class UploadProductComponent implements OnInit{
  @ViewChild('files') fileElement: ElementRef;
  public hasBaseDropZoneOver: boolean;
  public uploader: FileUploader;
  constructor() {}
  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }
  ngOnInit(){
    this.uploader = new FileUploader({});
    this.hasBaseDropZoneOver = false;
  }
  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }
}
