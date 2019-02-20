import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { DocenteService } from '../../../servicios/docente/docente.service';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  // usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;
  isEstudiante: boolean = true;


  salaForm = this.fb.group({
    usernameFormControl: ['', Validators.required],
    cedula: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private docenteService: DocenteService,
    public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) {
    this.previousUsername = params.username ? params.username : undefined;
  }

  ngOnInit() {
    this.verificarProfesor();
  }

  verificarProfesor() {
    let nombre = this.docenteService.obtenerNombresDocente();
    let apellido = this.docenteService.ObtenerApellidosDocente();
    if (this.docenteService.haIniciadoSesion()) {
      this.salaForm.get('usernameFormControl').setValue(nombre + ' ' + apellido);
      this.isEstudiante = false;
      setTimeout(() => this.onSave());
    } else if (localStorage.getItem('username') && !this.docenteService.haIniciadoSesion()){
      this.salaForm.get('usernameFormControl').setValue(localStorage.getItem('username'));
      this.salaForm.get('cedula').setValue(localStorage.getItem('cedula'));
    } else {
      this.salaForm.get('usernameFormControl').setValue(this.params.username);
    }
  }

  public onSave(): void {
    localStorage.setItem('username', this.salaForm.value.usernameFormControl);
    localStorage.setItem('cedula', this.salaForm.value.cedula);
    this.dialogRef.close({
      username: this.salaForm.value.usernameFormControl,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
}
