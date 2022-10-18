import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-menu-select',
  templateUrl: './menu-select.component.html',
  styleUrls: ['./menu-select.component.scss'],
})
export class MenuSelectComponent {
  @Input() name = '';
  @Input() small = false;
  @Input() iconLeft = '';
  @Input() rightAlign = false;
  show = false;
  private isInside = false;
  private isInsideContentSelect = false;

  @HostListener('mouseover', ['$event'])
  onMouseEnter(event: Event) {
    this.isInsideContentSelect = event.target?.name === 'select-select';
    this.isInside = true;
  }

  @HostListener('mouseout')
  onMouseOut() {
    this.isInside = false;
    this.isInsideContentSelect = false;
  }

  @HostListener('document:click')
  clicked(): void {
    if (!this.isInsideContentSelect) {
      if (this.isInside) {
        this.toggle();
      } else {
        this.close();
      }
    }
  }

  toggle() {
    this.show = !this.show;
  }

  close() {
    this.show = false;
  }
}
