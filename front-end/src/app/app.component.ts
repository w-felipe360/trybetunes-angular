import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'learningAngular';
  constructor() {}

  // onLike(songId: string, userId: string) {
  //   this.gettingSongsService.likeSong(songId, userId).subscribe();
  // }

  // onDislike(songId: string, userId: string) {
  //   this.gettingSongsService.dislikeSong(songId, userId).subscribe();
  // }
}
