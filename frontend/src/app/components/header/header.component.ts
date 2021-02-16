import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../service/shoppingcart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() product: any;
  public shoppingCartTotal: string;
  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.shoppingCartListChange.subscribe(value => this.shoppingCartTotal = value.toString())
  }
}
