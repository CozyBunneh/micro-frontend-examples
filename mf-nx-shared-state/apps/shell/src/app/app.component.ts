import { Component, OnInit } from '@angular/core';
import { GalleryFacade } from '@mf-app/shared/data-store';

@Component({
  selector: 'mf-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'shell';

  constructor(private galleryFacade: GalleryFacade) {}

  ngOnInit(): void {
    this.galleryFacade.init();
  }
}
