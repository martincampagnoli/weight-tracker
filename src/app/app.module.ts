import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/reducers';
import { AppEffects } from './store/effects';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { CircleLinkComponent } from './components/circle-link/circle-link.component';
import { GridComponent } from './components/grid/grid.component';
import { PostComponent } from './components/post/post.component';
import { ButtonLinkComponent } from './components/button-link/button-link.component';

const mat = [
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatGridListModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ButtonLinkComponent,
    CircleLinkComponent,
    GridComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
