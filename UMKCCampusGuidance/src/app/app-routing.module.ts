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
    path: "tab1",
    loadChildren: () =>
      import("./tab1/tab1.module").then((m) => m.Tab1PageModule),
  },
  {
    path: "tab2",
    loadChildren: () =>
      import("./tab2/tab2.module").then((m) => m.Tab2PageModule),
  },
  {
    path: "tab3",
    loadChildren: () =>
      import("./tab3/tab3.module").then((m) => m.Tab3PageModule),
  },
  {
    path: "tab4",
    loadChildren: () =>
      import("./tab4/tab4.module").then((m) => m.Tab4PageModule),
  },
  {
    path: "tabs",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
