import { UsuarioService } from 'src/app/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class usuarioroutedViewComponent implements OnInit {

  id: number;
  idequipo:number;
  strUsuarioSession: string;
  strEntity: string = "usuario"
  strOperation: string = "view"
  strTitleSingular:string= "usuario"
  oUsuarioSession:IUsuario

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    private oUsuarioService: UsuarioService
  ) {
    
  }

  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      this.oRouter.navigate(['/home']);
    }

      this.id=this.oActivatedRoute.snapshot.params.id

  }

  getUser(id:number){
    this.oUsuarioService
      .getOne(id)
      .subscribe((oData: IUsuario) => {
        this.idequipo = oData.equipo.id;
  })}

  goBack() {
    this.oLocation.back();
  }
}
