import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SastanciComponent } from './sastanci/sastanci.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sastanci', component: SastanciComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
