import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MenuSelectComponent } from './components/menu-select/menu-select.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { MenuSelectSelectComponent } from './components/menu-select-select/menu-select-select.component';
import { MenuSelectOptionComponent } from './components/menu-select-option/menu-select-option.component';
import { MenuSelectLinkComponent } from './components/menu-select-link/menu-select-link.component';

const components = [
  MenuSelectComponent,
  MenuButtonComponent,
  MenuSelectLinkComponent,
  MenuSelectSelectComponent,
  MenuSelectOptionComponent,
];

@NgModule({
  declarations: [...components],
  exports: [...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class SharedModule {}
