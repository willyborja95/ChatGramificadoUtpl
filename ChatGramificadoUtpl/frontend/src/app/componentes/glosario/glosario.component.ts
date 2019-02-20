import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/table';
import { ChatService } from '../../servicios/chat/chat.service';
import { SalaChatService } from '../../servicios/sala-chat/sala-chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { GlosarioTermino } from '../../models/glosarioTermino';
import { GlosarioService } from '../../servicios/glosario/glosario.service';
import { AddTerminoComponent } from '../dialogs/add-termino/add-termino.component';
import { EditTerminoComponent } from '../dialogs/edit-termino/edit-termino.component';
import { SalaChat } from 'src/app/models/salaChat';

@Component({
  selector: 'app-glosario',
  templateUrl: './glosario.component.html',
  styleUrls: ['./glosario.component.scss']
})


export class GlosarioComponent implements OnInit {

  displayedColumns: string[] = ['termino', 'descripcion', 'accion'];
  dialogRoom: MatDialogRef<AddTerminoComponent>;
  dialogEditTerm: MatDialogRef<EditTerminoComponent>;
  dataSource = new MatTableDataSource();

  salaForm = this.fb.group({
    nombre: ['', Validators.required],
  })
  idChat: string;
  constructor(
    private fb: FormBuilder,
    private chatService: SalaChatService,
    private glosarioService: GlosarioService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.idChat = this.route.snapshot.params['id'];
    this.obtenerDatos();
  }
  obtenerDatos() {
    const sala = {
      chat: this.idChat
    }
    this.chatService.obtenerNombreSalaChat(this.idChat).subscribe(chat => {
      this.salaForm.get('nombre').setValue(chat.salaEncontrada.nombreChat);
      this.glosarioService.listarTerminosGlosario(sala).subscribe(terminos => {
        this.dataSource.data = terminos.terminosGlosarioAlmacenados;
      })
    })
  }
  modal() {
    this.dialogRoom = this.dialog.open(AddTerminoComponent, {
      data: { idChat: this.idChat },
    });
    this.dialogRoom.afterClosed().subscribe(() => {
      this.obtenerDatos();
    });
  }
  chat() {
    this.router.navigate(['/chat/' + this.idChat])
  }
  eliminar(id) {
    this.glosarioService.eliminarTerminoGlosario(id);
    this.obtenerDatos();
  }
  editar(id) {
    this.dialogEditTerm = this.dialog.open(EditTerminoComponent, {
      data: {
        idTermino: id,
        idChat: this.idChat,
      },
    });
    this.dialogEditTerm.afterClosed().subscribe(() => {
      this.obtenerDatos();
    });
  }
  actualizarSala() {
    const sala:SalaChat = {
      _id: this.idChat,
      nombreChat: this.salaForm.value.nombre,
    }
    this.chatService.actualizarSalaChat(sala);
  }
}
