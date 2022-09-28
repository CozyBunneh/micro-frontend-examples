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
            seals.push({id, title, url:url.replaceAll('&amp;', '&')});
          }
        });
        return seals;
      })
    );
  }
}
