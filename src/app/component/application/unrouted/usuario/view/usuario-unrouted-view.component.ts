import { Component, Input,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { ActivatedRoute } from '@angular/router';
import { EquipoService } from 'src/app/service/equipo.service';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { APIService } from 'src/app/service/api.service';
import { IApi1, IApi2 } from 'src/app/model/API-interfaces';
import { CryptoService } from 'src/app/service/crypto.service';

@Component({
  selector: 'app-usuario-unrouted-view',
  templateUrl: './usuario-unrouted-view.component.html',
  styleUrls: ['./usuario-unrouted-view.component.css']
})
export class usuariounroutedViewComponent implements OnInit {

  @Input() id: number = null;
  @Input() idequipo:number =null;
  
  oUsuario: IUsuario;
  oUsuarioSession: IUsuario;
  winRate:number;
  
  strEntity: string = "usuario"
  strOperation: string = "view"
  strTitleSingular:string= "usuario"

  constructor(
    private oUsuarioService: UsuarioService,
    private activatedroute: ActivatedRoute,
    private oEquipoService:EquipoService,
    private oActivatedroute:ActivatedRoute,
    private oApiService:APIService,
    private oCryptoService:CryptoService
    //public oIconService: IconService
  ) {

  }

  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    this.getOne();
  }

  getOne = () => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario = oData;
        this.idequipo=this.oUsuario.equipo.id;
        this.getWinRate();        
        
      });
  };
  
  getWinRate=()=>{
    this.winRate=this.oUsuario.wins*100/(this.oUsuario.wins+this.oUsuario.losses);
    console.log(this.winRate);
  }

  reload=()=>{
    this.oApiService.getAPI1(this.oUsuario.summonername).subscribe((oData1:IApi1)=>{
    this.oApiService.getAPI2(oData1.id).subscribe((oData2:IApi2[])=>{

      this.oUsuario = {
        id: this.oUsuario.id,
        login: this.oUsuario.login,
        email: this.oUsuario.email,
        summonername:this.oUsuario.summonername,
        accountid:this.oUsuario.accountid,
        profileiconid:oData1.profileIconId,
        summonerlevel:oData1.summonerLevel,
        rank:oData2[0]?.rank,
        tier:oData2[0]?.tier,
        wins:oData2[0]?.wins,
        losses:oData2[0]?.losses,
        discord:this.oUsuario.discord,
        twitter:this.oUsuario.twitter,
        descripcion:this.oUsuario.descripcion,
        tipousuario:{
          id:this.oUsuario.tipousuario.id,
          nombre:this.oUsuario.tipousuario.nombre
        },
        equipo:{
          id:this.oUsuario.equipo.id,
          nombre:this.oUsuario.equipo.nombre,
          descripcion:this.oUsuario.equipo.descripcion,
          siglas:this.oUsuario.equipo.siglas,
          file:{
            id:null,
            archivo:this.oUsuario.equipo.file.archivo
          }
        }
      };
      this.update();
    });
  })

  }

  update = (): void => {
    console.log(this.oUsuario);
    this.oUsuarioService
      .updateRange(this.oUsuario)
      .subscribe((id: number) => {
        this.getWinRate();
        // if (id) {
        //   this.strResult = 'El usuario se ha modificado correctamente';
        // } else {
        //   this.strResult = 'Error en la modificación del usuario';
        // }
        // this.openPopup();
      });
  };

}
