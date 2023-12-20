import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicCardService {
  constructor(private httpClient: HttpClient) {}

  getAlbumsBySearch(search: string) {
    return this.httpClient.get(`http://localhost:3000/album/search?name=${search}`);
  }
  getMusics(id: number) {
    return this.httpClient.get(`http://localhost:3000/album/${id}`);
  }
  likeSong(songId: number) {
    return this.httpClient.post(`http://localhost:3000/album/${songId}/like`, {
      songId,
    });
  }
  dislikeSong(songId: number ) {
    return this.httpClient.post(`http://localhost:3000/album/${songId}/dislike`, {
      songId,
    });
  }
}
