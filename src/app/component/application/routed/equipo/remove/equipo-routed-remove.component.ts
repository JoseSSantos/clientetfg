import { IEquipo } from '../../../../../model/equipo-interfaces';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IconService } from 'src/app/service/icon.service';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-equipo-routed-remove',
  templateUrl: './equipo-routed-remove.component.html',
  styleUrls: ['./equipo-routed-remove.component.css']
})
export class EquipoRoutedRemoveComponent implements OnInit {

  id: number = 0;
  oEquipo: IEquipo;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "equipo"
  strOperation: string = "remove"
  strTitleSingular: string = "Equipo";
  strTitlePlural: string = "Equipos";

  constructor(
    private oEquipoService: EquipoService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
    public oIconService: IconService

  ) {
    // control de sesión
    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    // recogida de parámetros
    this.id = this.oActivatedRoute.snapshot.params.id;
    // llamada al servidor
    this.getOne();
  }

  ngOnInit(): void {}

  getOne = () => {
    this.oEquipoService
      .getOne(this.id)
      .subscribe((oData: IEquipo) => {
        this.oEquipo = oData;
      });
  };

  removeOne() {
    this.oEquipoService.removeOne(this.id).subscribe((data: number) => {
      this.strResult = 'Equipo eliminado';
      this.openPopup();
    });
  }

  goBack() {
    this._location.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/plist']);
  }
}
