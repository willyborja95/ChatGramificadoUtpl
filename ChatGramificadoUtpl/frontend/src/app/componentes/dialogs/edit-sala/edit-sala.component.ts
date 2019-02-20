import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { SalaChatService } from '../../../servicios/sala-chat/sala-chat.service';
import { SalaChat } from 'src/app/models/salaChat';

@Component({
  selector: 'app-edit-sala',
  templateUrl: './edit-sala.component.html',
  styleUrls: ['./edit-sala.component.scss']
})
export class EditSalaComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private chatService: SalaChatService,
    public dialogRef: MatDialogRef<EditSalaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  salaForm = this.fb.group({
    nombre: ['', Validators.required],
  });

  ngOnInit() {
    this.salaForm.get('nombre').setValue(this.data.nombre);
  }

  addSala() {
    const sala: SalaChat = {
      _id: this.data.idChat,
      nombre: this.salaForm.value.nombre,
    }
    this.chatService.actualizarChatGrupal(sala);
  }
}
