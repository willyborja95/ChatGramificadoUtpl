import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UiComponent } from './componentes/ui/ui.component';
import { NavbarComponent } from './componentes/ui/navbar/navbar.component';
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DocenteService } from './servicios/docente/docente.service';
import { SalaChatService } from './servicios/sala-chat/sala-chat.service';
import { ChatService } from './servicios/chat/chat.service';
import { GlosarioService } from './servicios/glosario/glosario.service';
//dialogs
import { AddChatComponent } from './componentes/dialogs/add-chat/add-chat.component';
import { DialogUserComponent } from './componentes/dialogs/dialog-user/dialog-user.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { SalaChatComponent } from './componentes/sala-chat/sala-chat.component';
import { AddTerminoComponent } from './componentes/dialogs/add-termino/add-termino.component';
import { ToastrModule } from 'ngx-toastr';
import { EditTerminoComponent } from './componentes/dialogs/edit-termino/edit-termino.component';
import { CommonModule } from '@angular/common';
import { AddGrupalComponent } from './componentes/dialogs/add-grupal/add-grupal.component';
import { SalaGrupalComponent } from './componentes/sala-grupal/sala-grupal.component';
import { EditSalaComponent } from './componentes/dialogs/edit-sala/edit-sala.component';
const config: SocketIoConfig = { url: environment.url, options: {} };

import { DeviceDetectorModule } from 'ngx-device-detector';
import { TerminosComponent } from './componentes/dialogs/terminos/terminos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UiComponent,
    NavbarComponent,
    AddChatComponent,
    DialogUserComponent,
    ChatComponent,
    SalaChatComponent,
    AddTerminoComponent,
    EditTerminoComponent,
    AddGrupalComponent,
    SalaGrupalComponent,
    EditSalaComponent,
    TerminosComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    DeviceDetectorModule.forRoot(),
  ],
  providers: [
    DocenteService,
    SalaChatService,
    ChatService,
    GlosarioService,
  ],
  bootstrap: [AppComponent],
  exports: [
    MaterialModule,
  ],
  entryComponents:[
    AddChatComponent,
    DialogUserComponent,
    AddTerminoComponent,
    EditTerminoComponent,
    AddGrupalComponent,
    EditSalaComponent,
    TerminosComponent,
  ]
})
export class AppModule { }
