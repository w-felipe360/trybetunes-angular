import { Component, OnInit } from '@angular/core';
import { gettingSongsService } from '../services/songsApis/musicsAPI.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.css',
})
export class MusicCardComponent implements OnInit {
  albums: any[] = [];
  displayedAlbums: any[] = [];

  constructor(private songServices: gettingSongsService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getAlbums(+id);
    }
  }

  getAlbums(id: number) {
    this.songServices.getMusics(id).then(data => {
      this.albums = data;
      this.displayedAlbums = this.albums.slice(1);
    });
  }
}
