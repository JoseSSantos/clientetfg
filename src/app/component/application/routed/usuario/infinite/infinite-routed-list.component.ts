import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IUsuario, IUsuarioPage } from 'src/app/model/usuario-interfaces';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-infinite-routed-list',
  templateUrl: './infinite-routed-list.component.html',
  styleUrls: ['./infinite-routed-list.component.css']
})
export class InfiniteRoutedListComponent implements OnInit {


  id:number=null;
  usuarios: IUsuario[];
  private finishPage :number;
  private actualPage: number=1;
  private pageSize:number=0;
  private page:number=0;
  private currentSortField:string="";
  private currentSortDirection:string="asc" ;
  strFilter:string="";
  private oUsuarioPage:IUsuarioPage;
  subjectFiltro$ = new Subject();



  constructor(
    private oUsuarioService:UsuarioService,

  ) {
    
   }
 
  ngOnInit() {
    this.getPageFiltered()
    this.usuarios=[];
    this.subjectFiltro$.pipe(
      ).subscribe(() => 
      {
        this.getPageFiltered()
      }
      );
    console.log(this.actualPage)
  }
 
  getOne = () => {
    this.oUsuarioService
      .getPage(this.pageSize, this.actualPage, this.currentSortField, this.currentSortDirection, this.strFilter)
      .subscribe((oData: IUsuarioPage) => {
        this.oUsuarioPage = oData;
        this.finishPage=this.oUsuarioPage.totalElements;
        Array.prototype.push.apply(this.usuarios, oData.content);
        this.actualPage++;
      });
  };

  onKeyUpFilter(event: KeyboardEvent, inputValue:string): void {
    this.subjectFiltro$.next(void 0);
    this.strFilter=inputValue
  }

  doFilter = () => {

    this.getPageFiltered();

  }

  doResetFilter = () => {
    this.strFilter = null;
    this.getOne();
  }

  getPageFiltered=()=>{

    this.oUsuarioService.getPageWOEquipo(this.pageSize, this.actualPage, this.currentSortField, this.currentSortDirection, this.id, this.strFilter).subscribe((
      oData: IUsuarioPage) => {

        this.oUsuarioPage = oData;
        this.finishPage=this.oUsuarioPage.totalElements;
        Array.prototype.push.apply(this.usuarios, oData.content);
        console.log(this.strFilter);
        
        this.actualPage++;
    })

  }

  onScroll() {
    if (this.actualPage < this.finishPage) {
      if(this.strFilter!=null){      
      console.log("hola")
      console.log(this.actualPage)

      this.getPageFiltered();
    }else{
      console.log("hola")
      this.getOne();
    }
    } else {
      console.log('No more lines. Finish page!');
    }
  }
}
