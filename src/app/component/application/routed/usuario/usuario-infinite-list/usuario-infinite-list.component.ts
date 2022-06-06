import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IUsuarioPage } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-usuario-infinite-list',
  templateUrl: './usuario-infinite-list.component.html',
  styleUrls: ['./usuario-infinite-list.component.css']
})
export class UsuarioInfiniteListComponent implements OnInit {

  linesToWrite: IUsuarioPage[];
  private finishPage = 5;
  private actualPage: number;
  subjectFiltro$ = new Subject();

 
  constructor() {
    this.actualPage=1;
   }
 
  ngOnInit() {
    this.linesToWrite;
    //this.add40lines();
  }
 
  // add40lines() {
  //   const line = 'Another new line -- ';
  //   let lineCounter = this.linesToWrite.length;
  //   for (let i = 0; i < 40; i ++) {
  //     this.linesToWrite.push(
        
  //     );
  //     lineCounter ++;
  //   }
  // }
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next(void 0);
    console.log("hola")

  }

  // onScroll() {
  //   if (this.actualPage < this.finishPage) {
  //     this.add40lines();
  //     this.actualPage ++;
  //   } else {
  //     console.log('No more lines. Finish page!');
  //   }
  // }
}
