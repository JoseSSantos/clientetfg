import { ITipoUsuario } from './../../../../../model/tipousuario-interfaces';
import { IUsuario2Send } from '../../../../../model/usuario-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TipousuarioService } from 'src/app/service/tipousuario.service';
import { APIService } from 'src/app/service/api.service';
import { IApi1, IApi2 } from 'src/app/model/API-interfaces';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';
import { CryptoService } from 'src/app/service/crypto.service';


@Component({
  selector: 'app-usuario-routed-edit',
  templateUrl: './usuario-routed-edit.component.html',
  styleUrls: ['./usuario-routed-edit.component.css']
})

export class UsuarioRoutedEditComponent implements OnInit {
  strEntity: string = 'usuario';
  strOperation: string = 'edit';
  strTitleSingular: string = 'Usuario';
  strTitlePlural: string = 'Usuarios';
  oUsuario2Show: IUsuario;
  oUsuario2Send: IUsuario2Send = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;
  equipos:IEquipo[]=[];
  text:string
  oUsuarioSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oActivatedRoute: ActivatedRoute,
    public oIconService: IconService,
    private oLocation: Location,
    private oTipousuarioService: TipousuarioService,
    private oAPIService:APIService,
    private oEquipoService:EquipoService,
    private oCryptoService: CryptoService


  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string =
        this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    
  }

  ngOnInit(): void {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));
    this.getOne();
    
    this.oForm = this.oFormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      summonername: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(5)]],
      tusuario: ['', [Validators.required, Validators.maxLength(1)]],

      twitter: ['', [ Validators.maxLength(10)]],
      discord: ['', [ Validators.maxLength(10)]],
      equipo: ['', [Validators.required, Validators.maxLength(1)]],
    });
    
  }

  getOne = (): void => {
    this.oUsuarioService
      .getOne(this.id)
      .subscribe((oData: IUsuario) => {
        this.oUsuario2Show = oData;
        console.log()
        this.oForm = this.oFormBuilder.group({
          id: [this.oUsuario2Show.id],
          login: ['', [Validators.required, Validators.minLength(5)]],
          password: ['', [Validators.required, Validators.minLength(5)]],
          summonername: ['', [Validators.required, Validators.minLength(5)]],
          descripcion:['', Validators.required, Validators.minLength(10)],
          email: ['', [Validators.required, Validators.minLength(5)]],
          tusuario: ['', [Validators.required, Validators.maxLength(1)]],
          twitter: ['', [ Validators.maxLength(10)]],
          discord: ['', [ Validators.maxLength(10)]],
          equipo: ['', [Validators.required, Validators.maxLength(1)]],
        });
        console.log("hola");
        
        this.oForm.setValue({
          id:this.oUsuario2Show.id,
          login:this.oUsuario2Show.login,
          password:null,
          summonername:this.oUsuario2Show.summonername,
          email:this.oUsuario2Show.email,
          descripcion:this.oUsuario2Show.descripcion,
          tusuario:this.oUsuario2Show.tipousuario.id,
          twitter:this.oUsuario2Show.twitter, 
          discord:this.oUsuario2Show.discord,
          equipo:this.oUsuario2Show.equipo.nombre})

      });
  };

  onSubmit(): void {
    

      if (this.oForm) {

        this.getAPI();
        console.log(this.oUsuario2Send);
        //this.new();
  
      }


      //this.update();
    
  }
  getAPI = () => {

    this.oAPIService.getAPI1(this.oForm.value.summonername)
    .subscribe((oData1:IApi1) =>{
      console.log(oData1);
        this.oAPIService.getAPI2(oData1.id).subscribe((oData2:IApi2[])=>{
          console.log(oData2);
          this.oUsuario2Send = {
            id: this.oForm.value.id,
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
              id:this.oUsuario2Show.tipousuario.id,
            },
            equipo:{
              id:this.oForm.value.equipo.id
            }
          };
          console.log(this.oForm.value.tusuario);
          
          this.update();

        });
      
    });
  }

  update = (): void => {
    console.log(this.oUsuario2Send);
    this.oUsuarioService
      .updateOne(this.oUsuario2Send)
      .subscribe((id: number) => {
        if (id) {
          this.strResult = 'El usuario se ha modificado correctamente';
        } else {
          this.strResult = 'Error en la modificación del usuario';
        }
        this.openPopup();
      });
  };

  getEquipos(event?:any){
    this.oEquipoService.getAll().subscribe(data=>{
      this.equipos = data;
    })
  }

   goBack(): void {
     this.oLocation.back();
   }

  //modal

  fila: IUsuario;
  id_tipousuario: number = null;
  showingModal: boolean = false;

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

    //actualizar el usuario
    this.oTipousuarioService
      .view(this.oForm.controls['tusuario'].value)
      .subscribe((oData: ITipoUsuario) => {
        this.oUsuario2Show.tipousuario = oData;
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
        this.oUsuario2Show.equipo = oData;
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
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
  
}
