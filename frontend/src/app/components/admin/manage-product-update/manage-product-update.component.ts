import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/model/Product';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-manage-product-update',
  templateUrl: './manage-product-update.component.html',
  styleUrls: ['./manage-product-update.component.css'],
})
export class ManageProductUpdateComponent implements OnInit {
  product: Product;
  product_id: string;
  apiPicUrl: string = environment.apiUrl + '/pictures';
  productForm = new FormGroup({
    product_img: new FormControl(),
    product_name: new FormControl(null, [Validators.required]),
    product_price: new FormControl(null, [Validators.required]),
    product_description: new FormControl(null, [Validators.required]),
    product_quantity: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
  });
  loading = false;
  submitted = false;
  deleting = false;
  categories: string[] = [
    'Books',
    'Business Cards',
    'Calendars',
    'Carbonless Forms',
    'Copy & Prints',
    'Door Hangers',
    'Envelopes',
    'Flyers & Brochures',
    'Feature Sheets',
    'Letterheads',
    'Notepads',
    'Postcards',
    'Pocket Folders',
    'Tickets',
    'Magnets',
    'Posters',
    'Real Estate Signs',
    'Banner & Displays',
    'Window Graphics',
    'Sign Accessories',
  ];
  fileToUpload: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getOne(params['id']).subscribe((data) => {
        this.product = data;
        this.product_id = params['id'];
        if (data) {
          this.productForm.patchValue({
            product_name: this.product.product_name,
            product_price: this.product.product_price,
            product_description: this.product.product_description,
            product_quantity: this.product.product_quantity,
            category: this.product.category,
          });
        }
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.productForm.controls;
  }

  selectFile(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }

    this.loading = true;

    this.productService
      .uploadUpdate(this.product_id, this.productForm, this.fileToUpload)
      .subscribe({
        next: () => {
          //this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['/admin'], { relativeTo: this.route });
        },
        error: (error) => {
          //this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
