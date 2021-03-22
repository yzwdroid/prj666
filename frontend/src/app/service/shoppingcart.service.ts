import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../model/Product';
import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable()
export class ShoppingCartService {
  shoppingCartList: Array<Product> = [];
  shoppingCartListChange: Subject<number> = new Subject<number>();
  cookieOptions: CookieOptions = { sameSite: 'strict' };

  constructor(private cookieService: CookieService) {
    let savedList = cookieService.getObject('shoppingcart') as Array<Product>;
    if (savedList) {
      this.shoppingCartList = savedList;
    }
  }

  ngOnInit() {}

  isInCart(product) {
    const productExistInCart = this.shoppingCartList.find(
      ({ product_id }) => product_id === product.product_id
    );

    if (productExistInCart) return productExistInCart.product_quantity;

    return 0;
  }

  addToCart(product) {
    // find product by product_id
    const productExistInCart = this.shoppingCartList.find(
      ({ product_id }) => product_id === product.product_id
    );

    if (!productExistInCart) {
      this.shoppingCartList.push({ ...product, product_quantity: 1 });
      this.shoppingCartListChange.next(this.shoppingCartList.length);
    }

    this.cookieService.putObject(
      'shoppingcart',
      this.shoppingCartList,
      this.cookieOptions
    );
  }

  removeFromCart(product) {
    let thisList = this.shoppingCartList;

    for (let i = 0; i < thisList.length; i++) {
      if (thisList[i].product_id === product.product_id) {
        thisList.splice(i, 1);
        i--;
      }
    }
    this.shoppingCartListChange.next(this.shoppingCartList.length);

    this.cookieService.putObject(
      'shoppingcart',
      this.shoppingCartList,
      this.cookieOptions
    );
  }

  updateQuantity(product, quantity) {
    const productExistInCart = this.shoppingCartList.find(
      ({ product_id }) => product_id === product.product_id
    );

    productExistInCart.product_quantity = quantity;

    this.cookieService.putObject(
      'shoppingcart',
      this.shoppingCartList,
      this.cookieOptions
    );
  }

  getTotal() {
    let total = 0;
    this.shoppingCartList.forEach((product) => {
      total += product.product_price * product.product_quantity;
    });

    return total;
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
}
