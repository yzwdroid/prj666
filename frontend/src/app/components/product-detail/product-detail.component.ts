import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { environment } from '../../../environments/environment';
import { ShoppingCartService } from 'src/app/service/shoppingcart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  private querySub: any;
  apiPicUrl: string = environment.apiUrl + '/pictures';
  product_quantity: number = 0;

  constructor(
    private data: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.shoppingCartList;
    this.querySub = this.route.params.subscribe((params) => {
      this.data.getOne(params['id']).subscribe((data) => {
        this.product = data;
      });
    });
  }

  removeProduct(product) {
    this.product_quantity = this.product_quantity - 1;
    this.updateQuantity(product, this.product_quantity);
  }

  addProduct(product) {
    if (this.product_quantity === 0) {
      this.shoppingCartService.addToCart(product);
      return;
    }
    this.product_quantity = this.product_quantity + 1;
    this.updateQuantity(product, this.product_quantity);
  }

  updateQuantity(product, quantity) {
    if (quantity > 0) {
      this.shoppingCartService.updateQuantity(product, quantity);
    } else {
      this.removeItem(product);
    }
  }

  removeItem(product) {
    this.shoppingCartService.removeFromCart(product);
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

  isInCart(product) {
    this.product_quantity = this.shoppingCartService.isInCart(product);
    return this.product_quantity;
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }
}
