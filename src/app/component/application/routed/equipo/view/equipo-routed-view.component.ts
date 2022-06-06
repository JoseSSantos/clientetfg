import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { Location } from '@angular/common';


@Component({
  selector: 'app-equipo-routed-view',
  templateUrl: './equipo-routed-view.component.html',
  styleUrls: ['./equipo-routed-view.component.css']
})
export class EquipoRoutedViewComponent implements OnInit {

  id: number;
  strUsuarioSession: string;
  strEntity: string = "Equipo"
  strOperation: string = "view"
  strTitleSingular:string= "Equipo"
  oUsuarioSession:IUsuario

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    //public oIconService: IconService

  ) {
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    //this.id = this.oActivatedRoute.snapshot.params.get('id'); Para probar
  }

  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

  }

  goBack() {
    this.oLocation.back();
  }
}
