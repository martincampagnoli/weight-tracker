import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainComponent } from './components/main/main.component';
import { appReducer } from './store/reducers';
import { AppEffects } from './store/effects';

import { CircleLinkComponent } from './components/circle-link/circle-link.component';
import { GridComponent } from './components/grid/grid.component';

const mat = [
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatChipsModule,
  MatSnackBarModule,
  MatGridListModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CircleLinkComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', appReducer),
    EffectsModule.forRoot([AppEffects]),
    ...mat,
  ],
  exports: [...mat],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
