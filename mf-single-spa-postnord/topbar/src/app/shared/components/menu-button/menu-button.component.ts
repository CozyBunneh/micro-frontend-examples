import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
  @Input() name = '';
  @Input() small = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
