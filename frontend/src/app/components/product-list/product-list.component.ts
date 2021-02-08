import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product>

  constructor(private data:ProductService, private router: Router) { }

  ngOnInit(): void {
    this.data.getAll().subscribe(data=>this.products = data);
  }

}
