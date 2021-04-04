import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-manage-product-update',
  templateUrl: './manage-product-update.component.html',
  styleUrls: ['./manage-product-update.component.css']
})
export class ManageProductUpdateComponent implements OnInit {

  product : Product;

  productForm = new FormGroup({});
  loading = false;
  submitted = false;
  deleting = false;
  categories: string[] = ["Books", "Business Cards", "Calendars", "Carbonless Forms", "Copy & Prints",
"Door Hangers", "Envelopes", "Flyers & Brochures", "Feature Sheets", "Letterheads",
"Notepads", "Postcards", "Pocket Folders", "Tickets", "Magnets", "Posters",
"Real Estate Signs", "Banner & Displays", "Window Graphics", "Sign Accessories"];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) { this.buildGroupForm();}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getOne(params['id']).subscribe((data) => {
        this.product = data;
      });
    });
  }

  private buildGroupForm() {
    // this.productForm = this.fb.group({
    //   product_img: [null, [Validators.required]],
    //   product_name: [this.product.product_name, [Validators.required]],
    //   product_price: [null, [Validators.required]],
    //   product_description: [null, [Validators.required]],
    //   product_quantity: [null, [Validators.required]],
    //   category: [null, [Validators.required]],
    // });
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }
    console.log(this.productForm.value);
    this.loading = true;
    this.productService.create(this.productForm.value)
        .pipe(first())
        .subscribe({
            next: () => {
                //this.alertService.success('Update successful', { keepAfterRouteChange: true });
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: error => {
                //this.alertService.error(error);
                this.loading = false;
            }
        });
  }

}
