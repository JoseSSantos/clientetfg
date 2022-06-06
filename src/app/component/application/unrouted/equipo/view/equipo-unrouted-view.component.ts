import { IFile } from './../../../../../model/file-interface';
import { FileService } from './../../../../../service/file.service';
import { PaginationService } from './../../../../../service/pagination.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { IUsuario, IUsuarioPage } from 'src/app/model/usuario-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-equipo-unrouted-view',
  templateUrl: './equipo-unrouted-view.component.html',
  styleUrls: ['./equipo-unrouted-view.component.css']
})
export class EquipoUnroutedViewComponent implements OnInit {
  
  @Input() idequipo: number = null;
  
  oEquipo: IEquipo;
  oUsuarioSession: IUsuario;

  strEntity: string = "Equipo"
  strOperation: string = "view"
  strTitleSingular:string= "Equipo"
  strTitlePlural: string = 'equipos'
  pageSize: number = 10
  page:number;
  currentSortField: string = "";
  currentSortDirection: string = "";
  strFilter: string = "";
  strFilteredMessage: string = "";
  aPosts: IUsuario[];
  nTotalElements: number;
  totalPages: number;
  barraPaginacion: string[];
  counter:number=0;
  oUsuario: IUsuario;
  UsersPDF:IUsuario[] =[];
  user: IUsuario;
  defaultImage:IFile;
  strResult:string="";

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedroute: ActivatedRoute,
    private oEquipoService:EquipoService,
    private oActivatedRoute: ActivatedRoute,
    private oUsuariosService: UsuarioService,
    private oPostService: UsuarioService,
    private oPaginationService: PaginationService,
    private oFileService: FileService

    //public oIconService: IconService
  ) {

  }
  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    
    this.getDefaultFile()
    console.log(this.idequipo);
    

    if(this.oActivatedRoute.snapshot.routeConfig.path=="usuario/view/:id"){
      console.log(this.oActivatedRoute.snapshot.routeConfig.path);
      this.getUser();

    }else{
      this.getOne();
      this.teamfilter()
    }
    
  }

  getUser = () => {
    this.oUsuarioService.getOne(this.idequipo).subscribe((oData1:IUsuario)=>{
      this.oEquipoService.getOne(oData1.equipo.id).subscribe((oData:IEquipo)=>{
        this.oEquipo=oData;
        this.idequipo=oData.id;
        this.teamfilter()
      });
    });
  }
  getOne = () => {
    this.oEquipoService
      .getOne(this.idequipo)
      .subscribe((oData: IEquipo) => {
        this.oEquipo = oData;
      });
  };
  getDefaultFile(){
    this.oFileService.getFileById(1).subscribe((data)=>{
      this.defaultImage=data;
    })
  }

  equipo(id:number){

    this.teamfilter()
    if(this.UsersPDF.length==0){
      this.strResult = 'Error al crear PDF, No hay miembros en el equipo'
      this.openPopup();

    }
    var doc = new jsPDF();

    doc = this.cabecera(doc);

    doc = this.body(doc, this.oEquipo);

    doc.save("Equipo.pdf");

  }

  getWinrate(wins:number,losses:number){
    var winrate:number = (wins/(wins+losses))*100
    return winrate.toFixed(2)
  }

  body(doc:jsPDF, oEquipo:IEquipo){

    doc.text("Datos del equipo: ", 22, 55)
    doc.setFontSize(20)
    doc.text("Nombre del Equipo: ",22,75)
    doc.text(oEquipo.nombre,85,75, {maxWidth:60})
    doc.text("Descripción: ",22,95)
    doc.setFontSize(15)
    doc.text(oEquipo.descripcion,65,95, {maxWidth:80})
    doc.setFontSize(20)
    var imgData = 'data:image/jpeg;base64,'+oEquipo.file.archivo
    doc.addImage(imgData,'jpeg',155, 45, 50,50)

    doc.line(0,105,1000,105)
    doc.text("Datos de los jugadores: ", 22 ,115)


    var columns:any = [['Usuario','SummonerName','Nivel','WinRate','Rank']];
    var data:any = []

    do{
      data.push([
      this.UsersPDF[this.counter].login.toString(),
      this.UsersPDF[this.counter].summonername.toString(),
      this.UsersPDF[this.counter].summonerlevel.toString(),
      this.getWinrate(this.UsersPDF[this.counter].wins,this.UsersPDF[this.counter].losses).toString()+"%",
      this.UsersPDF[this.counter].tier+' '+this.UsersPDF[this.counter].rank]
      )
      this.counter++;
    }while(
      this.UsersPDF.length!= this.counter
    )
      console.log(columns)
    autoTable(doc, {
      head:columns,
      body:data,
      didDrawCell: (data) => { },
      margin:{top:125}
    },
    );

    return doc
  }

  cabecera(doc: jsPDF){
    

      var imgData = 'data:image/jpeg;base64,'+this.defaultImage.archivo;

      doc.addImage(imgData, 'jpeg', 10,-5,50,50)
      doc.setFontSize(25)
      doc.text("Team PDF Generator", 100,23)
      doc.line(0,40,1000,40)

    return doc
  }
  
  getOneUser = (id:number) => {
  
   this.oUsuarioService
      .getOne(id)
      .subscribe((oData: IUsuario) => {
        this.user = oData;
        console.log(this.user)
        this.UsersPDF.push(this.user)
      });
    
  };

  teamfilter = () => {
    this.oPostService.getPageFiltered(this.pageSize, this.page, this.currentSortField, this.currentSortDirection, this.idequipo, this.strFilter).subscribe((oPage: IUsuarioPage) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado por " + this.strFilter;
      } else {
        this.strFilteredMessage = "Listado NO filtrado";
      }
      console.log(this.idequipo)
      var contador:number=0;
      this.aPosts = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
      console.log(oPage);
      do{
        this.getOneUser(oPage.content[contador].id);
        contador++;
        
       }while(
        oPage.content.length!=contador)
    })
  }

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
    console.log(this.strResult);
    
  }

  onClosePopup(): void {
    window.location.reload();
  }

}
