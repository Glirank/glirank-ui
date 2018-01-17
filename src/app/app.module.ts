import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatToolbarModule, MatTableModule, MatTabsModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RanksComponent } from './ranks/ranks.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'ranks', component: RanksComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: NewGameComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    RanksComponent,
    NewGameComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }