import { Component } from '@angular/core';
import { favoritesService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  favoriteAlbums: any[] = [];
  constructor(private readonly favoriteService: favoritesService) {}
  ngOnInit() {
    this.getFavoriteMusics();
  }
  getFavoriteMusics() {
    const songs = this.favoriteService.getFavoriteSongs();
    songs.subscribe((result: any) => {
      this.favoriteAlbums = result as any[];
    });
  }
}