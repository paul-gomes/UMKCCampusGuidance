import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "upload",
    loadChildren: () =>
      import("./upload-schedule/upload-schedule.module").then(
        (m) => m.UploadSchedulePageModule
      ),
  },
  {
    path: "upload-syllabus",
    loadChildren: () =>
      import("./upload-syllabus/upload-syllabus.module").then(
        (m) => m.UploadSyllabusPageModule
      ),
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "ModalPage",
    loadChildren: () =>
      import("./modal-page/modal-page.component").then(
        (m) => m.ModalPageComponent
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
