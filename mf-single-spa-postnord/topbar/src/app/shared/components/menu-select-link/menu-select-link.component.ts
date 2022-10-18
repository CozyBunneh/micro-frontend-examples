import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-select-link',
  templateUrl: './menu-select-link.component.html',
  styleUrls: ['./menu-select-link.component.scss']
})
export class MenuSelectLinkComponent {
  @Input() name = '';
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
