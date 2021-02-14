import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  action() {
    this.router.navigate(['/checkout']);
  }
}
