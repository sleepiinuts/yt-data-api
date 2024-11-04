import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CdkScrollable,
  ScrollDispatcher,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-youtube-search',
  standalone: true,
  imports: [ScrollingModule, SearchResultComponent],
  templateUrl: './youtube-search.component.html',
  styleUrl: './youtube-search.component.scss',
})
export class YoutubeSearchComponent {
  @ViewChild('scroll')
  container!: ElementRef;

  constructor(private router: Router, private scroll: ScrollDispatcher) {
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
  }

  scrollTracker(event: Event) {
    console.log(`scroll position: ${(event.target as HTMLElement).scrollTop}`);
    console.log(
      `container height: ${this.container.nativeElement.offsetHeight}`
    );
    console.log(
      `container scroll height: ${this.container.nativeElement.scrollHeight}`
    );

    let offsetHeight = this.container.nativeElement.offsetHeight;
    let scrollPos = (event.target as HTMLElement).scrollTop;
    let scrollHeight = this.container.nativeElement.scrollHeight;

    if (offsetHeight + scrollPos >= scrollHeight) {
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
}
