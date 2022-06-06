import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { IPartido, IPartido2Send, IPartidoNew } from 'src/app/model/partido-interfaces';
import { PartidoService } from 'src/app/service/partido.service';
import { DateTimeService } from 'src/app/service/datetime.service';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';

declare let $: any;

@Component({
  selector: 'app-encuentro-routed-new',
  templateUrl: './encuentro-routed-new.component.html',
  styleUrls: ['./encuentro-routed-new.component.css']
})
export class EncuentroRoutedNewComponent implements OnInit {

  strEntity: string = 'encuentro';
  strOperation: string = 'new';
  strTitleSingular: string = 'partido';
  strTitlePlural: string = 'equipos';
  oPartidoOrg: IPartidoNew=null;
  oPartidoAdm: IPartido2Send=null;
  id: number = 0;
  oForm: FormGroup = null;
  strResult: string = null;
  oUsuarioSession: IUsuario;
  dataToShow2:IEquipo;
  text1:string
  text2:string
  equipos:IEquipo[]=[]

  get f() {
    return this.oForm.controls;
  }

  constructor(

    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    public oIconService: IconService,
    private oLocation: Location,
    private oPartidoService:PartidoService,
    private oEquipoService:EquipoService,

    
  ) {
    this.oUsuarioSession = JSON.parse(localStorage.getItem("user"));

    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string =
        this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(strUsuarioSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    if(this.oUsuarioSession.tipousuario.id==2){
    this.oForm = this.oFormBuilder.group({
      fecha: ["", [Validators.required]],
      
    });}else if(this.oUsuarioSession.tipousuario.id==1){
      this.oForm = this.oFormBuilder.group({
        Equipo1:["", [Validators.required]],
        Equipo2:["", [Validators.required]],
        fecha: ["", [Validators.required]]
      });
    }
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd/mm/yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.oForm.controls['fecha'].setValue(dateText);
        this.oForm.controls['fecha'].markAsDirty();
      }
    });
  }



  getEquipos(event?:any){
    this.oEquipoService.getAll().subscribe(data=>{
      this.equipos = data;
    })
  }

  onSubmit(): void {
    if (this.oUsuarioSession.tipousuario.id==2 && this.oForm){
      this.oPartidoOrg = {
        id:null,
        equipo1:{
          id:this.oUsuarioSession.equipo.id
        },
        fecha:this.oForm.value.fecha
      };
      this.newO();
    }
      if (this.oUsuarioSession.tipousuario.id==1) {
        this.oPartidoAdm = {
          id:null,
          equipo1:{
            id:this.oForm.value.Equipo1.id
          },
          equipo2:{
            id:this.oForm.value.Equipo2.id
          },
          fecha:this.oForm.value.fecha
        };
        this.newA();
      }
    
  }

  newA = (): void => {
    this.oPartidoService
      .newOne(this.oPartidoAdm)
      .subscribe((oPartido:IPartido) => {
        if (oPartido) {
          
          this.id=oPartido.id;
          console.log("newa")
          console.log(this.id)
          this.strResult = 'El partido se ha creado correctamente';
        } else {
          this.strResult = 'Error en la creacion del partido';
        }
        this.openPopup();
      });
  };
  newO = (): void => {
    this.oPartidoService
      .newOneA(this.oPartidoOrg)
      .subscribe((oPartido:IPartido) => {
        if (oPartido) {
          this.id=oPartido.id;
          console.log("newo")
          console.log(this.id)
          this.strResult = 'El partido se ha creado correctamente';
        } else{
          this.strResult = 'Error en la creacion del partido';
        }
        this.openPopup();
      },(error)=>{
        this.strResult = 'Error en la creacion del partido';
        this.openPopup();
      });
  };

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

//ver equipos
onChangeEquipo1($event: any) {

  console.log("--->" + this.oForm.controls['Equipo1'].value);
  this.oForm.controls['Equipo1'].markAsDirty();

  //aqui cerrar la ventana emergente 
  if (this.showingModal) {
    this.closeModal();
  }

  //actualizar el usuario
  this.oEquipoService
    .view(this.oForm.controls['Equipo1'].value)
    .subscribe((oData: IEquipo) => {
      this.dataToShow2 = oData;
      //this.oUsuario = oData;
    });

  return false;
}
onChangeEquipo2($event: any) {

  console.log("--->" + this.oForm.controls['Equipo2'].value);
  this.oForm.controls['Equipo2'].markAsDirty();

  //aqui cerrar la ventana emergente 
  if (this.showingModal) {
    this.closeModal();
  }

  //actualizar el usuario
  this.oEquipoService
    .view(this.oForm.controls['Equipo2'].value)
    .subscribe((oData: IEquipo) => {
      this.dataToShow2 = oData;
      //this.oUsuario = oData;
    });

  return false;
}
onSelection1($event: any) {
  console.log("edit evento recibido: " + $event)
  this.oForm.controls['Equipo1'].setValue($event);
}
onSelection2($event: any) {
  console.log("edit evento recibido: " + $event)
  this.oForm.controls['Equipo2'].setValue($event);
}
  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    console.log(this.id)
    if(this.strResult=='Error en la creacion del partido'){

    }else{
      this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
    }
    
  }
  
}
