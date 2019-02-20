import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { ChatService } from '../../servicios/chat/chat.service';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//modelos
import { Message } from '../../models/message';
import { Event } from '../../models/event';
import { Action } from '../../models/action';
import { User } from '../../models/user';
//dialogs
import { DialogUserType } from '../../componentes/dialogs/dialog-user/dialog-user-type';
//angular material
import { MatDialog, MatDialogRef, MatList, MatListItem, MatTableDataSource } from '@angular/material';
import { AddChatComponent } from '../../componentes/dialogs/add-chat/add-chat.component';
import { ActivatedRoute } from '@angular/router';
import { DocenteService } from '../../servicios/docente/docente.service';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SalaChatService } from '../../servicios/sala-chat/sala-chat.service';
import { TerminosComponent } from '../dialogs/terminos/terminos.component';
import { GlosarioService } from 'src/app/servicios/glosario/glosario.service';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';
@Component({
  selector: 'app-sala-grupal',
  templateUrl: './sala-grupal.component.html',
  styleUrls: ['./sala-grupal.component.scss']
})
export class SalaGrupalComponent implements OnInit, AfterViewInit {

  mensaje;
  sala;
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  dialogRoom: MatDialogRef<TerminosComponent>;
  isProfesor: boolean = false;
  displayedColumns: string[] = ['termino', 'descripcion'];
  dataSource = new MatTableDataSource();


  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Bienvenido',
      dialogType: DialogUserType.NEW
    }
  };

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;
  deviceInfo: any;
  isMobile: boolean = false;
  chat: any;
  conectados: number;
  users: [];


  constructor(
    private chatService: ChatService,
    private salaChatService: SalaChatService,
    private glosarioService: GlosarioService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private deviceService: DeviceDetectorService
  ) {

  }


  ngOnInit(): void {
    this.initModel();
    this.comprobarDispositivo();
    this.sala = this.route.snapshot.params['id'];
    this.salaChatService.obtenerSalaGrupal(this.sala).subscribe(sala=>{
      this.chat = sala.chat;
      this.salaChatService.obtenerMensajes(this.sala).subscribe(mensajes => {
        const messages: any = mensajes;
        messages.forEach(mensaje => {
          const men: Message = {
            from: {
              avatar: mensaje.avatar,
              id: 488660,
              name: mensaje.username,
            }, content: mensaje.mensaje
          }
          this.messages.push(men);
        });
      })
      this.cargarDatos();
    })


    if (this.route.snapshot.params['id'] != undefined) {
      this.chatService.nuevaSalaGrupal(this.route.snapshot.params['id']);
      this.sala = this.route.snapshot.params['id'];
    }


    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }
  comprobarDispositivo() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    if (isTablet || isMobile) {
      this.isMobile = true;
    }
  }
  terminosModal(){
    const sala = {
      sala: this.chat
    }
    this.dialogRoom = this.dialog.open(TerminosComponent, {
      data: sala
    });
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
  cargarDatos(){
    const sala = {
      chat: this.chat
    }
    this.glosarioService.listarTerminosGlosario(sala).subscribe(terminos => {
      this.dataSource.data = terminos.terminosGlosarioAlmacenados;
    });
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }
  private initIoConnection(): void {

    this.ioConnection = this.chatService.getMessagesSala(this.sala)
      .subscribe((message: Message) => {
        this.messages.push(message);

        this.chatService.getConectados().subscribe(users => {
          this.users = users;
          this.conectados = users.length;

        });
      });


    this.chatService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.chatService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Editar Detalles',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(DialogUserComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        this.sendNotification(paramsDialog, Action.JOINED);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        this.sendNotification(paramsDialog, Action.RENAME);
      }
    });
  }



  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.chatService.sendMsgSala(this.sala, {
      from: this.user,
      content: message,
      sala: this.sala,
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action,
        sala: this.sala,
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        },
        sala: this.sala,
      };
    }

    this.chatService.sendMsgSala(this.sala, message);
  }



}

