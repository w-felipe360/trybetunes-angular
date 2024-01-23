import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicCardService } from './music-card.service';
import { favoritesService } from '../favorites/favorites.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css',
})
export class MusicCardComponent implements OnInit {
  userId!: string;
  likes: number = 0;
  dislikes: number = 0;
  displayedAlbums: any[] = [];
  favoriteSongs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicCardService
  ) {}

  ngOnInit() {
    const musicId = this.route.snapshot.paramMap.get('id');
    if (musicId) {
      this.getMusics(+musicId as number);
    }
    const songs = this.musicService.getAllRelations();
    songs.subscribe((result: any) => {
      this.favoriteSongs = result as any[];
    });
    this.musicService.musics$.subscribe((musics) => {
      this.displayedAlbums = musics.map((music: any) => {
        const favoriteSong = this.favoriteSongs.find(
          (song: any) => song.trackId.trackId === music.trackId
        );
        if (favoriteSong) {
          music.liked = favoriteSong.liked;
        }

        return music;
      });
    });
  }
  getMusics(id: number) {
    this.musicService.getMusics(id);
  }

  async onLike(songId: number) {
    this.musicService.likeSong(songId).subscribe((response: any) => {
      const song = this.displayedAlbums.find((song) => song.trackId === songId);

      if (song) {
        song.likes = response.likes;
        song.dislikes = response.dislikes;
        song.liked = response.liked;
      }
    });
  }

  onDislike(songId: number) {
    this.musicService.dislikeSong(songId).subscribe((response: any) => {
      const song = this.displayedAlbums.find((song) => song.trackId === songId);

      if (song) {
        song.likes = response.likes;
        song.dislikes = response.dislikes;
        song.liked = response.liked;
      }
    });
  }
}
