import { loadRemoteModule } from "@angular-architects/module-federation";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "../environment/environment";

const routes: Routes = [
  {
    path: "",
    redirectTo: "portal",
    pathMatch: "full",
  },
  {
    path: "portal",
    loadChildren: () =>
      loadRemoteModule({
        type: "module",
        remoteEntry: environment.microfrontendRemoteEntries.start.url,
        exposedModule: "./Module",
      }).then((m) => m.StartModule),
  },
  {
    path: "portal/about",
    loadChildren: () =>
      loadRemoteModule({
        type: "module",
        remoteEntry: environment.microfrontendRemoteEntries.about.url,
        exposedModule: "./Module",
      }).then((m) => m.AboutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
