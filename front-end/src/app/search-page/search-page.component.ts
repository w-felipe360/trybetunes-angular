import { Component } from '@angular/core';
import { MusicCardService } from '../music-card/music-card.service';

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
  constructor(
    // private searchService: AlbumService,
    private musicService: MusicCardService
  ) {}
  searchAlbums(artist: string) {
    this.searchedArtist = artist;
    this.searchClicked = true;
    this.musicService.getAlbumsBySearch(artist).subscribe((res: any) => {
      this.albums = res.results;
    });
    this.artist = '';
  }
}
