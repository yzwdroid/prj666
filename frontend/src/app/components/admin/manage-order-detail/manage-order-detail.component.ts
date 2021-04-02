import { Component, OnInit } from '@angular/core';
import { Order_detail } from '../../../model/Order_detail';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-manage-order-detail',
  templateUrl: './manage-order-detail.component.html',
  styleUrls: ['./manage-order-detail.component.css']
})
export class ManageOrderDetailComponent implements OnInit {

  items: any;//Array<Order_detail> = [];

  constructor(
    private data: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.data.getOrderDetail(params['id']).subscribe((data) => {
        this.items = data;
      });
    });
    if(this.items){
      console.log("Order detail are found!");
    }else{
      console.log("No Order details!");
    }
  }

}
