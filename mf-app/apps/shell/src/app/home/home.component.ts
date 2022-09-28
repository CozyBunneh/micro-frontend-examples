import { Component } from '@angular/core';
import { GalleryFacade } from '@mf-app/shared/data-store';
import { map } from 'rxjs';

@Component({
  selector: 'mf-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  seals = this.galleryFacade.selectedSeals$.pipe(
    map((selectedSeals: any) => Array.from(selectedSeals.values()))
  ) as any;

  constructor(private galleryFacade: GalleryFacade) {}
}
