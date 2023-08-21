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
  EnqueteVisualizar: boolean = false;
  selectedNivel: string = '';

  componentVisible = true;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  });

  form2: FormGroup = new FormGroup({
    usuarioId: new FormControl(''),
    nome: new FormControl(''),
    nivelSatisfacao: new FormControl('')
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
      },
     this.form2 = this.formBuilder.group({
      usuarioId:[''],
      nome: ['', Validators.required],
      nivelSatisfacao: ['', Validators.required]
     })
  )

  const tokenExists = this.VerificaSeExisteToken();
  if(tokenExists){
    this.EnqueteVisualizar = tokenExists;
    this.componentVisible = tokenExists;
   }
   else{
    this.componentVisible = false;
    this.EnqueteVisualizar = true;
    }
  }

  VerificaSeExisteToken(): boolean {
    const jwt = this.LocalStorageService.getJWT();
    return jwt !== null;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.form2.controls;
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
      console.error("Erro na autenticação:", error);
      this.errorMessage = "Erro no cadastramento: Usuário possui cadastro.";
    });
  }

  onSubmit2():void{
    //this.submitted = true;
    //if (this.form2.invalid) {
      //return;
    //}

    const usuarioId = this.getJWTUserId();

    const enqueteMonta = {
      UsuarioId: usuarioId,
      Nome: this.form2.value['nome'],
      SatisfacaoNivel: this.selectedNivel
    };

    let formDTO2 = JSON.stringify(enqueteMonta);

    this.AuthService.EnqueteCadastrar(formDTO2).subscribe(data=>{
     if (data) {
          this.errorMessage = "Nível de satisfação: Efetuado o seu cadastramento.";
     }},
     error => {
      this.errorMessage = "Nível de satisfação: cadastro efetuado.";
    });
    }

    onNivelSatisfacaoChange(event: any) {
      this.selectedNivel = event.target.value;
   }

  SalvarToken(jwtToken:any):void{
    this.LocalStorageService.setJWT(JSON.stringify(jwtToken))
    window.location.reload();
  }

  getJWTUserId(): string | null {
    const dataString = localStorage.getItem('jwtToken');
    if (dataString !== null) {
      const data = JSON.parse(dataString);
      if (data && typeof data.usuarioId === 'number') {
       return data.usuarioId;
      }
    }
    return null;
  }
}

