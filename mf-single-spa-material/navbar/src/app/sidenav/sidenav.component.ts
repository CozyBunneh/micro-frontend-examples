import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Direction } from '@angular/cdk/bidi';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SMALL_WIDTH_BREAKPOINT } from '../core/breakpoints';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less'],
})
export class SidenavComponent implements OnInit {
  isScreenSmall: boolean = true;

  isDarkTheme: boolean = false;
  direction: Direction = 'ltr';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
  toggleDirection() {
    this.direction = this.direction == 'ltr' ? 'rtl' : 'ltr';
  }
}
