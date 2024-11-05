import { Component, OnInit, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit {
  searchStr = output<string>();
  searchForm = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        filter((q): q is string => q !== null && q !== '')
      )
      .subscribe((q) => this.searchStr.emit(q));
  }
}
