import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input() item!: SearchResult;
}
