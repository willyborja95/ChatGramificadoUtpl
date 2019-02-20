import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GlosarioService } from '../../../servicios/glosario/glosario.service';
import { GlosarioTermino } from '../../../models/glosarioTermino';

@Component({
  selector: 'app-add-termino',
  templateUrl: './add-termino.component.html',
  styleUrls: ['./add-termino.component.scss']
})
export class AddTerminoComponent implements OnInit {
  idChat: string;

  constructor(
    public dialogRef: MatDialogRef<AddTerminoComponent>,
    private fb: FormBuilder,
    private glosarioService: GlosarioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  terminoForm = this.fb.group({
    termino: ['', Validators.required],
    descripcion: ['', Validators.required],
  })

  ngOnInit() {
    this.idChat = this.data.idChat;
  }
  addtermino(){
    let termino:GlosarioTermino={
      chat: this.idChat,
      termino: this.terminoForm.value.termino,
      descripcion: this.terminoForm.value.descripcion,
    }
    this.glosarioService.agregarTermino(termino);
    console.log(termino);
    this.dialogRef.close();
  }

}
