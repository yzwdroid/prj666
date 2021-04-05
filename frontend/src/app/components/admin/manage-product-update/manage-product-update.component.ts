import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../service/product.service';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/model/Product';
import { NgForm } from '@angular/forms';


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
  fileToUpload: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {
    //this.buildGroupForm();
    this.route.params.subscribe((params) => {
      this.productService.getOne(params['id']).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    });
  }

  ngOnInit(): void {
    //console.log(this.product);
    this.buildGroupForm();
  }

  private buildGroupForm() {
    this.productForm = this.fb.group({
      product_img: [null, [Validators.required]],
      product_name: [null, [Validators.required]],
      product_price: [null, [Validators.required]],
      product_description: [null, [Validators.required]],
      product_quantity: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }
  selectFile(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.productService
      .upload(this.productForm, this.fileToUpload)
      .subscribe({
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

// import { Component, Input, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProductService } from '../../../service/product.service';
// import { first } from 'rxjs/operators';
// import { Product } from 'src/app/model/Product';
// import { NgForm } from '@angular/forms';


// @Component({
//   selector: 'app-manage-product-update',
//   templateUrl: './manage-product-update.component.html',
//   styleUrls: ['./manage-product-update.component.css']
// })
// export class ManageProductUpdateComponent implements OnInit {

//   product : Product;

//   productForm = new FormGroup({});
//   loading = false;
//   submitted = false;
//   deleting = false;
//   categories: string[] = ["Books", "Business Cards", "Calendars", "Carbonless Forms", "Copy & Prints",
// "Door Hangers", "Envelopes", "Flyers & Brochures", "Feature Sheets", "Letterheads",
// "Notepads", "Postcards", "Pocket Folders", "Tickets", "Magnets", "Posters",
// "Real Estate Signs", "Banner & Displays", "Window Graphics", "Sign Accessories"];
//   fileToUpload: File;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private productService: ProductService,
//   ) {
//     //this.buildGroupForm();
//     this.route.params.subscribe((params) => {
//       this.productService.getOne(params['id']).subscribe((data) => {
//         this.product = data;
//         console.log(this.product);
//       });
//     });
//   }

//   ngOnInit(): void {
//     //console.log(this.product);
//     //this.buildGroupForm();
//   }

//   // private buildGroupForm() {
//   //   this.productForm = this.fb.group({
//   //     product_img: [this.product.product_img, [Validators.required]],
//   //     product_name: [this.product.product_name, [Validators.required]],
//   //     product_price: [this.product.product_price, [Validators.required]],
//   //     product_description: [this.product.product_description, [Validators.required]],
//   //     product_quantity: [this.product.product_quantity, [Validators.required]],
//   //     category: [this.product.category, [Validators.required]],
//   //   });
//   // }

//   // convenience getter for easy access to form fields
//   //get f() { return this.productForm.controls; }
//   selectFile(event: any): void {
//     this.fileToUpload = event.target.files[0];
//   }

//   onSubmit() {
//     this.submitted = true;
//     this.loading = true;

//     this.productService
//       .upload(this.productForm, this.fileToUpload)
//       .subscribe({
//         next: () => {
//           //this.alertService.success('Update successful', { keepAfterRouteChange: true });
//           this.router.navigate(['../'], { relativeTo: this.route });
//         },
//         error: (error) => {
//           //this.alertService.error(error);
//           this.loading = false;
//         },
//       });
//   }
// }
