import { Component } from '@angular/core';
import { AlbumService } from '../services/songsApis/searchAlbunsAPI.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  artist: string = '';
  searchedArtist = '';
  albums: any[] = [];
  searchClicked: boolean = false;
  constructor(private searchService: AlbumService) {}
  searchAlbums(artist: string) {
    this.searchedArtist = artist;
    this.searchClicked = true;
    this.searchService.searchAlbumsAPI(artist).subscribe((data) => {
      this.albums = data;
    });
    this.artist = '';
  }
}
