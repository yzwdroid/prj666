import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../model/Product';

@Injectable()
export class ShoppingCartService {
  shoppingCartList: Array<Product> = [];
  shoppingCartListChange: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(product) {
    // find product by product_id
    const productExistInCart = this.shoppingCartList.find(
      ({ product_id }) => product_id === product.product_id
    );

    if (!productExistInCart) {
      this.shoppingCartList.push({ ...product, product_quantity: 1 });
      this.shoppingCartListChange.next(this.shoppingCartList.length);
    }
  }

  removeFromCart(product) {
    this.shoppingCartList.find(({ product_id }) => {
      if (product_id === product.product_id) {
        this.shoppingCartList.pop();
        this.shoppingCartListChange.next(this.shoppingCartList.length);
      }
    });
  }

  updateQuantity(product, quantity) {
    const productExistInCart = this.shoppingCartList.find(
      ({ product_id }) => product_id === product.product_id
    );

    productExistInCart.product_quantity = quantity;

    console.log(this.shoppingCartList);
  }

  getTotal() {
    let total = 0;
    this.shoppingCartList.forEach((product) => {
      total += product.product_price * product.product_quantity;
    });

    return total;
  }
}
