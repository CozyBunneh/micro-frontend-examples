import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-select-select',
  templateUrl: './menu-select-select.component.html',
  styleUrls: ['./menu-select-select.component.scss']
})
export class MenuSelectSelectComponent {
  @Input() name = '';
  @Input() iconLeft = '';
  @Input() iconRight = '';
  show = false;

  toggle() {
    this.show = !this.show;
  }
}
