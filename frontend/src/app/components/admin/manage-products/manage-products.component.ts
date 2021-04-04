import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { ShoppingCartService } from '../../../service/shoppingcart.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent  implements OnInit {
  products: Array<Product> = [];
  apiPicUrl: string = environment.apiUrl + "/pictures";


  constructor(
    private data: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.data.getAll().subscribe(data=>{
      this.products = data;
      console.log(this.products);
    });
  }

}




