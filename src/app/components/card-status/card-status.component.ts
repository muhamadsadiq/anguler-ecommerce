import { Component, Injectable, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card-service.service';

@Component({
  selector: 'app-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.css']
})

export class CardStatusComponent implements OnInit {

  totalPrice:number=0.00;
  totalQuantity:number=0;

  
  constructor(private cardService:CardService) { }

  ngOnInit(): void {
    this.updateCardStatus();
  }
  updateCardStatus() {
    this.cardService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );

    this.cardService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );
  }
}


