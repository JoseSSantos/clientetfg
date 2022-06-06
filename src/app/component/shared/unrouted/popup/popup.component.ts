import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
declare let bootstrap: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {

  // https://stackoverflow.com/questions/44053227/how-to-emit-an-event-from-parent-to-child

  @Input() show: Observable<void>;
  @Input() title: string = "eMatch";
  @Input() body: string = "";
  @Input() size: string = "";
  @Input() icon: string = "";
  @Output() close = new EventEmitter<Event>();

  private eventsSubscriptionShow: Subscription;

  myPopup: any;

  constructor() { }

  ngOnInit() {
    this.eventsSubscriptionShow = this.show.subscribe(() => this.showModal());
  }

  ngOnDestroy() {
    this.eventsSubscriptionShow.unsubscribe();
  }

  showModal = () => {
    this.myPopup = new bootstrap.Modal(document.getElementById('myPopup'), {
      keyboard: false
    })
    var myPopupEl = document.getElementById('myPopup');
    myPopupEl.addEventListener('hidden.bs.modal', (event): void => {
      this.close.emit(event);
    })
    this.myPopup.show()
  }

}
