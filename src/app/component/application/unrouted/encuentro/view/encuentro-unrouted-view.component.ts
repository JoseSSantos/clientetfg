import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPartido, IPartido2Send } from 'src/app/model/partido-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { PartidoService } from 'src/app/service/partido.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-encuentro-unrouted-view',
  templateUrl: './encuentro-unrouted-view.component.html',
  styleUrls: ['./encuentro-unrouted-view.component.css']
})
export class EncuentroUnroutedViewComponent implements OnInit {

  @Input() id: number = null;  
  
  oPartido: IPartido;
  oPartido2Send:IPartido2Send;
  oUsuarioSession: IUsuario;

  strEntity: string = "encuentro"
  strOperation: string = "view"
  strTitleSingular:string= "Partido"
  strTitlePlural: string = 'Partidos'
  strResult:string=""

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedroute: ActivatedRoute,
    private oPartidoService:PartidoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter:Router
    //public oIconService: IconService
  ) {

  }
  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    this.getOne();
  }

  getOne = () => {
    this.oPartidoService
      .getOne(this.id)
      .subscribe((oData: IPartido) => {
        this.oPartido = oData;
      });
  };

  onclick(){
    this.update()

  }

  update = (): void => {
    console.log(this.oPartido);

    console.log(this.oUsuarioSession.equipo.id)
    this.oPartido2Send ={
      id:this.oPartido.id,
      equipo1:{
        id:      this.oPartido.equipo1.id
      },
      equipo2:{
        id: this.oUsuarioSession.equipo.id
      },
      fecha:this.oPartido.fecha
    }
     this.oPartido2Send.equipo2.id=this.oUsuarioSession.equipo.id;
    console.log(this.oPartido2Send)
    
    this.oPartidoService
      .updateOne(this.oPartido2Send)
      .subscribe(
        (id: number) => {
          this.strResult = 'El encuentro se ha modificado correctamente';

        this.openPopup();
      },()=>{
        this.strResult = 'No puedes unirte a tu propio encuentro';
        this.openPopup();
      });
  };

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
    console.log(this.strResult);
    
  }

  onClosePopup(): void {
    window.location.reload();

    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
}