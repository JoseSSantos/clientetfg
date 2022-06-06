import { PaginationService } from '../../../../../service/pagination.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IUsuarioPage, IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-equipo-routed-plist',
  templateUrl: './equipo-routed-plist.component.html',
  styleUrls: ['./equipo-routed-plist.component.css']
})
export class EquipoRoutedPlistComponent implements OnInit {

  strEntity: string = "equipo"
  strOperation: string = "plist"
  strTitleSingular: string = "Equipo";
  strTitlePlural: string = "Equipos";

  strUsuarioSession: string;

  id_tipousuario: number = null;

  fila: IUsuario;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPostService: UsuarioService,
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute,
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.id_tipousuario = this.oActivatedRoute.snapshot.params.id_tipousuario;


  }

  ngOnInit(): void { }

}
