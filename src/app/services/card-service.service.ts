import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardItem } from '../common/card-item';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cardItems: CardItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCard(cardItem: CardItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCard: boolean = false;
    let existingCardItem: CardItem;

    if (this.cardItems.length > 0) {
      //find the item in the cart based on item id

      for (let tempCardItem of this.cardItems) {
        if (tempCardItem.id === cardItem.id) {
          existingCardItem = tempCardItem;
          alreadyExistsInCard = true;
          existingCardItem.quantity++;
          break;
        }
      }
      //check if we found it
    }
    if (!alreadyExistsInCard) {
      this.cardItems.push(cardItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCard of this.cardItems) {
      totalPriceValue += tempCard.quantity * tempCard.unitPrice;
      totalQuantityValue += tempCard.quantity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cardItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name},
         quantity: ${tempCartItem.quantity},
          unitPrice: ${tempCartItem.unitPrice},
           subTotalPrice: ${subTotalPrice}`
      );
      console.log(
        `totalPrice: ${totalPriceValue.toFixed(2)},
         totalQuantity: ${totalQuantityValue}`
      );
      console.log('-----');
    }
  }
}
