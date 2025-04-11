import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CircleLinkComponent } from './components/circle-link/circle-link.component';
import { appReducer } from './store/default/default.reducers';
import { AppEffects } from './store/default/default.effects';

const mat = [
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatGridListModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [AppComponent],
  exports: [...mat],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CircleLinkComponent,
    MainComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('app', appReducer),
    EffectsModule.forRoot([AppEffects]),
    ...mat,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
