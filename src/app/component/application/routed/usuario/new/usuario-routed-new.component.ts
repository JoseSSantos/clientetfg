import { IEquipo } from './../../../../../model/equipo-interfaces';
import { TipousuarioService } from './../../../../../service/tipousuario.service';
import { IUsuario2Send } from '../../../../../model/usuario-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IconService } from 'src/app/service/icon.service';
import { ITipoUsuario } from 'src/app/model/tipousuario-interfaces';
import { waitForAsync } from '@angular/core/testing';
import { APIService } from 'src/app/service/api.service';
import { IApi1, IApi2 } from 'src/app/model/API-interfaces';
import { CryptoService } from 'src/app/service/crypto.service';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-usuario-routed-new',
  templateUrl: './usuario-routed-new.component.html',
  styleUrls: ['./usuario-routed-new.component.css']
})
export class UsuarioRoutedNewComponent implements OnInit {

  usuario: IUsuario2Send = null;
  oData1: IApi1;
  oData2: IApi2[];
  id: number = 0;
  oForm: FormGroup = null;
  strResult: string = '';
  idnuevo: number;
  strEntity: string = "usuario"
  strOperation: string = "new"
  strTitleSingular: string = "Usuario";
  strTitlePlural: string = "Usuarios";
  oUsuarioSession: IUsuario;
  equipos: IEquipo[];
  text:string;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oAPIService : APIService,
    private oCryptoService: CryptoService,
    private oEquipoService:EquipoService,
    private oLocation: Location,
    public oIconService: IconService,
    private oTipousuarioService: TipousuarioService

  ) {

    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

    // if (this.oActivatedRoute.snapshot.data.message) {
    //   const strUsuarioSession: string =
    //     this.oActivatedRoute.snapshot.data.message;
    //   localStorage.setItem('user', JSON.stringify(strUsuarioSession));
    // } else {
    //   localStorage.clear();
    //   oRouter.navigate(['/home']);
    // }
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      summonername: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      tusuario: ['', [Validators.maxLength(1)]],
      descripcion:['',[Validators.required, Validators.minLength(20)]],
      twitter: ['', [ Validators.maxLength(20)]],
      discord: ['', [ Validators.maxLength(20)]],
      equipo: ['', [Validators.required]],

    });
  }

  onSubmit():void {

    if (this.oForm) {

      this.getAPI();
      console.log(this.usuario);
      //this.new();

    }
  }

  getEquipos(event?:any){
    this.oEquipoService.getAll().subscribe(data=>{
      this.equipos = data;
    })
  }

  getAPI = () => {

    this.oAPIService.getAPI1(this.oForm.value.summonername)
    .subscribe((oData1:IApi1) =>{
      console.log(oData1);

        this.oAPIService.getAPI2(oData1.id).subscribe((oData2:IApi2[])=>{

          this.usuario = {
            id: null,
            login: this.oForm.value.login,
            password: this.oCryptoService.getSHA256(this.oForm.get('password')!.value),
            email: this.oForm.value.email,
            summonername:this.oForm.value.summonername,
            accountid:oData1.id,
            profileiconid:oData1.profileIconId,
            summonerlevel:oData1.summonerLevel,
            rank:oData2[0]?.rank,
            tier:oData2[0]?.tier,
            wins:oData2[0]?.wins,
            losses:oData2[0]?.losses,
            discord:this.oForm.value.discord,
            twitter:this.oForm.value.twitter,
            descripcion:this.oForm.value.descripcion,
            tipousuario:{
              id:this.oForm.value.tusuario || 3
            },
            equipo:{
              id:this.oForm.value.equipo.id
            }
          };
          this.new();

        });
      
    });
  }

  new = (): void => {
    this.oUsuarioService
      .newOne(this.usuario)
      .subscribe((usuarionew: IUsuario) => {
        if (usuarionew) {
          console.log(usuarionew);
          this.id = usuarionew.id;
          console.log(this.id);
          this.strResult = 'El usuario se ha creado correctamente';
        } else {
          
        }
        
      }, () =>{this.strResult = 'Error en la creación del registro';});
      this.openPopup();
  };

  goBack(): void {
    this.oLocation.back();
  }
  //modal
  fila: ITipoUsuario;
  id_tipousuario: number = null;
  showingModal: boolean = false;
  dataToShow: ITipoUsuario = null;
  dataToShow2: IEquipo=null;

  eventsSubjectShowModal: Subject<void> = new Subject<void>();
  eventsSubjectHideModal: Subject<void> = new Subject<void>();

  openModal(): void {
    this.eventsSubjectShowModal.next();
    this.showingModal = true;
  }

  onCloseModal(): void {
    //this.oRouter.navigate(['factura/view/' + this.id]);
  }

  closeModal(): void {
    this.eventsSubjectHideModal.next();
    this.showingModal = false;
  }

  onSelection($event: any) {
    console.log("edit evento recibido: " + $event)
    this.oForm.controls['tusuario'].setValue($event);
  }

  onChangeTUsuario($event: any) {

    console.log("--->" + this.oForm.controls['tusuario'].value);
    this.oForm.controls['tusuario'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModal) {
      this.closeModal();
    }

    //actualizar el tipo usuario
    this.oTipousuarioService
      .view(this.oForm.controls['tusuario'].value)
      .subscribe((oData: ITipoUsuario) => {
        this.dataToShow = oData;
        console.log(this.dataToShow)
        //this.oUsuario = oData;
      });

    return false;
  }
  onChangeEquipo($event: any) {

    console.log("--->" + this.oForm.controls['equipo'].value);
    this.oForm.controls['equipo'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModal) {
      this.closeModal();
    }

    //actualizar el usuario
    this.oEquipoService
      .view(this.oForm.controls['equipo'].value)
      .subscribe((oData: IEquipo) => {
        this.dataToShow2 = oData;
        //this.oUsuario = oData;
      });

    return false;
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    if(this.strResult=='Error en la creación del registro'){
      
    }else{
      this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
    }

  }
}
