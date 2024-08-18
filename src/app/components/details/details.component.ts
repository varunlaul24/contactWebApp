import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent{
  @Input() contact: any;

  constructor() {}

  

}
