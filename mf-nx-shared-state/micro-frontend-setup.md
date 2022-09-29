# Microfrontend setup

This condenced guide is heavily inspired by https://itnext.io/building-angular-micro-frontend-with-ngrx-state-sharing-and-nx-cli-7e9af10ebd03
but it's been updated to not use removed or deprecated things.

## Create microfrontend workspace

```sh
npx create-nx-workspace mf-app
# option 1: Pick apps with an empty workspace
# option 2: No
```

## Add angular

```sh
cd mf-app

npm install --save-dev @nrwl/angular
```

## Create the shell that hosts other apps

```sh
npx nx g @nrwl/angular:host shell
# option 1: less

# run it:
nx run shell:serve
```

## Create a demo app that is running on a separate port

```sh
npx nx g @nrwl/angular:remote gallery --host=shell
# option 1: less

# run it:
nx run gallery:serve
```

## Add a Home component to the shell app

```sh
cd apps/shell/src/app/
nx g @nrwl/angular:component Home --module=app.module.ts
```

Edit apps/shell/src/app/app.module.ts default route to:

```ts
{
  path: '',
  component: HomeComponent,
}
```

Try it out, now it shows the Home component when you click on the home link.

## Add the shared state library

Note that all libraries placed in the **shared** folder will be injected as singeltons.

```sh
nx g @nrwl/angular:lib shared/data-store
```

## Add gallery store

```sh
# generate a module for the store
nx g @nrwl/angular:module gallery-store --project=shared-data-store
```

```sh
# generate the store with a facade service
nx g @nrwl/angular:ngrx gallery --module=libs/shared/data-store/src/lib/gallery-store/gallery-store.module.ts --directory state --no-interactive --facade
```

Export **facade** service and gallery store module from the **shared** library.
libs/shared/data-store/src/index.ts

```ts
export * from './lib/shared-data-store.module';
export * from './lib/gallery-store/gallery-store.moduel';
export * from './lib/gallery-store/state/gallery.facade';
```

## Bulding the seal (the animal) state

After we're finished prototyping the main architecture it is now time for some coding.
We are going to build a API service, create a **selected seal state**, and finally, glue it together with the Home page and Gallery.
Lets start with the service:

```sh
cd libs/shared/data-store/src/lib/gallery-store/
nx g @nrwl/angular:service api/GalleryApi
```

### Add some code

libs/shared/data-store/src/lib/gallery-store/api/gallery-api.service.ts

```ts
/* stylelint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryApiService {
  constructor(private http: HttpClient) {}

  getSealList() {
    const limit = 20;
    const url = `https://www.reddit.com/r/seadoggo/.json?limit=${limit}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        const seals = [] as any;
        response.data.children.forEach((res: any) => {
          const title = res.data.title;
          const id = res.data.id;
          const url = res.data.preview?.images[0]?.resolutions[2]?.url;
          if (url) {
            seals.push({ id, title, url: url.replaceAll('&amp;', '&') });
          }
        });
        return seals;
      })
    );
  }
}
```

### Update dependencies

libs/shared/data-store/src/lib/gallery-store/gallery-store.module.ts

```ts
imports: [
    CommonModule,
    HttpClientModule,
    ....
],
providers: [GalleryFacade, GalleryApiService],
```

### Next, we need to update side effects

libs/shared/data-store/src/lib/gallery-store/state/gallery.effects.ts

```ts
....
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
....
constructor(
    private readonly actions$: Actions,
    private galleryApiService: GalleryApiService
) {}
....
```

### Then let's add toggle select seal action

libs/shared/data-store/src/lib/gallery-store/state/gallery.actions.ts

```ts
export const toggleSelectSeal = createAction(
  '[Gallery] Toggle Select Seals',
  props<{ seal: any }>()
);
```

### And implement the reducer

libs/shared/data-store/src/lib/gallery-store/state/gallery.reducer.ts

```ts
...
export interface GalleryState extends EntityState<GalleryEntity>{
    selectedId?: string | number;
    selectedSeals: Map<string, any>;
...
export const initialState: State = galleryAdapter.getInitialState({
    selectedSeals: new Map(),
    loaded: false,
});
....
const reducer = createReducer(
    initialState,
    on(GalleryActions.toggleSelectSeal, (state, { seal }) => {
        const newState = { ...state };
        if (newState.selectedSeals.has(seal.id)) {
            newState.selectedSeals.delete(seal.id);
        } else {
            newState.selectedSeals.set(seal.id, seal);
        }
        return newState;
    }),
...
```

### Add the selected seals state selector

libs/shared/data-store/src/lib/gallery-store/state/gallery.selectors.ts

```ts
export const getSelectedSeals = createSelector(
  getGalleryState,
  (state: GalleryState) => state.selectedSeals
);
```

### And the final step is updating the facade service

libs/shared/data-store/src/lib/gallery-store/state/gallery.facade.ts

```ts
...
selectedSeals$ = this.store.pipe(select(GallerySelectors.getSelectedSeals));

constructor(private readonly store: Store) {}

isSealSelected(sealId: any) {
    return this.selectedSeals$.pipe(
        map((selectedSeals) => selectedSeals.has(sealId))
    );
}

toggleSelectSeal(seal: any) {
    this.store.dispatch(GalleryActions.toggleSelectSeal({ seal }));
}
...
```

We are done with implementing the state logic, it was a little bit of coding but the major part is ready. The last is — connect the state with our UI.

### Connecting seals state to UI

The first we need to do is to connect our gallery store module to the shell app, it will make dependency injection of store and facade service.

apps/shell/src/app/app.module.ts

```ts
imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    GalleryStoreModule,
...
```

> Note: If you see such a warning in console:
>
> Warning: No required version specified and unable to automatically determine one. Unable to find required version for “@angular/common” in description file (/Users/macbook/Desktop/projects/micro-frontend/mf-app/node_modules/@angular/common/package.json). It need to be in dependencies, devDependencies or peerDependencies.
>
> It means webpack can not find the version of shared package, and you need explicitly define it. In order to fix it, set it explicitly in shell and micro app webpack.config.js

```js
shared: {
   '@angular/core': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '12.2.9',
   },
   '@angular/common': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '12.2.9',
   },
...
```

### Alright, we have a few steps left, lets add UI to the gallery page.

apps/gallery/src/app/remote-entry/entry.component.ts

```ts
import { Component } from '@angular/core';
import { GalleryFacade } from '@mf-app/shared/data-store';

@Component({
  selector: 'ng-mfe-gallery-entry',
  template: `<div class="container">
    <ng-container *ngFor="let seal of seals | async">
      <div
        class="child"
        (click)="toggleSelectSeal(seal)"
        [ngClass]="{ selected: isSelected(seal.id) | async }"
      >
        <h3>{{ seal.title }}</h3>
        <div>
          <img [src]="seal.url" alt="" />
        </div>
      </div>
    </ng-container>
  </div>`,
  styles: [
    `
      .container {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
      }
      .selected {
        border: 3px solid purple;
      }
      img {
        width: 20vw;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  seals = this.galleryFacade.allGallery$ as any;
  selectedSeals = this.galleryFacade.selectedSeals$;

  constructor(private galleryFacade: GalleryFacade) {}

  toggleSelectSeal(seal: any) {
    this.galleryFacade.toggleSelectSeal(seal);
  }

  isSelected(sealId: any) {
    return this.galleryFacade.isSealSelected(sealId);
  }
}
```

### Also, update the Home page component in shell app

apps/shell/src/app/home/home.component.ts

```ts
import { GalleryFacade } from '@mf-app/shared/data-store';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mf-app-gallery-entry',
  template: `<div class="container">
    <ng-container *ngFor="let seal of seals | async">
      <div class="child">
        <h3>{{ seal.title }}</h3>
        <div>
          <img [src]="seal.url" alt="" />
        </div>
      </div>
    </ng-container>
  </div>`,
  styles: [
    `
      .container {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
      }
      img {
        width: 20vw;
      }
    `,
  ],
})
export class HomeComponent {
  seals = this.galleryFacade.selectedSeals$.pipe(
    map((selectedSeals: any) => Array.from(selectedSeals.values()))
  ) as any;

  constructor(private galleryFacade: GalleryFacade) {}
}
```

### And the last, call the API from the app component in the shell

apps/shell/src/app/app.component.ts

```ts
...
export class AppComponent implements OnInit {
    constructor(private galleryFacade: GalleryFacade) {}
    ngOnInit(): void {
        this.galleryFacade.init();
    }
}
```

### Don’t forget to clean up all the styles from

- apps/gallery/src/app/app.component.less
- apps/shell/src/app/app.component.less
