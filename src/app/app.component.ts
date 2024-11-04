import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { catchError, of } from 'rxjs';
import { APP_CONFIG } from '../environments/app-config.token';
import { YoutubeSearchComponent } from './components/youtube-search/youtube-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, YoutubeSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly appConfig = inject(APP_CONFIG);

  title = 'yt-data-api';
  URI = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=marvel+snap+meta+deck&key=${this.appConfig.apiKey}`;

  constructor(private httpClient: HttpClient) {
    // this.httpClient.get(this.URI).subscribe(
    //   (data) => console.log(`[SUCCESS]data: ${JSON.stringify(data)}`),
    //   (err) => console.log(`[ERROR]get: ${err}`)
    // );

    console.log(this.appConfig.apiURL);
  }
}
