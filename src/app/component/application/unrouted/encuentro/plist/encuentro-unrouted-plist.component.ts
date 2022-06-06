import { PaginationService } from '../../../../../service/pagination.service';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime, map } from 'rxjs/operators';
import { IEquipo, IEquipoPage } from 'src/app/model/equipo-interfaces';
import { PartidoService } from 'src/app/service/partido.service';
import { IPartido, IPartidoPage } from 'src/app/model/partido-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-encuentro-unrouted-plist',
  templateUrl: './encuentro-unrouted-plist.component.html',
  styleUrls: ['./encuentro-unrouted-plist.component.css']
})
export class EncuentroUnroutedPlistComponent implements OnInit {

  @Input() id_tipousuario: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = "Encuentro"
  strOperation: string = "plist"
  strTitleSingular: string = "Encuentro";
  strTitlePlural: string = "Encuentros";
  aPosts: IPartido[];
  nTotalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;
  id2ShowViewModal: number = 0;
  strUsuarioSession: string;
  strResult: string = null;
  strFilter: string = "";
  currentSortField: string = "";
  currentSortDirection: string = "";
  oUsuarioSession:IUsuario;
  strFilteredMessage: string = "";
  subjectFiltro$ = new Subject();

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPartidoService: PartidoService,
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute,
  ) { 

    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
    ).subscribe(() => this.getPage());
    this.page = 1;
    this.getPage();
  }

  getPage = () => {
    // if (this.id_tipousuario) {
    //   this.oPostService.getPageFiltered(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.strFilter, this.id_tipousuario).subscribe((oPage: IPageUsuario) => {
    //     if (this.strFilter) {
    //       this.strFilteredMessage = "Listado filtrado por el tipo de usuario " + this.id_tipousuario + " y por " + this.strFilter;
    //     } else {
    //       this.strFilteredMessage = "Listado filtrado por el tipo de usuario " + this.id_tipousuario;
    //     }
    //     this.aPosts = oPage.content;
    //     this.nTotalElements = oPage.totalElements;
    //     this.totalPages = oPage.totalPages;
    //     this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
    //   })
    // } else {
      this.oPartidoService.getPage(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.strFilter).subscribe((oPage: IPartidoPage) => {
        if (this.strFilter) {
          this.strFilteredMessage = "Listado filtrado por " + this.strFilter;
        } else {
          this.strFilteredMessage = "Listado NO filtrado";
        }
        this.aPosts = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.totalPages = oPage.totalPages;
        this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
        console.log(oPage);
      })
    }
  

  jumpToPage = () => {
    this.getPage();
    return false;
  }

  // onKeyUpFilter(event: KeyboardEvent): void {
  //   this.subjectFiltro$.next();
  // }

  doFilter() {
    this.getPage();
  }

  doResetFilter() {
    this.strFilter = "";
    this.getPage();
  }

  doResetOrder() {
    this.currentSortField = "";
    this.currentSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.currentSortField = order;
    if (this.currentSortDirection == 'asc') {
      this.currentSortDirection = 'desc';
    } else if (this.currentSortDirection == 'desc') {
      this.currentSortDirection = '';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection1(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }
  onSelection2(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next(void 0);
  }

}