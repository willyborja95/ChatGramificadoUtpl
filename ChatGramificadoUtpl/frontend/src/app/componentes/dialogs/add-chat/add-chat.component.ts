import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../../../servicios/chat/chat.service';
import { SalaChatService } from '../../../servicios/sala-chat/sala-chat.service';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private chatService: SalaChatService,
    public dialogRef: MatDialogRef<AddChatComponent>,
  ) { }

  salaForm = this.fb.group({
    nombreChat: ['', Validators.required],
  })
  ngOnInit() {
  }
  addSala(){
    this.chatService.guardarSalaChat(this.salaForm.value.nombreChat);
    this.dialogRef.close();
  }
}
