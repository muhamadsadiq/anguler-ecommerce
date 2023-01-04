import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id

      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          existingCartItem.quantity++;
          break;
        }
      }
      //check if we found it
    }
    if (!alreadyExistsInCart) {
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }
  changeCartQuantity(cartItem: CartItem,newQuantity:number) {
    let cart=this.cartItems.find(item=>item.id==cartItem.id);  
    if(cart!=undefined){
    cart.quantity=newQuantity;
   }  
   this.computeCartTotals();
  }
  deleteCartItem(cartItem:CartItem){
    let cartIndex=this.cartItems.findIndex(cart=>cart.id==cartItem.id);
    if(cartIndex>-1){
      this.cartItems.splice(cartIndex,1);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let tempCart of this.cartItems) {
      totalPriceValue += tempCart.quantity * tempCart.unitPrice;
      totalQuantityValue += tempCart.quantity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
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
