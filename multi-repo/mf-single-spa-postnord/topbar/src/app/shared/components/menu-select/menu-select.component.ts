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
    this.isInsideContentSelect = this.getIsInsideContentSelect(event);
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

  private getIsInsideContentSelect(event: Event): boolean {
    let isInside = this.isASelectElement(event.target as HTMLElement);
    if (
      this.isElementASelectChild(
        event.target as HTMLElement,
        event.currentTarget as HTMLElement
      )
    ) {
      isInside = true;
    }
    return isInside;
  }

  private isASelectElement(target?: HTMLElement): boolean {
    return target?.name === 'select-select';
  }

  private isElementASelectChild(
    target?: HTMLElement,
    currentTarget?: HTMLElement
  ): boolean {
    if (currentTarget?.hasChildNodes() && target) {
      let selectedChildren = currentTarget.querySelectorAll(
        '[name="select-select"]'
      );
      for (let i = 0; i < selectedChildren.length; i++) {
        let child = selectedChildren[i];
        if (child.hasChildNodes() && child.contains(target)) {
          return true;
        }
      }
    }

    return false;
  }
}
