import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class gettingSongsService {
  constructor(private http: HttpClient) {}

  getMusics = async (id: number) => {
    const request = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&entity=song`
    );
    const requestJson = await request.json();
    return requestJson.results;
  };
  public getSongs(id: number): Observable<any> {
    return this.http.get(
      'https://itunes.apple.com/lookup?id=909253&entity=song'
    );
  }

  public likeSong(id: string, userId: string): Observable<any> {
    return this.http.post(`http://localhost:3000/album/${id}/like`, { userId });
  }

  public dislikeSong(id: string, userId: string): Observable<any> {
    return this.http.post(`http://localhost:3000/album/${id}/dislike`, {
      userId,
    });
  }
}
