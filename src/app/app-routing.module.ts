import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop/desktop.component';

const routes: Routes = [
  {
    path : '' , redirectTo : '/desktop', pathMatch : 'full'
  },
  {
    path : 'desktop', component : DesktopComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
