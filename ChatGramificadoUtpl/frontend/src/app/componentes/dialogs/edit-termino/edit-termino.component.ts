import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GlosarioService } from '../../../servicios/glosario/glosario.service';
import { GlosarioTermino } from '../../../models/glosarioTermino';

@Component({
  selector: 'app-edit-termino',
  templateUrl: './edit-termino.component.html',
  styleUrls: ['./edit-termino.component.scss']
})
export class EditTerminoComponent implements OnInit {
  idTermino: string;
  idChat: string;

  constructor(
    public dialogRef: MatDialogRef<EditTerminoComponent>,
    private fb: FormBuilder,
    private glosarioService: GlosarioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  terminoForm = this.fb.group({
    termino: ['', Validators.required],
    descripcion: ['', Validators.required],
  })

  ngOnInit() {
    this.idTermino = this.data.idTermino;
    this.idChat = this.data.idChat;
    this.setValues();
  }
  setValues(){
    this.glosarioService.obtenerTermino(this.idTermino).subscribe(res=>{
      this.terminoForm.get('termino').setValue(res.termino.termino)
      this.terminoForm.get('descripcion').setValue(res.termino.descripcion)
    })
  }
  editTermino(){
    let termino: GlosarioTermino = {
      _id:this.idTermino,
      termino:this.terminoForm.value.termino,
      descripcion:this.terminoForm.value.descripcion,
      chat: this.idChat,

    }
    this.glosarioService.actualizarTermino(termino);
  }

}
