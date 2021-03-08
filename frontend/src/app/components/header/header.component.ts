import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../service/shoppingcart.service';
import { AuthService } from '../../service/auth.service';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() product: any;
  public shoppingCartTotal: string;
  customer: Customer
  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
    this.customer = JSON.parse(localStorage.getItem("user"));
  }

  ngOnInit(): void {
    this.shoppingCartTotal = this.shoppingCartService.shoppingCartList.length.toString();
    this.shoppingCartService.shoppingCartListChange.subscribe(value => this.shoppingCartTotal = value.toString())
  }

  logout() {
    this.authService.logoutUser();
  }

  isLogin(){
    if(this.customer){
      return true;
    }
    return false;
  }
}
