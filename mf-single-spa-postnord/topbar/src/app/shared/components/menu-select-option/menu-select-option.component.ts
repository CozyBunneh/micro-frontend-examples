import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-select-option',
  templateUrl: './menu-select-option.component.html',
  styleUrls: ['./menu-select-option.component.scss'],
})
export class MenuSelectOptionComponent {
  @Input() name = '';
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
