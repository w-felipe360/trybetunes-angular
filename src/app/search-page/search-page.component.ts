import { Component } from '@angular/core';
import { AlbumService } from '../services/songsApis/searchAlbunsAPI.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  artist: string = '';
  constructor(private searchService: AlbumService) {}
  searchAlbums(artist: string) {
    console.log('aqui o artist:', this.artist);
    this.searchService.searchAlbumsAPI(artist).subscribe();
  }
}
