import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/Product';
import { Router, ActivatedRoute } from '@angular/router';
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
  loading = false;

  constructor(
    private data: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.data.getAll().subscribe(data=>{
      this.products = data;
    });
  }

  deleteProduct(id: number){
    this.data.delete(id).subscribe({
      next: () => {
        //this.alertService.success('Update successful', { keepAfterRouteChange: true });
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        //this.alertService.error(error);
        this.loading = false;
      },
    });
  }

}




