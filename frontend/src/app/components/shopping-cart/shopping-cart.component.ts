import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ShoppingCartService } from 'src/app/service/shoppingcart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  products: Array<Product> = [];
  product: Product;
  total: number;
  apiPicUrl: string = environment.apiUrl + "/pictures";

  constructor(private shoppingCartService: ShoppingCartService) {}

  removeItem(product) {
    this.shoppingCartService.removeFromCart(product);
    this.total = this.shoppingCartService.getTotal();
  }

  changeQuantity(product, quantity) {
    if (quantity > 0) {
      this.shoppingCartService.updateQuantity(product, quantity);
      this.total = this.shoppingCartService.getTotal();
    } else {
      this.removeItem(product);
    }
  }

  ngOnInit(): void {
    this.products = this.shoppingCartService.shoppingCartList;
    this.total = this.shoppingCartService.getTotal();
  }
}
