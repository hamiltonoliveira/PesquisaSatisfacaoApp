import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('')
  });
  submitted = false;

  constructor( private formBuilder: FormBuilder) {}

  ngOnInit() : void {
    this.form = this.formBuilder.group(
       {
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
     let x = JSON.stringify(this.form.value, null, 2);
    console.log(x);
    this.Login();
  }

  Login():void{
   console.log("logado")
  }

}
