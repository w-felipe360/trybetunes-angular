import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicCardService {
  constructor(private httpClient: HttpClient) {}
  private musicsSubject = new BehaviorSubject<any[]>([]);
  musics$ = this.musicsSubject.asObservable();

  getAlbumsBySearch(search: string) {
    return this.httpClient.get(
      `http://localhost:3000/album/search?name=${search}`
    );
  }
  getMusics(id: number) {
    this.httpClient
      .get(`http://localhost:3000/album/${id}`)
      .subscribe((result: any) => {
        this.musicsSubject.next(result.slice(1));
      });
  }

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/album/').pipe(
      tap((result: any) => {
        this.musicsSubject.next(result);
      })
    );
  }

  likeSong(songId: number) {
    return this.httpClient.post(`http://localhost:3000/album/${songId}/like`, {
      songId,
    });
  }
  dislikeSong(songId: number) {
    return this.httpClient.post(
      `http://localhost:3000/album/${songId}/dislike`,
      {
        songId,
      }
    );
  }
}
