import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer/footer.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { HeaderComponent } from "./header/header.component";
import { LayoutRoutingModule } from "./layout-routing.module";

@NgModule({
  declarations: [FooterComponent, SideNavComponent, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
