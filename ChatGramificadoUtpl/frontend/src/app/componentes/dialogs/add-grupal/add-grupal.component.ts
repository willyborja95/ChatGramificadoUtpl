import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { SalaChatService } from '../../../servicios/sala-chat/sala-chat.service';

@Component({
  selector: 'app-add-grupal',
  templateUrl: './add-grupal.component.html',
  styleUrls: ['./add-grupal.component.scss']
})
export class AddGrupalComponent implements OnInit {
  conectados: number;
  constructor(
    private fb: FormBuilder,
    // private chatService: ChatService,
    private chatService: SalaChatService,
    public dialogRef: MatDialogRef<AddGrupalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  salaForm = this.fb.group({
    // nombre: ['', Validators.required],
    numero: ['', Validators.required],
  })
  ngOnInit() {
    this.conectados = this.data.conectados;
  }
  addSala() {
    const participantes = this.salaForm.value.numero;
  
    for (let i = 1; i <= participantes; i++) {
      const sala = {
        idChat: this.data.idChat,
        nombre: `Grupo ${i}`,
        // numero: this.salaForm.value.numero,
        // url: this.salaForm.value.numero,
      }
      this.chatService.guardarSalaGrupal(sala);
    }
  }
}
