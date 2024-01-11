import { Component, OnInit } from '@angular/core';
import { gettingSongsService } from '../services/songsApis/musicsAPI.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userService';
import { MusicCardService } from './music-card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css',
})
export class MusicCardComponent implements OnInit {
  userId!: string;
  likes: number = 0;
  dislikes: number = 0;
  // albums: any[] = [];
  displayedAlbums: any[] = [];

  constructor(
    private songServices: gettingSongsService,
    private route: ActivatedRoute,
    private userService: UserService,
    private musicService: MusicCardService
  ) {}

  ngOnInit() {
    const musicId = this.route.snapshot.paramMap.get('id');
    if (musicId) {
      this.getMusics(+musicId as number);
    }

    this.musicService.musics$.subscribe((musics) => {
      this.displayedAlbums = musics;
    });
  }

  // getAlbums(search: string) {
  //   const albuns = this.musicService.getAlbumsBySearch(search);
  //   albuns.subscribe((result: Object) => {
  //     this.displayedAlbums = result as any[];
  //   });
  // }
  getMusics(id: number) {
    this.musicService.getMusics(id);
  }

  async onLike(songId: number) {
    this.musicService.likeSong(songId).subscribe((response: any) => {
      const song = this.displayedAlbums.find((song) => song.trackId === songId);

      if (song) {
        song.likes = response.likes;
        song.dislikes = response.dislikes;
      }
    });
  }

  onDislike(songId: number) {
    this.musicService.dislikeSong(songId).subscribe((response: any) => {
      const song = this.displayedAlbums.find((song) => song.trackId === songId);

      if (song) {
        console.log(response);
        song.likes = response.likes;
        song.dislikes = response.dislikes;
      }
    });
  }
}
