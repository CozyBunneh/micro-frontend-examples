import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { GalleryApiService } from '../../api/gallery-api.service';

import * as GalleryActions from './gallery.actions';
import * as GalleryFeature from './gallery.reducer';

@Injectable()
export class GalleryEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GalleryActions.initGallery),
      mergeMap(() => {
        return this.galleryApiService.getSealList().pipe(
          map((res) => {
            return GalleryActions.loadGallerySuccess({ gallery: res });
          }),
          catchError((error) =>
            of(GalleryActions.loadGalleryFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private galleryApiService: GalleryApiService
  ) {}
}
