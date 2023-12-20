import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Album {
    artistId: number;
    artistName: string;
    collectionId: number;
    collectionName: string;
    collectionPrice: number;
    artworkUrl100: string;
    releaseDate: string;
    trackCount: number;
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class AlbumService {
    constructor(private http: HttpClient) { }
  
    searchAlbumsAPI(artist: string): Observable<Album[]> {
      const artistNameURL = encodeURIComponent(artist).replace(/%20/g, '+');
      const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;
  
      return this.http.get(getAlbumsAPI).pipe(
        map((response: any) => response.results.map((album: any): Album => ({
          artistId: album.artistId,
          artistName: album.artistName,
          collectionId: album.collectionId,
          collectionName: album.collectionName,
          collectionPrice: album.collectionPrice,
          artworkUrl100: album.artworkUrl100,
          releaseDate: album.releaseDate,
          trackCount: album.trackCount,
        })))
      );
    }
  }