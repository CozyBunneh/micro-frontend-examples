import { Component } from '@angular/core';
import { GalleryFacade } from '@mf-app/shared/data-store';

@Component({
  selector: 'mf-app-gallery-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.less'],
})
export class RemoteEntryComponent {
  seals = this.galleryFacade.allGallery$ as any;
  selectedSeals = this.galleryFacade.selectedSeals$;

  constructor(private galleryFacade: GalleryFacade) {
  }

  toggleSelectedSeal(seal: any) {
    this.galleryFacade.toggleSelectSeal(seal);
  }

  isSelected(sealId: any) {
    return this.galleryFacade.isSealSelected(sealId);
  }
}
