import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private data:ProductService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(param=>{
      this.data.getOne(param['id']).subscribe(data=>this.product = data);
    })
  }

}
