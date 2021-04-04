import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-manage-product-create',
  templateUrl: './manage-product-create.component.html',
  styleUrls: ['./manage-product-create.component.css']
})
export class ManageProductCreateComponent implements OnInit {

  productForm = new FormGroup({});
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {
    this.buildGroupForm();
  }

  ngOnInit(): void {}

  private buildGroupForm() {
    this.productForm = this.fb.group({
      product_img: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      emaproduct_priceil: [null, [Validators.required]],
      product_description: [null, [Validators.required]],
      product_quantity: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }

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
