import { Component, OnInit } from '@angular/core';
import { SalaChatService } from '../../../servicios/sala-chat/sala-chat.service';
import { DocenteService } from '../../../servicios/docente/docente.service';
import { SalaChat } from '../../../models/salaChat';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddChatComponent } from '../../dialogs/add-chat/add-chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  idDocente;
  salas: SalaChat[]=[];
  dialogRoom: MatDialogRef<AddChatComponent>;

  constructor(
    private chatService: SalaChatService,
    public dialog: MatDialog,
    private docenteService: DocenteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.idDocente = this.docenteService.obtenerIdDocente()
    this.chatService.listarSalasChat(this.idDocente).subscribe(res => {
      this.salas = res.listaSalasChat;
    })
  }
  agregarSala(){
    this.dialogRoom = this.dialog.open(AddChatComponent);
  }
  detalles(id){
    this.router.navigate(['/glosario/'+id])
  }
}
