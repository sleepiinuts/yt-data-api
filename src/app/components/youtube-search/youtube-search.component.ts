import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { SearchResult } from '../../models/search-result.model';
import {
  AppState,
  selectError,
  selectYoutube,
} from '../../store/all.selectors';
import { YoutubeActions } from '../../store/youtube/youtube.actions';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-youtube-search',
  standalone: true,
  imports: [ScrollingModule, SearchResultComponent, SearchBoxComponent],
  templateUrl: './youtube-search.component.html',
  styleUrl: './youtube-search.component.scss',
})
export class YoutubeSearchComponent {
  @ViewChild('scroll')
  container!: ElementRef;

  items: SearchResult[] = [];

  private readonly scrollingOffset = 20;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private router: Router,
    private scroll: ScrollDispatcher,
    private store: Store<AppState>
  ) {
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof Scroll),
    //     map((event) => event.position)
    //   )
    //   .subscribe((position) => console.log(`scroll position: ${position}`));
    // this.scroll
    //   .scrolled()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe((data) =>
    //     console.log(
    //       `scrolldata: ${data?.getElementRef().nativeElement.scrollTop}`
    //     )
    //   );

    // subscribe to items from store
    this.store
      .select(selectYoutube)
      .pipe(takeUntilDestroyed())
      .subscribe((resp) => {
        this.items = resp.items;
      });

    // subscribe to error from store
    this.store
      .select(selectError)
      .pipe(
        takeUntilDestroyed(),
        filter((err) => Object.keys(err.err).length !== 0)
      )
      .subscribe((err) => {
        console.log(`hello: ${JSON.stringify(err.err)}`);
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: err.err,
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  scrollTracker(event: Event) {
    console.log(`scroll position: ${(event.target as HTMLElement).scrollTop}`);
    console.log(
      `container height: ${this.container.nativeElement.offsetHeight}`
    );
    console.log(
      `container scroll height: ${this.container.nativeElement.scrollHeight}`
    );

    let offsetHeight = this.container.nativeElement.offsetHeight; // element height
    let scrollPos = (event.target as HTMLElement).scrollTop; // scoll position
    let scrollHeight = this.container.nativeElement.scrollHeight; // total scrollable height

    if (offsetHeight + scrollPos + this.scrollingOffset >= scrollHeight) {
      console.log('reached bottom!!');
    }
  }

  // @HostListener('window:scroll', []) onscroll() {
  //   console.log(window.scrollY);
  //   console.log(`bottom: ${document.documentElement.scrollHeight}`);
  //   console.log(`window height: ${window.innerHeight}`);
  //   console.log(`window outer height: ${window.outerHeight}`);
  //   if (window.scrollY >= document.documentElement.scrollHeight) {
  //     console.log('reach bottom');
  //   }
  // }

  onSearch(q: string) {
    console.log(`search str: ${q}`);
    this.container.nativeElement.scrollTop = 0;
    this.store.dispatch(YoutubeActions.loadYoutubeVideos({ data: { q: q } }));
  }
}
