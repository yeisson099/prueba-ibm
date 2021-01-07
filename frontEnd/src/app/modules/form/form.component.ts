import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {EncryptService} from '../../services/encrypt.service'



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  public publicKey:any
  public loader:boolean;
  private cript:any;

  encrypForm: FormGroup;

  constructor(private encryptServices:EncryptService,
    private _builder:FormBuilder) {
      this.loader=false;
      this.encrypForm = this._builder.group({
        nombre:['',Validators.required],
        cedula:['',Validators.required],
        oculto:['']
      });
  }

  ngOnInit() {
    this.getkey();
  }
  getkey(){
    this.encryptServices.getKey().subscribe(res=>{
      this.publicKey = res['keyNumber'];
    }
    ,err =>{
      console.log(err);
    })
  }
  focusOutFunction(values){
    this.loader = true;
    console.log('salio',values);
    // const cc  = values.cedula;
    // console.log(values);
    this.encryptServices.enmascararValor(values).subscribe(res=>{
      console.log('respuesta',res)
      document.getElementById("cedula")['value'] = res['cedula'];
      document.getElementById("oculto")['value'] = values['cedula'];
      this.encrypForm.value.oculto = values['cedula'];
      console.log(this.encrypForm.value.cedula);
      this.loader = false;
    }
    ,err=>{
      console.log(values);

      console.log('murio',err);
    });
  }
  focusFunction(values){
    document.getElementById("cedula")['value'] = values['cedula'];
    this.encrypForm.value.oculto = values['cedula'];
  }
  send(values){
    let encrypt = {
      'key': this.publicKey,
      'value': values.oculto
    };
    console.log(encrypt)
    this.encryptServices.encriptarValor(encrypt).subscribe(res=>{
      console.log('respuesta e',res);
      this.cript=res['value'];
      this.loader = false;
    }
    ,err=>{
      console.log('murio',err);
    });
  }

  decript(){
    let decrypt = {
      'value': this.cript
    };
    this.encryptServices.desencriptarValor(decrypt).subscribe(res=>{
      console.log('decryp',res)
    },
    err=>{
      console.log(decrypt)
      console.log('decryp',err)
    });
  }


}
