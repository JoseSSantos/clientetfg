import { TipousuarioDeleteComponent } from './component/application/routed/tipousuario/tipousuario-delete/tipousuario-delete.component';
import { TipousuarioEditComponent } from './component/application/routed/tipousuario/tipousuario-edit/tipousuario-edit.component';
import { TipousuarioPlistComponent } from './component/application/routed/tipousuario/tipousuario-plist/tipousuario-plist.component';
import { TipousuarioNewComponent } from './component/application/routed/tipousuario/tipousuario-new/tipousuario-new.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { SessionResolver } from './resolve/session.resolve';
import { HomeComponent } from './component/shared/routed/home/home.component';

import { usuarioroutedViewComponent } from './component/application/routed/usuario/view/view.component';
import { UsuarioRoutedPlistComponent } from './component/application/routed/usuario/plist/usuario-routed-plist.component';
import { UsuarioRoutedNewComponent } from './component/application/routed/usuario/new/usuario-routed-new.component';
import { UsuarioRemoveRoutedComponent } from './component/application/routed/usuario/remove/usuario-remove-routed.component';
import { UsuarioRoutedEditComponent } from './component/application/routed/usuario/edit/usuario-routed-edit.component';
import { EquipoRoutedViewComponent } from './component/application/routed/equipo/view/equipo-routed-view.component';
import { EquipoRoutedEditComponent } from './component/application/routed/equipo/edit/equipo-routed-edit.component';
import { EquipoRoutedRemoveComponent } from './component/application/routed/equipo/remove/equipo-routed-remove.component';
import { EquipoRoutedPlistComponent } from './component/application/routed/equipo/plist/equipo-routed-plist.component';
import { EquipoRoutedNewComponent } from './component/application/routed/equipo/new/equipo-routed-new.component';
import { EncuentroRoutedNewComponent } from './component/application/routed/encuentro/new/encuentro-routed-new.component';
import { EncuentroRoutedViewComponent } from './component/application/routed/encuentro/view/encuentro-routed-view.component';
import { EncuentroRoutedPlistComponent } from './component/application/routed/encuentro/plist/encuentro-routed-plist.component';
import { EncuentroRoutedEditComponent } from './component/application/routed/encuentro/edit/encuentro-routed-edit.component';
import { EncuentroRoutedRemoveComponent } from './component/application/routed/encuentro/remove/encuentro-routed-remove.component';
import { UsuarioInfiniteListComponent } from './component/application/routed/usuario/usuario-infinite-list/usuario-infinite-list.component';
import { InfiniteRoutedListComponent } from './component/application/routed/usuario/infinite/infinite-routed-list.component';
import { EquipoNormalViewComponent } from './component/application/routed/equipo/normal-view/equipo-normal-view.component';

const routes: Routes = [

  { path: '', component: HomeComponent, resolve: { message: SessionResolver } },
  { path: 'login', component: LoginComponent, resolve: { message: SessionResolver } },
  { path: 'logout', component: LogoutComponent, resolve: { message: SessionResolver } },
  { path: 'home', component: HomeComponent, resolve: { message: SessionResolver } },
  
  { path: 'usuario/view/:id', component: usuarioroutedViewComponent, resolve: { message: SessionResolver } },
  { path: 'usuario/plist', component: UsuarioRoutedPlistComponent, resolve: { message:SessionResolver } },
  { path: 'usuario/new', component: UsuarioRoutedNewComponent, resolve: {message:SessionResolver}},
  { path: 'usuario/remove/:id', component: UsuarioRemoveRoutedComponent, resolve:{message:SessionResolver}},
  { path: 'usuario/edit/:id', component:UsuarioRoutedEditComponent, resolve:{message:SessionResolver}},
  { path: 'infinite', component:InfiniteRoutedListComponent, resolve:{message:SessionResolver}},

  { path: 'equipo/view/:id', component: EquipoRoutedViewComponent, resolve: {message:SessionResolver}},
  { path: 'equipo/edit/:id', component: EquipoRoutedEditComponent, resolve: {message:SessionResolver}},
  { path: 'equipo/remove/:id', component: EquipoRoutedRemoveComponent, resolve: {message:SessionResolver}},
  { path: 'equipo/plist', component:EquipoRoutedPlistComponent, resolve:{message:SessionResolver}},
  { path: 'equipo/new', component:EquipoRoutedNewComponent, resolve:{message:SessionResolver}},
  { path: 'equipos', component:EquipoNormalViewComponent, resolve:{message:SessionResolver}},
  
  { path: 'encuentro/new', component:EncuentroRoutedNewComponent, resolve:{message:SessionResolver}},
  { path: 'encuentro/view/:id', component:EncuentroRoutedViewComponent, resolve:{message:SessionResolver}},
  { path: 'encuentro/plist', component:EncuentroRoutedPlistComponent, resolve:{message:SessionResolver}},
  { path: 'encuentro/edit/:id', component:EncuentroRoutedEditComponent, resolve:{message:SessionResolver}},
  { path: 'encuentro/remove/:id', component:EncuentroRoutedRemoveComponent, resolve:{message:SessionResolver} },

  { path: 'tipouser/new', component:TipousuarioNewComponent, resolve:{message:SessionResolver}},
  { path: 'tipouser/plist', component:TipousuarioPlistComponent, resolve:{message:SessionResolver}},
  { path: 'tipouser/edit/:id', component:TipousuarioEditComponent, resolve:{message:SessionResolver}},
  { path: 'tipouser/remove/:id', component:TipousuarioDeleteComponent, resolve:{message:SessionResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
