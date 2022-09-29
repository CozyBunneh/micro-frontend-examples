import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { map } from 'rxjs';

import * as GalleryActions from './gallery.actions';
import * as GalleryFeature from './gallery.reducer';
import * as GallerySelectors from './gallery.selectors';

@Injectable()
export class GalleryFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(GallerySelectors.getGalleryLoaded));
  allGallery$ = this.store.pipe(select(GallerySelectors.getAllGallery));
  selectedGallery$ = this.store.pipe(select(GallerySelectors.getSelected));
  selectedSeals$ = this.store.pipe(select(GallerySelectors.getSelectedSeals));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(GalleryActions.initGallery());
  }

  isSealSelected(sealId: any) {
    return this.selectedSeals$.pipe(
      map((selectedSeals) => selectedSeals.has(sealId))
    );
  }

  toggleSelectSeal(seal: any) {
    this.store.dispatch(GalleryActions.toggleSelectSeal({ seal }));
  }
}
