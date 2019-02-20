import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit
} from '@angular/core';
import { ChatService } from './../../servicios/chat/chat.service';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';
//modelos
import { Message } from '../../models/message';
import { Event } from '../../models/event';
import { Action } from '../../models/action';
import { User } from '../../models/user';
//dialogs
import { DialogUserComponent } from '../../componentes/dialogs/dialog-user/dialog-user.component';
import { DialogUserType } from '../../componentes/dialogs/dialog-user/dialog-user-type';
//angular material
import { MatDialog, MatDialogRef, MatList, MatListItem, MatTableDataSource } from '@angular/material';
import { AddChatComponent } from '../../componentes/dialogs/add-chat/add-chat.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DocenteService } from './../../servicios/docente/docente.service';
import { SalaChatService } from '../../servicios/sala-chat/sala-chat.service';
import { GlosarioService } from '../../servicios/glosario/glosario.service';
import { AddGrupalComponent } from '../dialogs/add-grupal/add-grupal.component';
import { SalaChat } from '../../models/salaChat';
import { AddTerminoComponent } from '../dialogs/add-termino/add-termino.component';
import { EditSalaComponent } from '../dialogs/edit-sala/edit-sala.component';
import { TerminosComponent } from '../dialogs/terminos/terminos.component';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';
@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.css']
})

export class SalaChatComponent implements OnInit, AfterViewInit {

  mensaje;
  sala;
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<DialogUserComponent> | null;
  dialogRoom: MatDialogRef<AddGrupalComponent>;
  dialogTermino: MatDialogRef<AddTerminoComponent>;
  dialogGrupal: MatDialogRef<EditSalaComponent>;
  dialogGlosario: MatDialogRef<TerminosComponent>;
  isProfesor: boolean = false;
  salas: SalaChat[] = [];

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
  idChat: any;
  salaNombre: string;
  conectados: number;
  users: [];

  constructor(
    private chatService: ChatService,
    private salaChatService: SalaChatService,
    private glosarioService: GlosarioService,
    private docenteService: DocenteService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
  ) {

  }

  verificarProfesor() {
    this.docenteService.obtenerPerfil().subscribe(user => {
      if (user) {
        this.isProfesor = true;
      } else {
        this.isProfesor = false;
      }
    });
  }
  ngOnInit(): void {
    this.idChat = this.route.snapshot.params['id'];
    this.salaChatService.obtenerMensajes(this.idChat).subscribe(mensajes => {
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
    // this.chatService.nuevaSalaGrupal(this.idChat);
    this.obtenerDatos();
    this.initModel();
    this.verificarProfesor();

    if (this.route.snapshot.params['id'] != undefined) {
      this.chatService.nuevaSala(this.route.snapshot.params['id']);
      this.sala = this.route.snapshot.params['id'];
    }



    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  terminosModal() {
    const sala = {
      sala: this.idChat
    }
    this.dialogGlosario = this.dialog.open(TerminosComponent, {
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
      // console.log('scroll');
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  actualizarChat(sala) {
    this.dialogGrupal = this.dialog.open(EditSalaComponent, {
      data: {
        idChat: sala._id,
        nombre: sala.nombre,
      }
    });
    this.dialogGrupal.afterClosed().subscribe(result => {
      this.obtenerDatos();
    });

  }
  eliminarChat(id) {
    this.salaChatService.eliminarChatGrupal(id);
    this.obtenerDatos();
  }

  obtenerDatos() {
    const sala = {
      chat: this.idChat
    }
    this.salaChatService.obtenerNombreSalaChat(this.idChat).subscribe(chat => {
      this.salaNombre = chat.salaEncontrada.nombreChat;
      this.glosarioService.listarTerminosGlosario(sala).subscribe(terminos => {
        this.dataSource.data = terminos.terminosGlosarioAlmacenados;
      })
    })
    this.salaChatService.listarSalasGrupal(this.idChat).subscribe(res => {
      this.salas = res;
    })
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
        this.scrollToBottom();
   
      });
    this.chatService.getConectados().subscribe(users => {
      this.users = users;
      this.conectados = users.length;

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

  addRoom() {
    this.dialogRoom = this.dialog.open(AddGrupalComponent, {
      data: {
        idChat: this.idChat,
        conectados: this.conectados,
      }
    });
    this.dialogRoom.afterClosed().subscribe(result => {
      this.obtenerDatos();
    });
  }
  modal() {
    this.dialogTermino = this.dialog.open(AddTerminoComponent, {
      data: { idChat: this.idChat },
    });
    this.dialogTermino.afterClosed().subscribe(() => {
      this.obtenerDatos();
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
