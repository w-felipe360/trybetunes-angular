import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MusicCardComponent } from './music-card/music-card.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'album/:id', component: MusicCardComponent },
  { path: '', component: RegisterComponent },
  // { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
