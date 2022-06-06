import { FileService } from './../../../../../service/file.service';
import { IFile } from './../../../../../model/file-interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';

@Component({
  selector: 'app-equipo-routed-new',
  templateUrl: './equipo-routed-new.component.html',
  styleUrls: ['./equipo-routed-new.component.css']
})
export class EquipoRoutedNewComponent implements OnInit {

  strEntity: string = 'equipo';
  strOperation: string = 'new';
  strTitleSingular: string = 'equipo';
  strTitlePlural: string = 'equipos';
  oEquipo: IEquipo=null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;
  file:IFile

  get f() {
    return this.oForm.controls;
  }

  constructor(

    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    public oIconService: IconService,
    private oLocation: Location,
    private oEquipoService:EquipoService,
    private oFileService:FileService

  ) {
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
    this.oForm = this.oFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(30)]],
      siglas: ['', [Validators.required, Validators.maxLength(5)]],
    });
  }


  onSubmit(): void {
    this.oFileService.uploadImage(this.file).subscribe((file:IFile)=>{
      if(file){

        if (this.oForm) {
          this.oEquipo = {
            id:null,
            nombre:this.oForm.value.nombre,
            descripcion:this.oForm.value.descripcion,
            siglas:this.oForm.value.siglas,
            file:{
              id:file.id,
              archivo:null
            }
          };
          this.new();
        }
      }
    },()=>{
      if (this.oForm) {
      this.oEquipo = {
        id:null,
        nombre:this.oForm.value.nombre,
        descripcion:this.oForm.value.descripcion,
        siglas:this.oForm.value.siglas,
        file:{
          id:1,
          archivo:null
        }
      };
      this.new();
    }})

    
  }

  new = (): void => {
    this.oEquipoService
      .newOne(this.oEquipo)
      .subscribe((equipo:IEquipo) => {
        if (equipo) {
          console.log(equipo.id)
          this.id=equipo.id;

          this.strResult = 'El Equipo se ha creado correctamente';
        } else {
          this.strResult = 'Error en la creacion del equipo';
        }
        this.openPopup();
      });
  };

   goBack(): void {
     this.oLocation.back();
   }

   includeImage(event : any){
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files?.item(0) ?? null; 

    this.readFileasString(file).then(
      (result) => {
        const base64Image:string = this.ObetenerBase64Image(result);
        this.file={
           id:null,
           archivo:base64Image
        }       
      },
      (error) => {
        console.log("Imagen no cargada")
    
    })


  }

  private readFileasString(file:File){
    return new Promise<string>(function(resolve, reject){
     let reader: FileReader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function(){
       resolve(this.result as string)
     }
    })
  }

  private ObetenerBase64Image(imageString:string): string{
   const imageStringParts: string[] = imageString.split(",");
   if(imageStringParts.length == 2){
     return imageStringParts[1];
   }else{
     return "";
   }
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



  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
  
}