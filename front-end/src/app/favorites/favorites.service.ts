import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class favoritesService {
  constructor(private httpClient: HttpClient) {}

  getFavoriteSongs() {
    return this.httpClient.get(`http://localhost:3000/album/user/favorites`);
  }
  getMusicInfo(trackId: string) {
    return this.httpClient.get(`http://localhost:3000/album/${trackId}`);
  }
}
