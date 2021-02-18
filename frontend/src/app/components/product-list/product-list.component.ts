import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { ShoppingCartService } from '../../service/shoppingcart.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  page: number = 1;
  category: string = null;
  querySub: any;
  shoppingCartList: Array<Product> = [];
  apiPicUrl: string = environment.apiUrl + "/pictures";
  loading: boolean = true;

  constructor(
    private data: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  getPage(num) {
    this.querySub = this.data
      .getProducts(num, this.category)
      .subscribe((data) => {
        if (data.length > 0) {
          this.products = data; //.sort((a,b)=>Date.parse(a.postDate)-Date.parse(b.postDate))
          this.page = num;
        }
      });
    window.scrollTo(0, 0);
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

  isInCart(product) {
    return this.shoppingCartService.isInCart(product);
  }

  ngOnInit(): void {
    //this.data.getAll().subscribe(data=>this.products = data);
    this.querySub = this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.category = params['category'];
      } else {
        this.category = null;
      }
      this.getPage(+params['page'] || 1);
    });
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

  onLoad() {
    this.loading = false;
  }
}
