import { PaginationService } from '../../../../../service/pagination.service';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IUsuarioPage, IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-cplist-unrouted',
  templateUrl: './usuario-cplist-unrouted.component.html',
  styleUrls: ['./usuario-cplist-unrouted.component.css']
})
export class UsuarioCplistUnroutedComponent implements OnInit {

  @Input() id_tipousuario_session: number = null;
  @Input() id_tipoproducto: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  @ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = "jugador"
  strOperation: string = "plist"
  strTitleSingular: string = "jugador";
  strTitlePlural: string = "Jugadores";
  aUsuario: IUsuario[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();
  barraPaginacion: string[];
  winRate:number;




  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oUsuarioService: UsuarioService,

    public oIconService: IconService
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.id_tipoproducto = this.oRoute.snapshot.params.id_tipoproducto;
    if (this.id_tipoproducto) {
      this.strFilteredMessage = "Listado filtrado por el tipo de producto " + this.id_tipoproducto;
    } else {
      this.strFilteredMessage = "";
    }

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());
  }


  getPage = () => {
    console.log("buscando...", this.strFilter);
    this.oUsuarioService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection).subscribe((oPage: IUsuarioPage) => {

      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aUsuario = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }




  jumpToPage = () => {
    this.getPage();
    return false;
  }
//   onKeyUpFilter(event: KeyboardEvent): void {
//     this.subjectFiltro$.next();
//   }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }

}