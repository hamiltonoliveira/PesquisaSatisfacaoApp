import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LocalStorageService } from './services/LocalStorage.service';

import { AuthService } from './services/backend-service.service';

import {
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  errorMessage: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  });
  submitted = false;

  constructor( private formBuilder: FormBuilder,
               private LocalStorageService: LocalStorageService,
               private AuthService: AuthService) {}

  ngOnInit() : void {
    this.form = this.formBuilder.group(
       {
        nome: ['', Validators.required],
        email: ['', Validators.required],
        senha: ['', Validators.required],
      }



  )}


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
     let formDTO = JSON.stringify(this.form.value);
     this.AuthService.Autenticar(formDTO).subscribe(data=>{
      if (data) {
       this.SalvarToken(data);
      }
    },
    error => {
      // Ocorreu um erro na autenticação, exiba a mensagem de erro na tela
      console.error("Erro na autenticação:", error);
      // Exiba a mensagem de erro na tela para os usuários (por exemplo, usando uma variável de erro no template)
      this.errorMessage = "Erro no cadastramento: Usuário possui cadastro.";
    });
  }

  SalvarToken(jwtToken:any):void{
    this.LocalStorageService.setJWT(JSON.stringify(jwtToken))
  }
}
