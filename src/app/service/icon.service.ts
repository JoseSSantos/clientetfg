import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }

  public getIcon(strIcon: string): string {

    switch (true) {
      // 
      case strIcon == "system": return "fas fa-shopping-basket";
      case strIcon == "producto": return "fas fa-gift";
      case strIcon == "tipoproducto": return "fas fa-tag";
      case strIcon == "usuario": return "fas fa-user";
      case strIcon == "tipousuario": return "fas fa-user-tag";
      case strIcon == "compra": return "fas fa-cash-register";
      case strIcon == "factura": return "fas fa-file-invoice-dollar";
      case strIcon == "carrito": return "fas fa-shopping-cart";
      case strIcon == "fecha": return "far fa-clock";
      case strIcon == "cantidad": return "fas fa-mountain";
      case strIcon == "euro": return "fas fa-euro-sign";      
      case strIcon == "fecha": return "far fa-clock";
      case strIcon == "porcentaje": return "fas fa-percent";
      case strIcon == "nombre": return "fas fa-signature";
      case strIcon == "email": return "fas fa-at";
      case strIcon == "dni": return "fas fa-address-card";
      case strIcon == "codigo": return "fas fa-barcode";
      case strIcon == "imagen": return "fas fa-camera";
      case strIcon == "validado": return "fas fa-user-check";
      case strIcon == "activado": return "fas fa-flag-checkered";
      // 
      case strIcon == "acciones": return "fas fa-tools";
      case strIcon == "view": return "fas fa-eye";
      case strIcon == "plist": return "fas fa-list";
      case strIcon == "listado": return "fas fa-stream";
      case strIcon == "remove": return "fas fa-trash";
      case strIcon == "new": return "fas fa-plus";
      case strIcon == "edit": return "fas fa-pen";      
      case strIcon == "random": return "fas fa-random";
      //
      case strIcon == "imprimir": return "fas fa-print";
      case strIcon == "informe": return "fas fa-file-alt";
      case strIcon.startsWith("report"): return "fas fa-copy";
      // 
      case strIcon == "home": return "fas fa-home";
      case strIcon == "login": return "fas fa-sign-in-alt";
      case strIcon == "logout": return "fas fa-sign-out-alt";
      case strIcon == "usuarios": return "fas fa-user-friends";
      case strIcon == "id": return "fas fa-key";
      case strIcon == "entradaSistema": return "fas fa-sign-in";
      case strIcon == "salidaSistema": return "fas fa-sign-in";
      case strIcon == "reset": return "fas fa-brush";
      case strIcon == "carroImagenes": return "fas fa-cart-plus";
      // 
      case strIcon == "filtro": return "fas fa-filter";
      case strIcon == "buscar": return "fas fa-search";
      case strIcon == "rpp": return "fas fa-file-alt";
      // 
      case strIcon == "flechaUp": return "fas fa-arrow-up";
      case strIcon == "flechaDown": return "fas fa-arrow-down";
      // 
      case strIcon == "seleccionar": return "fas fa-check";      
      case strIcon == "ok": return "fas fa-check-square";
      case strIcon == "aceptar": return "fas fa-check-circle";      
      case strIcon == "rechazar": return "fas fa-times-circle";
      case strIcon == "volver": return "fas fa-arrow-circle-left";
      //
      case strIcon == "github": return "fab fa-github";
      case strIcon == "github-alt": return "fab fa-github-alt";
      //
      default: return 'fas fa-question';
    }

  }
}

