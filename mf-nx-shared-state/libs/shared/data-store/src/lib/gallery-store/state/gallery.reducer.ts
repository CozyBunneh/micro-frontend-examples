import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GalleryActions from './gallery.actions';
import { GalleryEntity } from './gallery.models';

export const GALLERY_FEATURE_KEY = 'gallery';

export interface GalleryState extends EntityState<GalleryEntity> {
  selectedId?: string | number; // which Gallery record has been selected
  selectedSeals: Map<string, any>;
  loaded: boolean; // has the Gallery list been loaded
  error?: string | null; // last known error (if any)
}

export interface GalleryPartialState {
  readonly [GALLERY_FEATURE_KEY]: GalleryState;
}

export const galleryAdapter: EntityAdapter<GalleryEntity> =
  createEntityAdapter<GalleryEntity>();

export const initialGalleryState: GalleryState = galleryAdapter.getInitialState(
  {
    // set initial required properties
    selectedSeals: new Map(),
    loaded: false,
  }
);

const reducer = createReducer(
  initialGalleryState,
  on(GalleryActions.initGallery, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(GalleryActions.toggleSelectSeal, (state, { seal }) => {
    const newState = { ...state };
    if (newState.selectedSeals.has(seal.id)) {
      newState.selectedSeals.delete(seal.id);
    } else {
      newState.selectedSeals.set(seal.id, seal);
    }
    return newState;
  }),
  on(GalleryActions.loadGallerySuccess, (state, { gallery }) =>
    galleryAdapter.setAll(gallery, { ...state, loaded: true })
  ),
  on(GalleryActions.loadGalleryFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function galleryReducer(
  state: GalleryState | undefined,
  action: Action
) {
  return reducer(state, action);
}
