import { PaginationService } from '../../../../../service/pagination.service';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IUsuarioPage, IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-unrouted-plist',
  templateUrl: './usuario-unrouted-plist.component.html',
  styleUrls: ['./usuario-unrouted-plist.component.css']
})
export class UsuarioUnroutedPlistComponent implements OnInit {

  @Input() id: number = null;
  @Input() id_equipo: number = null;
  @Input() id_tipousuario: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = "usuario"
  strOperation: string = "plist"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";
  aPosts: IUsuario[];
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

  strFilteredMessage: string = "";
  subjectFiltro$ = new Subject();
  oUsuarioSession: any;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPostService: UsuarioService,
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute,
  ) {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
    ).subscribe(() => this.getPage());
    this.page = 1;
    if (this.oActivatedRoute.snapshot.params.id) {
      this.teamfilter();
    } else {
      this.getPage();
    }

  }

  getPage = () => {
    if (this.id_equipo) {
      this.oPostService.getPageFiltered(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.id_equipo, this.strFilter).subscribe((oPage: IUsuarioPage) => {
        if (this.strFilter) {
          this.strFilteredMessage = "Listado filtrado por el tipo de usuario " + this.id_equipo + " y por " + this.strFilter;
        } else {
          this.strFilteredMessage = "Listado filtrado por el tipo de usuario " + this.id_equipo;
        }
        this.aPosts = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.totalPages = oPage.totalPages;
        this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
      })
    }
    else if(this.strFilter!=null){
      this.getPageFiltered();

    }
     else {
      this.oPostService.getPage(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.strFilter).subscribe((oPage: IUsuarioPage) => {
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
  }

  teamfilter = () => {
    this.oPostService.getPageFiltered(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.id, this.strFilter).subscribe((oPage: IUsuarioPage) => {
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
    if (this.oActivatedRoute.snapshot.params.id) {
      this.teamfilter();
    }else if(this.strFilter!=null){
      this.getPageFiltered();
    } else {
      this.getPage();
    }
    return false;
  }

  getPageFiltered=()=>{

    this.oPostService.getPageWOEquipo(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.id, this.strFilter).subscribe((oPage: IUsuarioPage) => {
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
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next(void 0);
  }

  doFilter = () => {

    if (this.oActivatedRoute.snapshot.params.id) {
      this.getPageFiltered();
      console.log("filtrado");
    } else {
      console.log("sin filtrado");

      this.getPage();
    }
  }

  doResetFilter = () => {
    this.strFilter = null;
    if (this.oActivatedRoute.snapshot.params.id) {
      console.log("filtrado");
      this.teamfilter();
    } else { 
      console.log("Sin filtrar");

      this.getPage(); 
    }
  }

  doResetOrder() {
    this.currentSortField = "";
    this.currentSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    if (this.oActivatedRoute.snapshot.params.id) {

      this.currentSortField = order;
      if (this.currentSortDirection == 'asc') {
        this.currentSortDirection = 'desc';
      } else if (this.currentSortDirection == 'desc') {
        this.currentSortDirection = '';
      } else {
        this.currentSortDirection = 'asc';
      }
      this.teamfilter();
    
    }else{
    this.currentSortField = order;
    if (this.currentSortDirection == 'asc') {
      this.currentSortDirection = 'desc';
    } else if (this.currentSortDirection == 'desc') {
      this.currentSortDirection = '';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.getPage();
  }}

  onSelection(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }

}
