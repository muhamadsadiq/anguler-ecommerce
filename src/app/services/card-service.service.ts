import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardItem } from '../common/card-item';

@Injectable({
  providedIn: 'root',
})
export class CardServiceService {
  cardItems: CardItem[] = []; 

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCard(cardItem:CardItem){
    let alreadyExistsInCard:boolean=false;
    let existingCardItem:CardItem; 

    if(this.cardItems.length>0){
      for(let tempCardItem of this.cardItems){
        if(tempCardItem.id ===cardItem.id){
          existingCardItem = tempCardItem;
          break;
        }
      }
    }
  }
}
