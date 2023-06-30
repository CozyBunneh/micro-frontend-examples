import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: HeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
