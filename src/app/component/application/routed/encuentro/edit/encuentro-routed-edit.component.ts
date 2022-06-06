
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { IEquipo } from 'src/app/model/equipo-interfaces';
import { EquipoService } from 'src/app/service/equipo.service';
import { IPartido, IPartido2Send } from 'src/app/model/partido-interfaces';
import { PartidoService } from 'src/app/service/partido.service';

declare let $: any;

@Component({
  selector: 'app-encuentro-routed-edit',
  templateUrl: './encuentro-routed-edit.component.html',
  styleUrls: ['./encuentro-routed-edit.component.css']
})
export class EncuentroRoutedEditComponent implements OnInit {


  strEntity: string = 'encuentro';
  strOperation: string = 'edit';
  strTitleSingular: string = 'encuentro';
  strTitlePlural: string = 'encuentros';
  oPartido: IPartido2Send=null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;

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
    this.getOne();
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      equipo1: ['', [Validators.required]],
      equipo2: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });
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

  getOne = (): void => {
    this.oPartidoService
      .getOne(this.id)
      .subscribe((oData: IPartido) => {
        this.oPartido = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oPartido.id],
          equipo1: ['', [Validators.required]],
          equipo2: ['', [Validators.required]],
          fecha: ['', [Validators.required]],
        });
        this.oForm.setValue({id:this.oPartido.id, equipo1:this.oPartido.equipo1.id, 
          equipo2:this.oPartido.equipo2.id, fecha:this.oPartido.fecha})
      });
  };

  onSubmit(): void {
    

      if (this.oForm) {
        this.oPartido = {
          id: this.oForm.value.id,
          equipo1:{
           id:this.oForm.value.equipo1 
          },
          equipo2:{
            id:this.oForm.value.equipo2
          },
          fecha:this.oForm.value.fecha
        };

        this.update();

      }


      //this.update();
    
  }

  update = (): void => {
    console.log(this.oPartido);
    console.log("hola")
    this.oPartidoService
      .updateOne(this.oPartido)
      .subscribe((id: number) => {
        console.log("editado")
        if (id) {
          this.strResult = 'El Equipo se ha modificado correctamente';
        } else {
          this.strResult = 'Error en la modificación del Equipo';
        }
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

  onSelection($event: any) {
    console.log("edit evento recibido: " + $event)
    this.oForm.controls['tusuario'].setValue($event);
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