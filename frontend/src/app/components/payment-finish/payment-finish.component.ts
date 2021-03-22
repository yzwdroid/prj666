import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ShoppingCartService } from 'src/app/service/shoppingcart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const BASEURL = environment.apiUrl;

interface ProvinceSalesTax {
  sales_tax: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './payment-finish.component.html',
  styleUrls: ['./payment-finish.component.css'],
})
export class PaymentFinishComponent implements OnInit {
  products: Array<Product> = [];
  product: Product;
  total: number;
  discount: number;
  taxes: number;
  transaction_id: string;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {
    this.transaction_id = this.router.getCurrentNavigation().extras.state.id.toString();
  }

  ngOnInit(): void {
    this.products = this.shoppingCartService.shoppingCartList;
    this.total = this.shoppingCartService.getTotal();
    this.taxes = 0.0;
    this.discount = 0.0;
  }
}
