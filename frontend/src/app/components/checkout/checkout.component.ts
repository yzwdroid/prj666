import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/Product';
import { ShoppingCartService } from 'src/app/service/shoppingcart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
const BASEURL = environment.apiUrl;

interface ProvinceSalesTax {
  sales_tax: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: Array<Product> = [];
  product: Product;
  total: number;
  discount: number;
  taxes: number;
  checkoutForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(),
    address: new FormControl(),
    address2: new FormControl(),
    city: new FormControl(),
    country: new FormControl('Canada'),
    state: new FormControl('choose'),
    zip: new FormControl(),
    // same_address: new FormControl(),
    // save_info: new FormControl('checked'),
  });

  sales_tax_rate_canada: { [id: string]: ProvinceSalesTax } = {
    AB: { sales_tax: 0.05 },
    BC: { sales_tax: 0.12 },
    SK: { sales_tax: 0.11 },
    MB: { sales_tax: 0.12 },
    ON: { sales_tax: 0.13 },
    QC: { sales_tax: 0.14975 },
    NB: { sales_tax: 0.15 },
    PE: { sales_tax: 0.15 },
    NS: { sales_tax: 0.15 },
    NL: { sales_tax: 0.15 },
    YT: { sales_tax: 0.05 },
    NT: { sales_tax: 0.05 },
    NU: { sales_tax: 0.05 },
  };

  public payPalConfig?: IPayPalConfig;
  showError: boolean;
  showCancel: boolean;
  showSuccess: boolean;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.products = this.shoppingCartService.shoppingCartList;
    this.total = this.shoppingCartService.getTotal();
    this.taxes = 0.0;
    this.discount = 0.0;
    this.initConfig();
  }

  changeTaxRate(province) {
    if (province != '') {
      this.taxes =
        this.sales_tax_rate_canada[province].sales_tax *
        this.shoppingCartService.getTotal();
      this.total =
        (1 + this.sales_tax_rate_canada[province].sales_tax) *
        this.shoppingCartService.getTotal();
    }
  }

  onSubmit() {
    const obj = {
      firstName: this.checkoutForm.get('firstName').value,
      lastName: this.checkoutForm.get('lastName').value,
      address: this.checkoutForm.get('address').value,
      address2: this.checkoutForm.get('address2').value,
      city: this.checkoutForm.get('city').value,
      country: this.checkoutForm.get('country').value,
      state: this.checkoutForm.get('state').value,
      zip: this.checkoutForm.get('zip').value,
      // same_address: this.checkoutForm.get('same_address').value,
      // save_info: this.checkoutForm.get('save_info').value,
      total: this.total,
      taxes: this.taxes,
      products: this.shoppingCartService.shoppingCartList,
    };

    const json = JSON.stringify(obj);
    console.log(json);

    this.checkoutService.postCheckoutInfo(json).subscribe(
      (data) => {
        // this.ResponseResetForm.reset();
        // this.successMessage = data.message;
        setTimeout(() => {
          // this.successMessage = null;
          // this.router.navigate(['sign-in']);
        }, 3000);
      },
      (err) => {
        if (err.error.message) {
          // this.errorMessage = err.error.message;
        }
      }
    );
  }

  validation() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            form.classList.add('validated');
          }
          form.classList.add('was-validated');
        },
        false
      );
    });
  }

  isPayPalEnable() {
    if (document.getElementsByClassName('validated').length > 0)
      return true;
    return false;
  }

  private initConfig(): void {
    this.payPalConfig = {
      clientId:
        'AU-kwYEf--tHLzpT_CJy4iN6Km1LDtE7bQ2FgD5xbFkNfpp-4jlIal0-eJeiv7Nqk10zzhBVcWJm__pr',
      // for creating orders (transactions) on server see
      // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
      createOrderOnServer: (data) =>
        fetch(`${BASEURL}/paypal`)
          .then((res) => res.json())
          .then((order) => order.orderID),
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        // console.log('OnCancel', data, actions);
        this.showCancel = true;
      },
      onError: (err) => {
        // console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        // console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
