import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { SMALL_WIDTH_BREAKPOINT } from '../core/breakpoints';
import { LoggerService } from '../shared/logger.service';

interface Test {
  id: number,
  name: string
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDirection = new EventEmitter<void>();

  isScreenSmall: boolean = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-with: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.logger.debug("test", true);
    this.logger.debug(2);
    this.logger.debug({ id: 2, name: "test" } as Test, true);
    this.logger.info("test info", true);
    this.logger.warn("test warn", true);
    this.logger.error("test error");
    this.logger.fatal("test fatal");
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
