import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  constructor(private http:HttpClient) { }

  getKey(){
    return this.http.get("http://localhost:3000/api/key");
  }
  enmascararValor(valor){
    return this.http.post("http://localhost:3000/api/enmascarar",valor)
  }
  encriptarValor(valor){
    return this.http.post("http://localhost:3000/api/encryptar",valor)
  }
  desencriptarValor(valor){
    return this.http.post("http://localhost:3000/api/decrypt",valor)
  }
}
