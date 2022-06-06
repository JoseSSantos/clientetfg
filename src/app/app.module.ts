import { UsuarioService } from './service/usuario.service';
import { TipousuarioService } from './service/tipousuario.service';
import { PartidoService } from './service/partido.service';
import { PaginationService } from './service/pagination.service';
import { IconService } from './service/icon.service';
import { EquipoService } from './service/equipo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { SessionService } from './service/session.service';
import { CryptoService } from './service/crypto.service';
import { SessionResolver } from './resolve/session.resolve';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './component/shared/unrouted/menu/menu.component';
import { FooterComponent } from './component/shared/unrouted/footer/footer.component';
import { HeaderComponent } from './component/shared/unrouted/header/header.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { usuarioroutedViewComponent } from './component/application/routed/usuario/view/view.component';
import { usuariounroutedViewComponent } from './component/application/unrouted/usuario/view/usuario-unrouted-view.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { UsuarioRoutedPlistComponent } from './component/application/routed/usuario/plist/usuario-routed-plist.component';
import { UsuarioUnroutedPlistComponent } from './component/application/unrouted/usuario/plist/usuario-unrouted-plist.component';
import { UsuarioRoutedNewComponent } from './component/application/routed/usuario/new/usuario-routed-new.component';
import { ModalComponent } from './component/shared/unrouted/modal/modal.component';
import { PopupComponent } from './component/shared/unrouted/popup/popup.component';
import { TipousuarioUnroutedPlistComponent } from './component/application/unrouted/tipousuario/plist/tipousuario-unrouted-plist.component';
import { TrimPipe } from './pipe/trim.pipe';
import { UsuarioRemoveRoutedComponent } from './component/application/routed/usuario/remove/usuario-remove-routed.component';
import { APIService } from './service/api.service';
import { UsuarioRoutedEditComponent } from './component/application/routed/usuario/edit/usuario-routed-edit.component';
import { EquipoRoutedViewComponent } from './component/application/routed/equipo/view/equipo-routed-view.component';
import { EquipoUnroutedViewComponent } from './component/application/unrouted/equipo/view/equipo-unrouted-view.component';
import { EquipoRoutedEditComponent } from './component/application/routed/equipo/edit/equipo-routed-edit.component';
import { EquipoRoutedRemoveComponent } from './component/application/routed/equipo/remove/equipo-routed-remove.component';
import { EquipoUnroutedPlistComponent } from './component/application/unrouted/equipo/plist/equipo-unrouted-plist.component';
import { EquipoRoutedPlistComponent } from './component/application/routed/equipo/plist/equipo-routed-plist.component';
import { EquipoRoutedNewComponent } from './component/application/routed/equipo/new/equipo-routed-new.component';
import { EncuentroRoutedNewComponent } from './component/application/routed/encuentro/new/encuentro-routed-new.component';
import { DateTimeService } from './service/datetime.service';
import { EncuentroRoutedViewComponent } from './component/application/routed/encuentro/view/encuentro-routed-view.component';
import { EncuentroUnroutedViewComponent } from './component/application/unrouted/encuentro/view/encuentro-unrouted-view.component';
import { EncuentroRoutedPlistComponent } from './component/application/routed/encuentro/plist/encuentro-routed-plist.component';
import { EncuentroUnroutedPlistComponent } from './component/application/unrouted/encuentro/plist/encuentro-unrouted-plist.component';
import { EncuentroRoutedEditComponent } from './component/application/routed/encuentro/edit/encuentro-routed-edit.component';
import { EncuentroRoutedRemoveComponent } from './component/application/routed/encuentro/remove/encuentro-routed-remove.component';
import { DiscordComponent } from './component/shared/unrouted/discord/discord.component';
import { InfiniteRoutedListComponent } from './component/application/routed/usuario/infinite/infinite-routed-list.component';
import { UsuarioCplistUnroutedComponent } from './component/application/unrouted/usuario/cplist/usuario-cplist-unrouted.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { UsuarioInfiniteListComponent } from './component/application/routed/usuario/usuario-infinite-list/usuario-infinite-list.component';
import { EquipoNormalViewComponent } from './component/application/routed/equipo/normal-view/equipo-normal-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { TipousuarioNewComponent } from './component/application/routed/tipousuario/tipousuario-new/tipousuario-new.component';
import { TipousuarioEditComponent } from './component/application/routed/tipousuario/tipousuario-edit/tipousuario-edit.component';
import { TipousuarioDeleteComponent } from './component/application/routed/tipousuario/tipousuario-delete/tipousuario-delete.component';
import { TipousuarioPlistComponent } from './component/application/routed/tipousuario/tipousuario-plist/tipousuario-plist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    usuarioroutedViewComponent,
    usuariounroutedViewComponent,
    UsuarioRoutedPlistComponent,
    UsuarioUnroutedPlistComponent,
    UsuarioRoutedNewComponent,
    ModalComponent,
    PopupComponent,
    TipousuarioUnroutedPlistComponent,
    TrimPipe,
    UsuarioRemoveRoutedComponent,
    UsuarioRoutedEditComponent,
    EquipoRoutedViewComponent,
    EquipoUnroutedViewComponent,
    EquipoRoutedEditComponent,
    EquipoRoutedRemoveComponent,
    EquipoUnroutedPlistComponent,
    EquipoRoutedPlistComponent,
    EquipoRoutedNewComponent,
    EncuentroRoutedNewComponent,
    EncuentroRoutedViewComponent,
    EncuentroUnroutedViewComponent,
    EncuentroRoutedPlistComponent,
    EncuentroUnroutedPlistComponent,
    EncuentroRoutedEditComponent,
    EncuentroRoutedRemoveComponent,
    DiscordComponent,
    InfiniteRoutedListComponent,
    UsuarioInfiniteListComponent,
    UsuarioCplistUnroutedComponent,
    EquipoNormalViewComponent,
    TipousuarioNewComponent,
    TipousuarioEditComponent,
    TipousuarioDeleteComponent,
    TipousuarioPlistComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    AutoCompleteModule
  ],
  providers: [
    SessionService,
    SessionResolver,
    APIService,
    DateTimeService,
    CryptoService,
    EquipoService,
    IconService,
    PaginationService,
    PartidoService,
    TipousuarioService,
    UsuarioService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
