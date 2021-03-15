import { Component, OnInit, ViewChild } from '@angular/core';
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
  product = new Product();
  private querySub: any;
  apiPicUrl: string = environment.apiUrl + '/pictures';
  @ViewChild('quantity') quantityInput;
  constructor(
    private data: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.data.getOne(params['id']).subscribe((data) => (this.product = data));
    });
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

  add(product) {
    return this.shoppingCartService.updateQuantity(product, 1);
  }
  minus(product) {
    return this.shoppingCartService.updateQuantity(product, -1)
  }

  isInCart(product) {
    return this.shoppingCartService.isInCart(product);
  }
  updateQuantity(product, quantity) {
    return this.shoppingCartService.updateQuantity(product, quantity);
  }
  getTotal() {
    return this.shoppingCartService.getTotal;
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.product_quantity >= 1){
      value++;

      if (value > this.product.product_quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.product_quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}
