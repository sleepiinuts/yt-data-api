import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { YoutubeSearchComponent } from './components/youtube-search/youtube-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YoutubeSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'yt-data-api';

  constructor(private httpClient: HttpClient) {}
}
