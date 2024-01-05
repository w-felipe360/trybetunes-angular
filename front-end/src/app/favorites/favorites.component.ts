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
    // console.log('id ->', id);
    const songs = this.favoriteService.getFavoriteSongs();
    console.log('songs ->', songs);
    songs.subscribe((result: any) => {
      console.log('aqui o resultado', result);
      this.favoriteAlbums = result as any[];
      console.log('AQUI OS ALBUNS', this.favoriteAlbums);
      // const ids = this.favoriteAlbums.map((album) => album.id);
      // return ids;
    });
  }
  getAllInfo(id: string) {
    
  }
}
