import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {  ITipoUsuarioPage,  ITipoUsuarioPlist,} from 'src/app/model/tipousuario-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { TipousuarioService } from 'src/app/service/tipousuario.service';

@Component({
  selector: 'app-tipousuario-unrouted-plist',
  templateUrl: './tipousuario-unrouted-plist.component.html',
  styleUrls: ['./tipousuario-unrouted-plist.component.css'],
})
export class TipousuarioUnroutedPlistComponent implements OnInit {

  @Input() id_usuario: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();

  strEntity: string = 'tipousuario';
  strOperation: string = 'plist';
  strTitleSingular: string = 'Tipo de usuario';
  strTitlePlural: string = 'Tipos de usuario';
  aTipoUsuarios: ITipoUsuarioPlist[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = '';
  strSortField: string = '';
  strSortDirection: string = '';
  strFilteredMessage: string = '';
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oTipoUsuarioService: TipousuarioService,
    public oIconService: IconService
  ) {

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
    this.subjectFiltro$
      .pipe(debounceTime(1000))
      .subscribe(() => this.getPage());
  }

  getPage = () => {
    console.log('buscando...', this.strFilter);
    this.oTipoUsuarioService
      .getPage(
        this.nPageSize,
        this.nPage,
        this.strFilter,
        this.strSortField,
        this.strSortDirection
      )
      .subscribe((oPage: ITipoUsuarioPage) => {
        if (this.strFilter) {
          this.strFilteredMessage = 'Listado filtrado: ' + this.strFilter;
        } else {
          this.strFilteredMessage = '';
        }
        this.aTipoUsuarios = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.nTotalPages = oPage.totalPages;
        this.aPaginationBar = this.oPaginationService.pagination(
          this.nTotalPages,
          this.nPage
        );
      });
  };

  jumpToPage = () => {
    this.getPage();
    return false;
  };

  // onKeyUpFilter(event: KeyboardEvent): void {
  //   this.subjectFiltro$.next();
  // }

  doResetOrder() {
    this.strSortField = '';
    this.strSortDirection = '';
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