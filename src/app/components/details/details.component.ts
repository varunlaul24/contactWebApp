import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent{
  @Input() contact: any;
  @Output() close = new EventEmitter();

  closeDetails(contact: any){
    this.close.emit(contact)
  }
}
