import { Component, OnInit } from '@angular/core';
import { gettingSongsService } from '../services/songsApis/musicsAPI.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userService';
import { MusicCardService } from './music-card.service';

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
  }

  // getAlbums(search: string) {
  //   const albuns = this.musicService.getAlbumsBySearch(search);
  //   albuns.subscribe((result: Object) => {
  //     this.displayedAlbums = result as any[];
  //   });
  // }
  getMusics(id: number) {
    console.log('id ->', id);
    const songs = this.musicService.getMusics(id);
    console.log('songs ->', songs);
    songs.subscribe((result: any) => {
      console.log('aqui o resultado', result);
      this.displayedAlbums = result.slice(1) as any[];
      console.log('AQUI OS ALBUNS', this.displayedAlbums);
    });
    return songs;
  }

  onLike(songId: number, userId: string) {
    console.log(typeof songId, songId);
    this.musicService.likeSong(songId).subscribe(() => {
      const song = this.displayedAlbums.find(
        (album) => album.trackId === songId
      );
      if (song) {
        song.likes++;
      }
    });
  }
  // incrementLikes(songId: number) {
  //   const song = this.displayedAlbums.find((song: any) => song.id === songId);
  //   if (song) {
  //     song.likes += 1;
  //   }
  // }

  onDislike(songId: number, userId: string) {
    console.log(typeof songId, songId);
    this.musicService.dislikeSong(songId).subscribe(() => {
      const song = this.displayedAlbums.find(
        (album) => album.trackId === songId
      );
      if (song) {
        song.dislikes++;
      }
    });
  }
}
