import { IEquipo } from '../../../../../model/equipo-interfaces';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IconService } from 'src/app/service/icon.service';
import { EquipoService } from 'src/app/service/equipo.service';
import { IPartido } from 'src/app/model/partido-interfaces';
import { PartidoService } from 'src/app/service/partido.service';

@Component({
  selector: 'app-encuentro-routed-remove',
  templateUrl: './encuentro-routed-remove.component.html',
  styleUrls: ['./encuentro-routed-remove.component.css']
})
export class EncuentroRoutedRemoveComponent implements OnInit {


  id: number = 0;
  oPartido: IPartido;
  strUsuarioSession: string;
  strResult: string = null;
  strEntity: string = "encuentro"
  strOperation: string = "remove"
  strTitleSingular: string = "encuentro";
  strTitlePlural: string = "Encuentros";

  constructor(
    private oPartidoService: PartidoService,
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
    this.oPartidoService
      .getOne(this.id)
      .subscribe((oData: IPartido) => {
        this.oPartido = oData;
      });
  };

  removeOne() {
    this.oPartidoService.removeOne(this.id).subscribe((data: number) => {
      this.strResult = 'Partido eliminado';
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
    this.oRouter.navigate([this.strEntity + 's/plist']);
  }
}

