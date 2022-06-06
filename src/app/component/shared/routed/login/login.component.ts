import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { CryptoService } from 'src/app/service/crypto.service';
//import { IconService } from 'src/app/service/icon.service';
import { SessionService } from 'src/app/service/session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  strOperation: string = "login"
  formularioLogin: FormGroup;
  oUserSession: IUsuario;

  constructor(
    private FormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService,
    private oCryptoService: CryptoService,
   // public oIconService: IconService    
  ) {

    if (oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(oRoute.snapshot.data.message));
      oRouter.navigate(['/home']);
    } else {
      localStorage.clear();
    }

    this.formularioLogin = <FormGroup>this.FormBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void { }

  onSubmit() {
    const loginData = { login: this.formularioLogin.get('login')!.value, password: this.oCryptoService.getSHA256(this.formularioLogin.get('password')!.value) };
    console.log("login:onSubmit: ", loginData);
    this.oSessionService.login(JSON.stringify(loginData)).subscribe(data => {
      localStorage.setItem("user", JSON.stringify(data.toString()));
      if (data != null) {
        this.oRouter.navigate(['/home']);
      } else {
        localStorage.clear();
      }
    });
    return false;
  }

  loginAdmin() {
    this.formularioLogin.setValue({
      login: "admin",
      password: "admin"
    })
  }

  loginUser() {
    this.formularioLogin.setValue({
      login: "user",
      password: "wildcart"
    })
  }

}
