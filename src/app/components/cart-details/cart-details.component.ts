import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart-service.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  totalPrice: number = 0.0;
  totalQiantity: number = 0;



  constructor(private cartService:CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      (data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQiantity = data)
    );

    this.cartService.computeCartTotals();
  }
  getTotals() {}
  updateQuantity(cart: CartItem, quantity: number) {
    cart.quantity = quantity;
    this.cartService.changeCartQuantity(cart, quantity);
  }
  deleteCart(cart:CartItem){
    this.cartService.deleteCartItem(cart);
  }


  

}

