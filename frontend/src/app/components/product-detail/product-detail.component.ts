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
  product = new Product();
  private querySub: any;
  apiPicUrl: string = environment.apiUrl + '/pictures';

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

  isInCart(product) {
    return this.shoppingCartService.isInCart(product);
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }
}
