import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IEquipo, IEquipoPage } from 'src/app/model/equipo-interfaces';
import { IUsuario, IUsuarioPage } from 'src/app/model/usuario-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-equipo-normal-view',
  templateUrl: './equipo-normal-view.component.html',
  styleUrls: ['./equipo-normal-view.component.css']
})
export class EquipoNormalViewComponent implements OnInit {


  id:number=null;
  equipos: IEquipo[];
  private finishPage :number;
  private actualPage: number=0;
  private pageSize:number=6;
  private page:number=0;
  private currentSortField:string="";
  private currentSortDirection:string="asc" ;
  private strFilter:string="";
  private oEquipoPage:IEquipoPage;
  subjectFiltro$ = new Subject();



  constructor(
    private oEquipoService:EquipoService,

  ) {
    
   }
 
  ngOnInit() {
    this.equipos=[];
    this.getOne();
  }
 
  getOne = () => {
    this.oEquipoService
      .getPage(this.pageSize, this.actualPage, this.currentSortField, this.currentSortDirection, this.strFilter)
      .subscribe((oData: IEquipoPage) => {
        this.oEquipoPage = oData;
        this.finishPage=this.oEquipoPage.totalElements;
        Array.prototype.push.apply(this.equipos, oData.content);
        this.page++
        this.actualPage++;
      });
  };

  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next(void 0);
    console.log("hola")

  }

  // doFilter = () => {

  //   this.getPageFiltered();

  // }

  doResetFilter = () => {
    this.strFilter = null;
    this.getOne();
  }

  // getPageFiltered=()=>{

  //   this.oUsuarioService.getPageWOEquipo(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.id, this.strFilter).subscribe((
  //     oData: IUsuarioPage) => {

  //       this.oUsuarioPage = oData;
  //       this.finishPage=this.oUsuarioPage.totalElements;
  //       Array.prototype.push.apply(this.usuarios, oData.content);
  //       this.page++;
  //   })

  // }

  onScroll() {
    console.log("onscroll")
    if (this.actualPage < this.finishPage) {
    //   if(this.strFilter!=null){      
    //   console.log("hola")
    //   this.actualPage ++;
    //   this.getPageFiltered();
    // }else{
      console.log("hola")
      this.actualPage ++;
      this.getOne();
    // }
    } else {
      console.log('No more lines. Finish page!');
    }
  }
}
