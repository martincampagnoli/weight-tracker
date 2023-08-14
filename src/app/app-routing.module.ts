import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

/**
 * Defines the routes for navigation within the application.
 */
const routes: Routes = [{ path: '', component: MainComponent }];

/**
 * The Angular module that handles application routing.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
