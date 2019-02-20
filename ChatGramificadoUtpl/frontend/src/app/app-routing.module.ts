import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { UiComponent } from './componentes/ui/ui.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { SalaChatComponent } from './componentes/sala-chat/sala-chat.component';
import { GlosarioComponent } from './componentes/glosario/glosario.component';
import { SalaGrupalComponent } from './componentes/sala-grupal/sala-grupal.component';

// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: SalaChatComponent },
  { path: 'sala/:id', component: SalaGrupalComponent },
  {
    path: '',
    component: UiComponent,
    children: [
      {
        path: '',
        loadChildren: './componentes/ui/ui.module#UiModule'
      }],
      // canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
