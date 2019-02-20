import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocenteService } from '../../servicios/docente/docente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private docenteService: DocenteService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
    this.registroForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  login(){
    this.docenteService.consultarDocenteIngreso(this.loginForm.value)
  }
  registro(){
    console.log(this.registroForm.value);
    this.docenteService.guardarDocente(this.registroForm.value)
  }
  resetForm() {
    this.loginForm.reset();
  }
}
